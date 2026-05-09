import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Phone, Star, ChevronRight, Wrench, Settings2, Zap, ShieldCheck,
  MapPin, Clock, KeyRound, CarFront, CheckCircle2, ChevronLeft, ChevronRight as ChevronRightIcon,
  MessageCircle, Send, ChevronDown
} from 'lucide-react';
import TireSearchWidget from './components/TireSearchWidget';

interface Review {
  text: string;
  author: string;
  vehicle: string;
}

const ReviewCard: React.FC<{ review: Review; i: number }> = ({ review, i }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="shrink-0 w-[85vw] sm:w-[60vw] md:w-auto snap-center bg-white rounded-2xl p-8 border border-gray-200 shadow-lg relative flex flex-col h-full cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      aria-expanded={isExpanded}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex text-yellow-500 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100" aria-label="5 stars">
          {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-yellow-500" aria-hidden="true" />)}
        </div>
        <span className="text-gray-400 shrink-0 ml-4 bg-gray-50 p-1 rounded-full" aria-hidden="true">
          <ChevronDown size={20} className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </span>
      </div>
      <p className="font-sans text-gray-700 italic grow font-medium leading-relaxed">"{review.text}"</p>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="mt-6 border-t border-gray-100 pt-4">
          <p className="font-heading font-bold text-lg text-brand-charcoal">{review.author}</p>
          <p className="font-sans text-xs uppercase tracking-widest text-brand-red font-bold mt-1">{review.vehicle}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const REVIEWS: Review[] = [
  {
    text: "Brought my EV in for an inspection after Uber requested it. They were fast, extremely knowledgeable about the high-voltage systems, and got me back on the road. A+ service.",
    author: "Mark D.",
    vehicle: "2021 Tesla Model 3"
  },
  {
    text: "I lost my smart key for my Mercedes. The dealership wanted a fortune and weeks of wait. Surrey Centre Auto programmed a new one the exact same day.",
    author: "Sarah L.",
    vehicle: "2019 Mercedes C300"
  },
  {
    text: "Honest communication. They showed me exactly what was wrong with my brakes instead of just handing me a bill. Hard to find mechanics like this anymore.",
    author: "David K.",
    vehicle: "2015 Honda Civic"
  },
  {
    text: "The mechanics here are super professional. Needed a quick oil change and transmission fluid flush. The team noticed a minor suspension issue and gave me a heads up — no aggressive upselling.",
    author: "Jessica T.",
    vehicle: "2018 Toyota RAV4"
  },
  {
    text: "My BMW was making a terrible rattling noise that two other shops couldn't diagnose. The team found the timing chain issue within hours and gave me a fair quote. It runs like new now.",
    author: "Amir S.",
    vehicle: "2017 BMW 340i"
  },
  {
    text: "Had my brakes fail on 104 Ave. Managed to pull in right as they were closing. Not only did they stay late to diagnose it, they fixed the brake line perfectly by the next morning. Lifesavers.",
    author: "Chris M.",
    vehicle: "2020 Ford F-150"
  }
];

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hi there! 👋 How can we help you today?", isBot: true }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = { id: Date.now(), text: chatInput, isBot: false };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Thanks for reaching out! One of our mechanics will be with you shortly. In the meantime, feel free to leave your phone number if you'd like us to call you back.",
        isBot: true
      }]);
    }, 1500);
  };

  const navItems = ['Services', 'About', 'Tires', 'Reviews', 'Contact'];

  return (
    <div className="min-h-screen bg-brand-white text-brand-charcoal overflow-x-hidden selection:bg-brand-red selection:text-white">

      {/* ── Header ── */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100/50' : 'bg-brand-white border-b border-gray-100 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
            <a href="#" className="flex-shrink-0 flex items-center" aria-label="Surrey Centre Auto Repairs — home">
              <span className="font-heading font-bold text-xl md:text-2xl tracking-tighter">
                Surrey Centre <span className="text-brand-red">Auto Repairs</span> Inc.
              </span>
            </a>

            <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-sans font-semibold text-sm uppercase tracking-wider text-brand-charcoal hover:text-brand-red transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center">
              <a
                href="tel:6045881266"
                className="group flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white px-6 py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg"
                aria-label="Call us at (604) 588-1266"
              >
                <Phone size={18} className="group-hover:animate-pulse" aria-hidden="true" />
                <span>CALL: (604) 588-1266</span>
              </a>
            </div>

            <button
              className="md:hidden flex items-center text-brand-charcoal hover:text-brand-red focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-brand-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4"
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-sans font-semibold text-base py-2 text-brand-charcoal hover:text-brand-red"
                >
                  {item}
                </a>
              ))}
              <a
                href="tel:6045881266"
                className="mt-4 flex items-center justify-center gap-2 bg-brand-red text-white px-6 py-3 rounded-full font-bold w-full"
              >
                <Phone size={18} aria-hidden="true" />
                <span>(604) 588-1266</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-48 lg:pt-48 lg:pb-64 overflow-hidden flex flex-col items-center justify-center min-h-[85vh]" aria-label="Hero">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand-charcoal/85 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block py-2 px-6 rounded-full bg-brand-red/20 border border-brand-red/50 font-sans text-xs uppercase tracking-widest font-bold mb-8 text-white shadow-[0_0_15px_rgba(226,31,38,0.3)]"
          >
            Where Trust Means a Big Deal.
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight max-w-4xl mb-6"
          >
            Surrey's Experts in <br className="hidden sm:block" />
            <span className="text-brand-red">Specialized Auto Repair</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-lg sm:text-xl text-gray-200 max-w-2xl mb-12 leading-relaxed"
          >
            From Hybrid/EV technology to High-End German engineering, we provide honest, transparent service for all makes and models.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#book"
              className="w-full sm:w-auto text-center bg-brand-red hover:bg-brand-red-hover text-white px-8 py-4 rounded-full font-bold uppercase tracking-wide transition-colors shadow-lg shadow-brand-red/30 flex items-center justify-center"
            >
              Book Your Service
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto text-center border border-white/30 hover:border-white hover:bg-white/10 text-white bg-white/5 backdrop-blur-sm px-8 py-4 rounded-full font-bold uppercase tracking-wide transition-all"
            >
              View Services
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Banner ── */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 mb-16">
        <div className="bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-200 flex flex-col md:flex-row items-center justify-around py-8 px-10 gap-8 text-center md:text-left">
          <div className="flex items-center gap-5 flex-col sm:flex-row">
            <div className="flex bg-yellow-50 p-4 rounded-2xl shadow-inner border border-yellow-200/60" aria-hidden="true">
              <Star className="text-yellow-500 fill-yellow-500" size={32} />
            </div>
            <div>
              <p className="font-heading font-extrabold text-3xl text-brand-charcoal">4.3<span className="text-xl font-medium text-gray-500">/5</span></p>
              <p className="font-sans text-gray-600 font-medium tracking-wide text-sm mt-0.5">1,300+ Local Reviews</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent" aria-hidden="true"></div>

          <div className="flex items-center gap-5 flex-col sm:flex-row">
            <div className="flex bg-blue-50 p-4 rounded-2xl shadow-inner border border-blue-200/60 shrink-0" aria-hidden="true">
              <ShieldCheck className="text-blue-500" size={32} />
            </div>
            <div className="max-w-xs">
              <p className="font-sans font-semibold text-brand-charcoal text-lg mb-0.5">Government Approved</p>
              <p className="font-sans text-gray-600 text-sm">Certified Inspection Facilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Services ── */}
      <section id="services" className="pt-24 pb-32 bg-gray-100 relative shadow-inner">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" aria-hidden="true"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-red-100 border border-brand-red/30 font-sans text-xs uppercase tracking-widest font-semibold mb-4 text-brand-red shadow-sm">
                Our Services
              </span>
              <h2 className="font-heading font-bold text-4xl lg:text-5xl tracking-tight leading-tight text-brand-charcoal">
                Precision Diagnostics <br className="hidden md:block" />& Full-Service Repair
              </h2>
            </div>
            <p className="font-sans text-gray-600 text-lg md:text-right max-w-sm mb-2 font-medium">
              Comprehensive auto repair solutions backed by local trust and advanced diagnostic technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {[
              {
                icon: <Wrench size={28} className="text-brand-charcoal group-hover:text-brand-red transition-colors" />,
                title: "Mechanical",
                desc: "Full Engine Repair, Clutch, Timing Belts, and Transmission rebuilding."
              },
              {
                icon: <Settings2 size={28} className="text-brand-charcoal group-hover:text-brand-red transition-colors" />,
                title: "Maintenance",
                desc: "Premium Synthetic Oil Changes, Tire Rotation, and Fluid Flushes."
              },
              {
                icon: <Zap size={28} className="text-brand-charcoal group-hover:text-brand-red transition-colors" />,
                title: "Specialty Tech",
                desc: "Hybrid/EV Service, Tesla Maintenance, & Deep Computer Scan Diagnostics."
              },
              {
                icon: <CheckCircle2 size={28} className="text-brand-charcoal group-hover:text-brand-red transition-colors" />,
                title: "Safety",
                desc: "Government Inspections, Uber Inspections, and Certified Brake Specialists."
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-gradient-to-b from-white to-gray-50 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(226,31,38,0.1)] transition-all duration-300 cursor-pointer border border-gray-200 hover:border-brand-red/30 flex flex-col h-full transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gray-100 group-hover:bg-red-100 transition-colors shadow-inner border border-gray-200/60 group-hover:border-red-200" aria-hidden="true">
                  {service.icon}
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 text-brand-charcoal group-hover:text-brand-red transition-colors">{service.title}</h3>
                <p className="font-sans text-gray-600 leading-relaxed text-sm grow">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Specialty Features */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200/80 relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-60 mix-blend-multiply pointer-events-none" aria-hidden="true"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
              <div className="space-y-10">
                <div className="flex gap-5 items-start bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="bg-gray-100 text-brand-charcoal p-4 rounded-xl shrink-0 border border-gray-200 shadow-inner mt-1" aria-hidden="true">
                    <KeyRound size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-2xl mb-2 text-brand-charcoal">Key Programming</h3>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      We Sell & Program New Keys, Remotes, and Smart Keys right here at our facility. Faster and more affordable than the dealership.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 items-start bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="bg-red-50 text-brand-red p-4 rounded-xl shrink-0 border border-red-100 shadow-inner mt-1" aria-hidden="true">
                    <CarFront size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-2xl mb-2 text-brand-charcoal">Luxury & German Service</h3>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      Specializing in High-End, German, and Luxury Vehicle Repairs. We have the specific diagnostic tools for BMW, Mercedes, Audi, and Tesla.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative h-[350px] lg:h-[450px]">
                <div className="absolute inset-0 bg-brand-charcoal rounded-2xl transform translate-x-3 translate-y-3 opacity-20" aria-hidden="true"></div>
                <img
                  src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury vehicle being serviced inside our Surrey shop"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-[2rem] p-8 md:p-12 border border-gray-200 shadow-lg flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="lg:w-3/5">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block py-1 px-3 rounded-full bg-red-50 border border-brand-red/30 font-sans text-xs uppercase tracking-widest font-semibold mb-4 text-brand-red shadow-sm"
              >
                About Us
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight tracking-tight mb-4 text-brand-charcoal">Surrey's Trusted Auto Repairs</h2>
              <p className="font-sans text-gray-600 text-lg leading-relaxed font-medium">
                We handle all mechanical and electrical work — from routine maintenance and intricate diagnostics to BC Safety Inspections. Our mission is simple: provide transparent, honest, and high-quality service so you can drive with confidence.
              </p>
            </div>
            <div className="lg:w-2/5 w-full">
              <img
                src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our Surrey auto repair shop team"
                className="w-full h-56 md:h-64 object-cover rounded-3xl shadow-md border-4 border-white transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Tires ── */}
      <section id="tires" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-50/50" aria-hidden="true"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block py-1 px-3 rounded-full bg-red-50 border border-brand-red/30 font-sans text-xs uppercase tracking-widest font-semibold mb-4 text-brand-red shadow-sm"
            >
              Tire Services
            </motion.span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-charcoal mb-4">Find the Perfect Tires</h2>
            <p className="font-sans text-gray-600 max-w-2xl mx-auto font-medium">Use our tire search tool to find the exact fit for your vehicle.</p>
          </div>
          <TireSearchWidget />
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="py-32 bg-brand-charcoal text-white relative" aria-label="Shop gallery">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none" aria-hidden="true"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block py-1 px-3 rounded-full bg-brand-red/20 border border-brand-red/50 font-sans text-xs uppercase tracking-widest font-semibold mb-6 text-white"
            >
              Gallery
            </motion.span>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl mb-6 tracking-tight">Inside the Shop</h2>
            <p className="font-sans text-gray-400 text-lg leading-relaxed">
              A glimpse into our Surrey facility and the high-end specialty repairs we perform daily.
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 md:px-0 pb-8 md:pb-0 -mx-4 md:mx-0 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { img: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Tesla HV Diagnostics", desc: "Complete electrical system testing & battery maintenance." },
              { img: "https://images.unsplash.com/photo-1486262715619-67b85e0bc08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "German Engineering", desc: "BMW engine overhaul and precision timing adjustment." },
              { img: "https://images.unsplash.com/photo-1503375894023-e2213192078a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "OEM Brake Services", desc: "High-performance rotor and pad replacement." },
              { img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Shop & Facility", desc: "Our specialized equipment bay inside the Surrey location." },
              { img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Advanced Key Programming", desc: "Smart key FOB replacement and immediate pairing." },
              { img: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Fluid & Filter Service", desc: "Premium synthetic engine oil and comprehensive maintenance." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="shrink-0 w-[85vw] sm:w-[60vw] md:w-auto snap-center group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-white/5"
              >
                <div className="absolute inset-0 bg-brand-charcoal/80 group-hover:bg-brand-charcoal/20 transition-colors z-10 duration-500 mix-blend-multiply" aria-hidden="true"></div>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end bg-gradient-to-t from-brand-charcoal/95 via-brand-charcoal/30 to-transparent">
                  <h3 className="font-heading font-bold text-2xl text-white mb-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                  <p className="font-sans text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" className="py-32 bg-gray-100 relative shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent pointer-events-none" aria-hidden="true"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block py-1 px-3 rounded-full bg-white border border-gray-200 font-sans text-xs uppercase tracking-widest font-semibold mb-6 text-brand-charcoal shadow-sm"
              >
                Community Trust
              </motion.span>
              <h2 className="font-heading font-bold text-4xl lg:text-5xl leading-tight tracking-tight mb-4 text-brand-charcoal">What Our Clients Say</h2>
              <p className="font-sans text-gray-600 font-medium text-lg leading-relaxed">Trusted by drivers across the Surrey community since day one.</p>
            </div>
            <div className="flex gap-3" aria-label="Review navigation">
              <button className="w-14 h-14 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-brand-red hover:text-brand-red transition-colors shadow-md hover:shadow-lg" aria-label="Previous reviews">
                <ChevronLeft size={24} />
              </button>
              <button className="w-14 h-14 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-brand-red hover:text-brand-red transition-colors shadow-md hover:shadow-lg" aria-label="Next reviews">
                <ChevronRightIcon size={24} />
              </button>
            </div>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0 pb-8 md:pb-0 -mx-4 md:mx-0 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {REVIEWS.map((review, i) => (
              <ReviewCard key={i} review={review} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Book / Contact ── */}
      <section id="book" className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row">

            <div className="bg-brand-charcoal text-white p-10 md:p-14 md:w-2/5 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-3xl mb-4">Book Service</h3>
                <p className="font-sans text-gray-300 text-sm leading-relaxed mb-10">
                  Fill out the form to request an appointment. We'll get back to you shortly to confirm your time.
                </p>

                <address className="space-y-6 not-italic">
                  <div className="flex items-start gap-4">
                    <Phone className="text-brand-red mt-1 shrink-0" size={20} aria-hidden="true" />
                    <div>
                      <p className="font-sans text-xs text-gray-400 uppercase tracking-wider mb-1">Call Us</p>
                      <a href="tel:6045881266" className="font-sans text-lg hover:text-brand-red transition-colors">(604) 588-1266</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="text-brand-red mt-1 shrink-0" size={20} aria-hidden="true" />
                    <div>
                      <p className="font-sans text-xs text-gray-400 uppercase tracking-wider mb-1">Location</p>
                      <a href="https://maps.google.com/?q=13654+104+Ave,+Surrey,+BC" target="_blank" rel="noreferrer" className="font-sans text-base hover:text-brand-red transition-colors">
                        13654 104 Ave<br />Surrey, BC V3T 1W2
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="text-brand-red mt-1 shrink-0" size={20} aria-hidden="true" />
                    <div>
                      <p className="font-sans text-xs text-gray-400 uppercase tracking-wider mb-1">Hours</p>
                      <p className="font-sans text-base">Mon – Fri: 8:30am – 5:30pm<br />Sat: 9:00am – 5:00pm<br /><span className="text-brand-red">Sun: Closed</span></p>
                    </div>
                  </div>
                </address>
              </div>
            </div>

            <div className="p-10 md:p-14 md:w-3/5">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Appointment request form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="firstName" className="font-sans text-sm font-medium text-gray-700">First Name</label>
                    <input id="firstName" type="text" placeholder="John" autoComplete="given-name" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="lastName" className="font-sans text-sm font-medium text-gray-700">Last Name</label>
                    <input id="lastName" type="text" placeholder="Doe" autoComplete="family-name" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="font-sans text-sm font-medium text-gray-700">Phone</label>
                    <input id="phone" type="tel" placeholder="(604) 555-0123" autoComplete="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="font-sans text-sm font-medium text-gray-700">Email</label>
                    <input id="email" type="email" placeholder="john@example.com" autoComplete="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="vehicle" className="font-sans text-sm font-medium text-gray-700">Vehicle Make / Model / Year</label>
                  <input id="vehicle" type="text" placeholder="e.g. 2020 Tesla Model Y" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all" />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="service" className="font-sans text-sm font-medium text-gray-700">Service Needed</label>
                  <div className="relative">
                    <select id="service" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all appearance-none cursor-pointer">
                      <option value="">Select a service...</option>
                      <option value="inspection">Uber / Government Inspection</option>
                      <option value="ev">Hybrid / EV Maintenance</option>
                      <option value="mechanical">General Mechanical / Brakes</option>
                      <option value="keys">Key Programming</option>
                      <option value="diagnostics">Other Diagnostics</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} aria-hidden="true" />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 rounded-xl transition-colors tracking-wide"
                  >
                    Request Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="bg-brand-charcoal overflow-hidden relative">
        <div className="h-1 bg-gradient-to-r from-brand-charcoal via-brand-red to-brand-charcoal" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            <div className="space-y-6">
              <span className="font-heading font-bold text-2xl tracking-tighter text-white inline-block">
                Surrey Centre <br /><span className="text-brand-red">Auto Repairs</span>
              </span>
              <p className="font-sans text-gray-400 text-sm">Where Trust Means a Big Deal.</p>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="font-sans text-sm text-gray-300 italic">
                  Stop by The Dell Shopping Centre area for a free consultation.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-white uppercase tracking-wider mb-6">Contact</h4>
              <address className="space-y-4 font-sans text-gray-400 text-sm not-italic">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="shrink-0 text-brand-red mt-0.5" aria-hidden="true" />
                  <a href="https://maps.google.com/?q=13654+104+Ave,+Surrey,+BC" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    13654 104 Ave,<br />Surrey, BC V3T 1W2
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-brand-red shrink-0" aria-hidden="true" />
                  <a href="tel:6045881266" className="hover:text-white transition-colors">(604) 588-1266</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-[18px] text-center text-brand-red font-bold shrink-0" aria-hidden="true">@</span>
                  <a href="mailto:surreycentreauto@gmail.com" className="hover:text-white transition-colors">surreycentreauto@gmail.com</a>
                </div>
              </address>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-white uppercase tracking-wider mb-6">Business Hours</h4>
              <ul className="space-y-3 font-sans text-sm text-gray-400">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Mon – Fri</span>
                  <span className="text-white">8:30am – 5:30pm</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Saturday</span>
                  <span className="text-white">9:00am – 5:00pm</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span>Sunday</span>
                  <span className="text-brand-red">Closed</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden h-[200px] border border-white/10 relative">
              <div className="absolute inset-0 bg-brand-charcoal/20 z-10 pointer-events-none" aria-hidden="true"></div>
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Map showing Surrey Centre Auto Repairs location"
                className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              />
              <a
                href="https://maps.google.com/?q=13654+104+Ave,+Surrey,+BC"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 left-4 right-4 bg-white text-brand-charcoal font-bold text-xs uppercase text-center py-2 rounded shadow-lg z-20 hover:bg-brand-red hover:text-white transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans tracking-wide">
            <p>© {new Date().getFullYear()} Surrey Centre Auto Repairs Inc. All rights reserved.</p>
            <p className="mt-2 md:mt-0">13654 104 Ave, Surrey, BC V3T 1W2</p>
          </div>
        </div>
      </footer>

      {/* ── Floating Chat ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" aria-label="Live chat">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-gray-100 flex flex-col"
              style={{ height: '450px', maxHeight: 'calc(100vh - 120px)' }}
              role="dialog"
              aria-modal="true"
              aria-label="Chat with Surrey Centre Auto Repairs"
            >
              <div className="bg-brand-charcoal text-white p-4 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-red opacity-10 pointer-events-none" aria-hidden="true"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0" aria-hidden="true">
                    <Wrench size={20} className="text-brand-red" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm tracking-wide">Surrey Centre Support</h3>
                    <p className="text-xs text-green-400 flex items-center gap-1 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 inline-block" aria-hidden="true"></span> Online
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white transition-colors relative z-10" aria-label="Close chat">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 flex flex-col" role="log" aria-live="polite" aria-label="Chat messages">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.isBot ? 'bg-white border border-gray-100 text-brand-charcoal rounded-tl-sm shadow-sm' : 'bg-brand-red text-white rounded-tr-sm shadow-md'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div className="p-3 bg-white border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    aria-label="Chat message"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim()}
                    aria-label="Send message"
                    className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center shrink-0 hover:bg-brand-red transition-colors disabled:opacity-50 disabled:hover:bg-brand-charcoal"
                  >
                    <Send size={18} className="translate-x-[1px]" aria-hidden="true" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
          aria-expanded={isChatOpen}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isChatOpen ? 'bg-brand-charcoal text-white hover:bg-gray-800' : 'bg-brand-red text-white hover:bg-brand-red-hover hover:scale-105'}`}
        >
          {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>

    </div>
  );
}
