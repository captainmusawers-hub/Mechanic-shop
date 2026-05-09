import React, { useState } from 'react';
import { ChevronDown, Search, ArrowRight, CheckCircle2, Car, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SearchMode = 'size' | 'vehicle';

const MAKE_MODELS: Record<string, string[]> = {
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'HR-V', 'Ridgeline'],
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius', '4Runner'],
  Ford: ['F-150', 'Escape', 'Explorer', 'Mustang', 'Edge', 'Bronco', 'Ranger'],
  Chevrolet: ['Silverado', 'Equinox', 'Traverse', 'Tahoe', 'Colorado', 'Malibu'],
  Nissan: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Frontier', 'Murano'],
  Hyundai: ['Elantra', 'Tucson', 'Santa Fe', 'Sonata', 'Kona', 'Palisade'],
  Kia: ['Sportage', 'Sorento', 'Telluride', 'Forte', 'Soul', 'Carnival'],
  Subaru: ['Outback', 'Forester', 'Crosstrek', 'Impreza', 'Legacy', 'Ascent'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', 'M3', 'M5'],
  Mercedes: ['C-Class', 'E-Class', 'GLC', 'GLE', 'A-Class', 'S-Class'],
  Audi: ['A4', 'A6', 'Q5', 'Q7', 'A3', 'Q3'],
  Tesla: ['Model 3', 'Model Y', 'Model S', 'Model X'],
};

const YEARS = Array.from({ length: 12 }, (_, i) => String(2026 - i));

const SelectField: React.FC<{
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  ariaLabel: string;
  children: React.ReactNode;
  size?: 'sm' | 'md';
}> = ({ label, required, value, onChange, disabled, ariaLabel, children, size = 'sm' }) => (
  <div className="space-y-1 text-sm">
    <label className="font-bold text-gray-700 flex items-center">
      {label}
      {required && <span className="text-brand-red ml-1 text-lg leading-none" aria-hidden="true">*</span>}
    </label>
    <div className="relative">
      <select
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
        className={`w-full bg-white border border-gray-300 rounded px-3 focus:outline-none focus:border-brand-red appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed ${size === 'md' ? 'py-3' : 'py-2'}`}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} aria-hidden="true" />
    </div>
  </div>
);

export default function TireSearchWidget() {
  const [searchBy, setSearchBy] = useState<SearchMode>('size');
  const [showRear, setShowRear] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [fWidth, setFWidth] = useState('');
  const [fProfile, setFProfile] = useState('');
  const [fWheelSize, setFWheelSize] = useState('');
  const [season, setSeason] = useState('');

  const [rWidth, setRWidth] = useState('');
  const [rProfile, setRProfile] = useState('');
  const [rWheelSize, setRWheelSize] = useState('');

  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMake(e.target.value);
    setModel('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 1500);
  };

  const handleNewSearch = () => {
    setShowResult(false);
    setFWidth(''); setFProfile(''); setFWheelSize(''); setSeason('');
    setRWidth(''); setRProfile(''); setRWheelSize('');
    setYear(''); setMake(''); setModel('');
    setShowRear(false);
  };

  const isFormValid = (): boolean => {
    if (searchBy === 'size') {
      const frontOk = fWidth !== '' && fProfile !== '' && fWheelSize !== '';
      const rearOk = !showRear || (rWidth !== '' && rProfile !== '' && rWheelSize !== '');
      return frontOk && rearOk;
    }
    return year !== '' && make !== '' && model !== '';
  };

  const availableModels = make ? (MAKE_MODELS[make] ?? []) : [];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden relative">

      {/* Result Overlay */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center"
            role="dialog"
            aria-modal="true"
            aria-label="Tires found"
          >
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" aria-hidden="true" />
            <h3 className="font-heading font-bold text-3xl text-brand-charcoal mb-4">Tires Found!</h3>
            <p className="text-gray-600 font-medium max-w-md mx-auto mb-8">
              In a production environment, this would redirect you to the TireConnect portal with your
              exact vehicle/tire parameters pre-loaded, showing available inventory and pricing.
            </p>
            <button
              onClick={handleNewSearch}
              className="px-6 py-3 bg-brand-red text-white font-bold rounded-lg hover:bg-brand-red-hover transition-colors shadow-lg"
            >
              Start New Search
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h3 className="font-heading font-extrabold text-2xl text-brand-red uppercase tracking-wide max-w-xs leading-tight">
          How would you like to search?
        </h3>
        <div className="flex flex-col items-start md:items-end w-full md:w-auto">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">
            Powered by <span className="text-brand-charcoal font-black">TIRE</span><span className="text-brand-red font-black">CONNECT</span>
          </span>
          <div className="relative w-full md:w-auto">
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value as SearchMode)}
              aria-label="Search by tire size or vehicle"
              className="w-full md:w-auto bg-white border border-gray-300 rounded-md px-4 py-2 font-medium text-brand-charcoal focus:outline-none focus:border-brand-red appearance-none pr-10 cursor-pointer shadow-sm"
            >
              <option value="size">By Tire Size</option>
              <option value="vehicle">By Vehicle</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-10 bg-white">
        <div className="flex-1 space-y-6">
          <form onSubmit={handleSearch} className="space-y-6" noValidate>

            {searchBy === 'size' ? (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Front */}
                <div>
                  <h4 className="font-heading font-bold text-lg mb-4 text-brand-charcoal border-b border-gray-200 pb-2 uppercase tracking-wide">Front Tires</h4>
                  <div className="space-y-4">
                    <SelectField label="Width" required value={fWidth} onChange={e => setFWidth(e.target.value)} ariaLabel="Front tire width">
                      <option value="">- Select -</option>
                      {['185','195','205','215','225','235','245','255','265','275'].map(v => <option key={v} value={v}>{v}</option>)}
                    </SelectField>
                    <SelectField label="Profile" required value={fProfile} onChange={e => setFProfile(e.target.value)} ariaLabel="Front tire profile">
                      <option value="">- Select -</option>
                      {['35','40','45','50','55','60','65','70'].map(v => <option key={v} value={v}>{v}</option>)}
                    </SelectField>
                    <SelectField label="Wheel Size" required value={fWheelSize} onChange={e => setFWheelSize(e.target.value)} ariaLabel="Front wheel size">
                      <option value="">- Select -</option>
                      {['15','16','17','18','19','20','21','22'].map(v => <option key={v} value={v}>{v}"</option>)}
                    </SelectField>
                    <SelectField label="Season" value={season} onChange={e => setSeason(e.target.value)} ariaLabel="Tire season">
                      <option value="">- Select -</option>
                      <option value="All-Season">All-Season</option>
                      <option value="All-Weather">All-Weather</option>
                      <option value="Winter">Winter</option>
                      <option value="Summer">Summer</option>
                    </SelectField>
                  </div>
                </div>

                {/* Rear */}
                <div>
                  <div className="flex justify-between items-baseline border-b border-gray-200 pb-2 mb-4">
                    <h4 className="font-heading font-bold text-lg text-brand-charcoal uppercase tracking-wide">Rear Tires</h4>
                    <button
                      type="button"
                      onClick={() => setShowRear(!showRear)}
                      aria-expanded={showRear}
                      className="text-brand-red font-bold text-[10px] uppercase tracking-widest hover:underline whitespace-nowrap"
                    >
                      {showRear ? 'Hide Rear Size' : 'Add Rear Size'}
                    </button>
                  </div>
                  {showRear ? (
                    <div className="space-y-4">
                      <SelectField label="Width" required value={rWidth} onChange={e => setRWidth(e.target.value)} ariaLabel="Rear tire width">
                        <option value="">- Select -</option>
                        {['255','265','275','285','295','305'].map(v => <option key={v} value={v}>{v}</option>)}
                      </SelectField>
                      <SelectField label="Profile" required value={rProfile} onChange={e => setRProfile(e.target.value)} ariaLabel="Rear tire profile">
                        <option value="">- Select -</option>
                        {['30','35','40','45','50'].map(v => <option key={v} value={v}>{v}</option>)}
                      </SelectField>
                      <SelectField label="Wheel Size" required value={rWheelSize} onChange={e => setRWheelSize(e.target.value)} ariaLabel="Rear wheel size">
                        <option value="">- Select -</option>
                        {['17','18','19','20','21','22'].map(v => <option key={v} value={v}>{v}"</option>)}
                      </SelectField>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 text-gray-400 text-sm font-medium">
                      Same as front tires
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 pt-4">
                <SelectField label="Year" required value={year} onChange={e => setYear(e.target.value)} ariaLabel="Vehicle year" size="md">
                  <option value="">- Select Year -</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </SelectField>
                <SelectField label="Make" required value={make} onChange={handleMakeChange} disabled={!year} ariaLabel="Vehicle make" size="md">
                  <option value="">- Select Make -</option>
                  {Object.keys(MAKE_MODELS).map(m => <option key={m} value={m}>{m}</option>)}
                </SelectField>
                <SelectField label="Model" required value={model} onChange={e => setModel(e.target.value)} disabled={!make} ariaLabel="Vehicle model" size="md">
                  <option value="">- Select Model -</option>
                  {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                </SelectField>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSearching || !isFormValid()}
              aria-busy={isSearching}
              className="w-full bg-brand-charcoal hover:bg-black text-white font-bold py-4 rounded transition-colors uppercase tracking-widest flex items-center justify-center gap-2 text-sm mt-8 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
              ) : (
                <>
                  <Search size={18} aria-hidden="true" />
                  Find Your Tires Now
                </>
              )}
            </button>
          </form>
        </div>

        {/* Side Visualization */}
        <div className="lg:w-[40%] flex flex-col justify-center items-center relative pl-0 lg:pl-10">
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-64 bg-gray-100" aria-hidden="true" />
          <AnimatePresence mode="wait">
            {searchBy === 'size' ? (
              <motion.div
                key="size-viz"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full bg-white border border-gray-200 rounded p-4 shadow-[0_2px_10px_rgb(0,0,0,0.05)] text-center"
              >
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4 flex items-center justify-center gap-2">
                  <Maximize size={12} aria-hidden="true" /> Reading Tire Info
                </div>
                <div className="relative h-48 w-full flex items-center justify-center bg-gray-50 rounded mb-4 overflow-hidden border border-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Close-up of tire sidewall showing size markings"
                    className="object-cover w-full h-full opacity-80 mix-blend-multiply"
                  />
                </div>
                <div className="flex justify-center mb-1">
                  <span
                    className="font-mono text-sm bg-gray-100 border border-gray-200 px-3 py-1 rounded text-brand-charcoal font-bold tracking-wider"
                    aria-live="polite"
                    aria-label={`Tire size: ${fWidth || 'width'} / ${fProfile || 'profile'} R ${fWheelSize || 'wheel size'}`}
                  >
                    <span className={fWidth ? 'text-brand-red' : 'text-gray-400'}>{fWidth || 'XXX'}</span>/
                    <span className={fProfile ? 'text-brand-red' : 'text-gray-400'}>{fProfile || 'XX'}</span> R
                    <span className={fWheelSize ? 'text-brand-red' : 'text-gray-400'}> {fWheelSize || 'XX'}</span>
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="vehicle-viz"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full bg-white border border-gray-200 rounded p-6 shadow-[0_2px_10px_rgb(0,0,0,0.05)] text-center flex flex-col items-center justify-center min-h-[300px]"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                  <Car className="text-gray-400 w-10 h-10" />
                </div>
                <h4 className="font-heading font-bold text-xl text-brand-charcoal mb-2">Vehicle Fitment</h4>
                <p className="text-gray-500 text-sm font-medium mb-6">We'll find the manufacturer recommended tire sizes for your specific vehicle.</p>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider" aria-live="polite">
                  <span className={year ? 'text-brand-charcoal' : ''}>{year || 'Year'}</span>
                  <ArrowRight size={12} aria-hidden="true" />
                  <span className={make ? 'text-brand-charcoal' : ''}>{make || 'Make'}</span>
                  <ArrowRight size={12} aria-hidden="true" />
                  <span className={model ? 'text-brand-charcoal' : ''}>{model || 'Model'}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
