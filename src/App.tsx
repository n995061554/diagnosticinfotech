import { useFeatureToggles } from './contexts/FeatureToggleContext';

import ProductDetailModal from './components/ProductDetailModal';
import { productImages } from './images';
import Downloads from './components/Downloads';
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Shield, 
  Zap, 
  Cpu, 
  Activity, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Send,
  Database,
  Scale,
  Layers,
  Code2,
  Trophy,
  Rocket,
  Stethoscope,
  Utensils,
  Layout,
  BarChart3,
  Truck,
  CreditCard,
  Download,
  Plus,
  Trash2,
  Lock,
  Search,
  UserPlus,
  FlaskConical,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Check,
  User,
  Bell,
  Settings2,
  Languages,
  Globe2,
  Eye,
  EyeOff,
  Quote,
  PartyPopper,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from './lib/utils';

// --- Types ---



// --- Data ---

const products = [
  {
    id: 'pathlab',
    name: 'PathLab Manager',
    icon: <Stethoscope className="w-6 h-6" />,
    description: 'Complete pathology laboratory management — patient records, test reports, billing, and NABL compliance.',
    tags: ['Live', 'Multi-tenant', 'HL7 Ready'],
    status: 'live',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    longDescription: 'PathLab Manager is a comprehensive LIMS that automates your entire laboratory workflow, from patient registration to report delivery. It ensures NABL compliance with a complete audit trail and enhances efficiency with features like sample tracking, automated billing, and dedicated portals for doctors and hospitals.',
    pricing: [
      { plan: 'Starter', price: '₹5,999', features: ['500 Patients/mo', '10 Test Profiles', 'Basic Reporting', 'Email Support'] },
      { plan: 'Growth', price: '₹12,999', features: ['5000 Patients/mo', 'Unlimited Profiles', 'Advanced Analytics', 'Doctor Portal'] },
      { plan: 'Scale', price: 'Custom', features: ['Unlimited Patients', 'HL7/API Access', 'NABL Module', 'On-Premise Option'] },
    ],
    features: [
      'Patient & Sample Tracking',
      'Automated Report Generation',
      'Billing & Invoicing',
      'NABL Audit Trail',
      'Doctor & Hospital Portals',
      'API for 3rd Party Integration',
    ]
  },

  {
    id: 'exim',
    name: 'Trade Pilot AI',
    icon: <Globe className="w-6 h-6" />,
    description: 'End-to-end export business solution with AI-driven buyer/supplier discovery, OEM manufacturer data, and compliance red-flag detection.',
    tags: ['Live', 'AI Powered', 'OEM Data'],
    status: 'live',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    longDescription: 'Trade Pilot AI revolutionizes the export-import business by leveraging artificial intelligence to identify potential buyers and suppliers. It provides access to a global OEM manufacturer database, detects compliance red-flags in real-time, and automates documentation to streamline your trade operations.',
    pricing: [
      { plan: 'Starter', price: '₹8,999', features: ['AI Buyer Discovery', '50 Searches/mo', 'Basic Compliance Check', '2 Regions'] },
      { plan: 'Pro', price: '₹18,999', features: ['Unlimited Searches', 'OEM Database', 'Advanced Compliance', 'Global Access'] },
      { plan: 'Enterprise', price: 'Custom', features: ['Market Trend AI', 'API Access', 'Dedicated Analyst Support'] },
    ],
    features: [
      'AI-Powered Buyer/Supplier Matching',
      'Global OEM Manufacturer Database',
      'Real-time Compliance Red-Flagging',
      'Shipment & Logistics Tracking',
      'Automated Documentation',
      'Market Opportunity Analysis',
    ]
  },
  {
    id: 'foodflow',
    name: 'FoodFlow',
    icon: <Utensils className="w-6 h-6" />,
    description: 'White-label food delivery platform — restaurant management, real-time tracking, and driver allocation.',
    tags: ['Live', 'Multi-tenant', 'GPS'],
    status: 'live',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    longDescription: 'FoodFlow is a complete white-label solution for food delivery businesses. It offers a suite of tools for restaurant and menu management, real-time driver tracking, and automated order allocation. The platform includes customizable customer and driver apps, seamless payment gateway integration, and a powerful promotions engine.',
    pricing: [
      { plan: 'City', price: '₹12,999', features: ['Up to 50 restaurants', 'Core delivery logic', 'Customer app'] },
      { plan: 'Region', price: '₹24,999', features: ['Unlimited restaurants', 'Advanced routing', 'Full branding'] },
      { plan: 'National', price: 'Custom', features: ['Multi-city support', 'API access', 'Custom features'] },
    ],
    features: [
      'Restaurant & Menu Management',
      'Real-time Driver Tracking',
      'Automated Order Allocation',
      'Customer & Driver Apps (White-label)',
      'Payment Gateway Integration',
      'Promotions & Discount Engine',
    ]
  },
  {
    id: 'laundry',
    name: 'LaundryOS',
    icon: <Layout className="w-6 h-6" />,
    description: 'Full-stack laundry management with pickup-delivery scheduling, garment tracking, and QR codes.',
    tags: ['Live', 'Multi-tenant'],
    status: 'live',
    color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    longDescription: 'LaundryOS is a full-stack management platform for laundry businesses. It streamlines operations with features like pickup and delivery scheduling, QR code-based garment tracking, and automated billing. The system also includes a customer app with order history and route optimization for drivers, with support for franchise and multi-store models.',
    pricing: [
      { plan: 'Standard', price: '₹6,999', features: ['Up to 1000 orders/mo', 'Garment tracking', 'Basic scheduling'] },
      { plan: 'Premium', price: '₹12,999', features: ['Unlimited orders', 'QR code tagging', 'Driver app'] },
      { plan: 'Chain', price: 'Custom', features: ['Multi-location support', 'API access', 'Franchise model'] },
    ],
    features: [
      'Pickup & Delivery Scheduling',
      'QR Code-based Garment Tracking',
      'Automated Billing & Payments',
      'Customer App with Order History',
      'Route Optimization for Drivers',
      'Franchise & Multi-store Support',
    ]
  },
  {
    id: 'accubooks',
    name: 'AccuBooks',
    icon: <BarChart3 className="w-6 h-6" />,
    description: 'GST-compliant accounting software with tally integration, automated reconciliation, and multi-company support.',
    tags: ['Live', 'GST Ready', 'Multi-tenant'],
    status: 'live',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    longDescription: 'AccuBooks is a GST-compliant accounting software designed for Indian businesses. It simplifies financial management with features like automated bank reconciliation, Tally integration, and expense tracking. The platform supports multi-company and multi-currency operations, providing comprehensive financial reporting and analytics.',
    pricing: [
      { plan: 'Solo', price: '₹3,499', features: ['1 User', 'GST Filing', '100 Invoices/mo', 'Bank Reconciliation'] },
      { plan: 'Team', price: '₹8,499', features: ['5 Users', 'Tally Sync', 'Unlimited Invoices', 'Expense Tracking'] },
      { plan: 'Corporate', price: 'Custom', features: ['Multi-Company', 'Advanced Audit Logs', 'API Access', 'Custom Reports'] },
    ],
    features: [
      'GST-Compliant Invoicing',
      'Automated Bank Reconciliation',
      'Tally Integration',
      'Expense Management',
      'Financial Reporting & Analytics',
      'Multi-company & Multi-currency Support',
    ]
  },
  {
    id: 'logix',
    name: 'LogixChain',
    icon: <Truck className="w-6 h-6" />,
    description: 'Logistics & supply chain platform — fleet management, warehouse ops, and real-time freight tracking.',
    tags: ['Live', 'AI Routes', 'GPS'],
    status: 'live',
    color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    longDescription: 'LogixChain is a powerful logistics and supply chain management platform. It offers a complete suite of tools for fleet and vehicle management, AI-powered route optimization, and warehouse operations. The system includes real-time freight tracking, a proof of delivery (POD) system, and in-depth supply chain analytics.',
    pricing: [
      { plan: 'Fleet', price: '₹8,999', features: ['Up to 50 vehicles', 'Real-time tracking', 'Basic routing'] },
      { plan: 'Warehouse', price: '₹18,999', features: ['Inventory management', 'AI route optimization', 'WMS'] },
      { plan: 'Enterprise', price: 'Custom', features: ['Full SCM suite', 'API access', 'ERP integration'] },
    ],
    features: [
      'Fleet & Vehicle Management',
      'AI-Powered Route Optimization',
      'Warehouse Management System (WMS)',
      'Real-time Freight Tracking',
      'Proof of Delivery (POD) System',
      'Supply Chain Analytics',
    ]
  },
  {
    id: 'legalmind',
    name: 'LegalMind AI',
    icon: <Scale className="w-6 h-6" />,
    description: 'AI-powered legal research and case management tool for law firms, streamlining workflows and improving case outcomes.',
    tags: ['Coming Soon', 'AI Powered', 'Legal Tech'],
    status: 'comingSoon',
    color: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    longDescription: 'LegalMind AI is a cutting-edge legal tech tool that enhances case law research and management for law firms. It uses AI to assist with document summarization, case timeline management, and predictive outcome analysis. The platform also includes a secure client collaboration portal and integrates with major legal databases.',
    pricing: [],
    features: [
      'AI-Assisted Case Law Research',
      'Automated Document Summarization',
      'Case Timeline & Deadline Management',
      'Secure Client Collaboration Portal',
      'Predictive Case Outcome Analysis',
      'Integration with Legal Databases',
    ]
  },
  {
    id: 'payrecov',
    name: 'PayRecov',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Intelligent payment recovery software with automated follow-up and legal notice generation.',
    tags: ['Live', 'AI Powered'],
    status: 'live',
    color: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    longDescription: 'PayRecov is an intelligent payment recovery software that automates the follow-up process for overdue payments. It uses AI to send timely reminders, generate legal notices, and streamline the recovery workflow, helping businesses improve their cash flow and reduce manual effort.',
  }
];



const portfolioData = products.map((p, i) => ({
  id: i + 1,
  title: p.name,
  description: p.description,

  tech: p.tags
}));

const skillsData = [
  { name: 'Vertical Agility', icon: <Rocket />, level: 95, category: 'core' },
  { name: 'Multi-Tenant Core', icon: <Layers />, level: 98, category: 'core' },
  { name: 'Indian Innovation', icon: <Globe />, level: 92, category: 'core' },
  { name: 'Zero-Trust Security', icon: <Shield />, level: 96, category: 'core' },
  { name: 'AI Integration', icon: <Zap />, level: 85, category: 'tech' },
  { name: 'Cloud Native', icon: <Cpu />, level: 90, category: 'tech' },
  { name: 'Real-time GPS', icon: <Activity />, level: 88, category: 'tech' },
  { name: 'HL7 Standards', icon: <Database />, level: 82, category: 'tech' }
];

// --- Components ---



const Loader = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-primary-black z-[10000] flex flex-col items-center justify-center gap-8"
  >
    <div className="relative w-24 h-24">
      {[0, 60, 120].map((deg, i) => (
        <motion.div
          key={i}
          animate={{ rotate: [deg, deg + 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
          className="absolute inset-0 border-2 border-transparent"
          style={{ 
            borderImage: `linear-gradient(45deg, var(--color-accent-${i === 0 ? 'red' : i === 1 ? 'blue' : 'green'}), var(--color-accent-${i === 0 ? 'blue' : i === 1 ? 'green' : 'purple'})) 1` 
          }}
        />
      ))}
    </div>
    <div className="text-accent text-lg uppercase tracking-[0.3em] animate-pulse">Refracting Reality...</div>
  </motion.div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'account' | 'notifications' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },

    { name: 'Billing', href: '#products' },
    { name: 'Modules', href: '#settings' },
  ];

  const notifications = [
    { id: 1, title: 'New Report Ready', time: '2m ago', icon: <FileText className="w-4 h-4" /> },
    { id: 2, title: 'Payment Successful', time: '1h ago', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 3, title: 'System Update', time: '5h ago', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 border-b border-white/10",
      isScrolled ? "bg-primary-black/98 backdrop-blur-2xl py-4" : "bg-gradient-to-b from-primary-black/90 to-transparent py-6"
    )}>
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-4 group">
          <div className="w-10 h-10 relative flex items-center justify-center">
            <div className="w-8 h-8 rotate-45 bg-accent prism-shine" />
          </div>
          <span className="text-2xl font-black tracking-widest uppercase">
            <span className="bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">DIAGNOSTIC</span>
            <span className="text-text-secondary font-light ml-1">INFOTECH</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-2">
            {navLinks.map(link => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent transition-all group-hover:w-4/5" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            {/* Notifications Dropdown */}
            <div className="relative" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')}
                className={cn(
                  "p-2 rounded-xl transition-all relative",
                  activeDropdown === 'notifications' ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-white/5 hover:text-white"
                )}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-primary-black" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-80 glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <div className="p-4 border-b border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">Notifications</span>
                      <button className="text-[9px] uppercase tracking-widest text-accent hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className="p-4 hover:bg-white/5 transition-colors flex gap-4 border-b border-white/5 last:border-0">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                            {n.icon}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white mb-1">{n.title}</div>
                            <div className="text-[10px] text-text-dim font-mono">{n.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <a href="#settings" onClick={() => setActiveDropdown(null)} className="block p-4 text-center text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-accent transition-colors bg-white/5">
                      View All Activity
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Account Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'account' ? null : 'account')}
                className={cn(
                  "flex items-center gap-3 p-1 pr-3 rounded-full transition-all border",
                  activeDropdown === 'account' ? "bg-accent/10 border-accent/30" : "bg-white/5 border-white/10 hover:border-white/20"
                )}
              >
                <img src="https://picsum.photos/seed/admin/100/100" alt="Avatar" className="w-8 h-8 rounded-full border border-white/10" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Admin</span>
              </button>

              <AnimatePresence>
                {activeDropdown === 'account' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-64 glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <div className="p-6 border-b border-white/5">
                      <div className="text-xs font-bold text-white mb-1">Admin User</div>
                      <div className="text-[10px] text-text-dim font-mono">admin@diagnosticinfotech.com</div>
                    </div>
                    <div className="p-2">
                      {[
                        { label: 'Profile Settings', icon: <User className="w-4 h-4" />, href: '#settings' },
                        { label: 'Billing & Plans', icon: <CreditCard className="w-4 h-4" />, href: '#products' },
                        { label: 'Security', icon: <Shield className="w-4 h-4" />, href: '#settings' },
                      ].map(item => (
                        <a 
                          key={item.label}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:bg-accent/10 hover:text-accent transition-all"
                        >
                          {item.icon}
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="p-2 border-t border-white/5">
                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all">
                        <X className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-primary-black/98 border-b border-white/10 p-8 flex flex-col items-center gap-6 md:hidden"
          >
            {navLinks.map(link => (
              <a 
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest text-text-secondary hover:text-accent"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % portfolioData.length);
  const prevSlide = () => setCurrentIndex(prev => (prev - 1 + portfolioData.length) % portfolioData.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(153,69,255,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="w-full max-w-7xl mx-auto px-6 relative">
        <div className="h-[600px] relative perspective-[1200px]">
          <div className="w-full h-full relative preserve-3d">
            {portfolioData.map((item, index) => {
              let offset = index - currentIndex;
              if (offset > portfolioData.length / 2) offset -= portfolioData.length;
              if (offset < -portfolioData.length / 2) offset += portfolioData.length;

              const absOffset = Math.abs(offset);
              const sign = offset < 0 ? -1 : 1;

              const isCenter = absOffset === 0;
              const isVisible = absOffset <= 2;

              return (
                <motion.div
                  key={item.id}
                  animate={{
                    x: isCenter ? '-50%' : `${-50 + sign * (absOffset === 1 ? 80 : 140)}%`,
                    z: isCenter ? 0 : -200 * absOffset,
                    rotateY: isCenter ? 0 : -30 * sign * absOffset,
                    opacity: isVisible ? 1 - absOffset * 0.4 : 0,
                    scale: 1 - absOffset * 0.1,
                  }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[400px] h-[500px] cursor-pointer",
                    !isCenter && "pointer-events-none"
                  )}
                  style={{ zIndex: 10 - absOffset }}
                  onClick={() => { if (isCenter) window.location.hash = '#about'; }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-carbon-medium to-carbon-dark border-2 border-metal-dark rounded-[20px] p-8 relative overflow-hidden shadow-2xl group">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent animate-scanline" />
                    <div className="absolute top-5 right-8 text-6xl font-black text-accent/10 font-display">0{item.id}</div>
                    


                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider bg-gradient-to-br from-white to-accent bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-[10px] text-accent uppercase tracking-widest">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button className="w-full py-3 bg-accent rounded-full text-white font-bold uppercase tracking-widest text-xs shadow-lg shadow-glow hover:scale-105 transition-transform">
                      Explore
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-12">
          <button onClick={prevSlide} className="w-14 h-14 rounded-full glass flex items-center justify-center text-accent hover:border-accent hover:scale-110 transition-all">
            <ChevronLeft />
          </button>
          <div className="flex items-center gap-3">
            {portfolioData.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  i === currentIndex ? "bg-accent scale-125 shadow-glow" : "bg-metal-dark"
                )}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="w-14 h-14 rounded-full glass flex items-center justify-center text-accent hover:border-accent hover:scale-110 transition-all">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => (
  <section id="about" className="py-32 px-6 relative overflow-hidden">
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <div className="w-full h-0.5 bg-carbon-medium mb-16 relative overflow-hidden">
        <motion.div 
          animate={{ left: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      </div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight bg-gradient-to-r from-accent via-accent to-accent bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-flow"
      >
        Established in Surat,<br />Engineering for the World.
      </motion.h2>

      <p className="text-xl text-text-secondary font-light max-w-3xl mx-auto mb-20 leading-relaxed">
        Founded in 2026 in the vibrant business hub of Surat, Gujarat, <span className="text-white font-bold">Diagnostic Infotech</span> began with a single mission: to bridge the gap between complex enterprise requirements and the agility of modern SaaS.
      </p>

      <div className="grid md:grid-cols-3 gap-12">
        {[
          { icon: '💎', title: 'Innovation', desc: 'Breaking boundaries with revolutionary approaches that redefine industry standards and push the limits of what\'s possible.' },
          { icon: '🔬', title: 'Precision', desc: 'Meticulous attention to detail ensures every pixel, every line of code, and every interaction is perfectly crafted.' },
          { icon: '∞', title: 'Evolution', desc: 'Continuous adaptation and growth, staying ahead of trends while building timeless solutions for tomorrow.' },
        ].map((pillar, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="p-10 rounded-3xl glass relative group hover:-translate-y-2 transition-all"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            <div className="text-5xl mb-6 relative">
              {pillar.icon}
              <div className="absolute inset-0 bg-accent rounded-full opacity-20 blur-xl group-hover:scale-150 transition-transform" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">{pillar.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{pillar.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Background Particles */}
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -1000],
            opacity: [0, 1, 1, 0],
            rotate: [0, 720]
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity, 
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-accent rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: '100%' }}
        />
      ))}
    </div>
  </section>
);

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Rajesh Mehta",
      role: "Medical Director",
      company: "Surat Diagnostic Center",
      quote: "Diagnostic Infotech transformed our lab operations. The multi-tenant architecture allowed us to scale across 5 branches in just two weeks.",
      image: "https://picsum.photos/seed/rajesh/100/100"
    },
    {
      name: "Ananya Sharma",
      role: "CEO",
      company: "Global Trade Solutions",
      quote: "Trade Pilot AI is a game-changer. The compliance red-flag detection saved us from a major regulatory hurdle in our first month.",
      image: "https://picsum.photos/seed/ananya/100/100"
    },
    {
      name: "Vikram Singh",
      role: "Operations Manager",
      company: "FoodFlow Logistics",
      quote: "The real-time tracking and driver allocation in FoodFlow are superior to any other white-label solution we've tested. Highly recommended.",
      image: "https://picsum.photos/seed/vikram/100/100"
    }
  ];

  return (
    <section id="testimonials" className="py-32 px-6 bg-primary-black relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">Client Intelligence</h2>
          <p className="text-text-secondary text-lg">Feedback from the front lines of digital transformation.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[32px] border border-white/10 relative group hover:border-accent/30 transition-all"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-glow rotate-[-10deg] group-hover:rotate-0 transition-transform">
                <Quote className="w-6 h-6" />
              </div>
              
              <p className="text-lg text-text-secondary italic leading-relaxed mb-10 pt-4">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-14 h-14 rounded-2xl border-2 border-accent/20 group-hover:border-accent transition-colors object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider">{t.name}</h4>
                  <p className="text-[10px] text-accent font-mono uppercase tracking-widest">{t.role}</p>
                  <p className="text-[10px] text-text-dim uppercase tracking-widest">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => (
  <section id="stats" className="py-32 px-6 bg-gradient-to-b from-primary-black via-carbon-dark to-primary-black">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">Performance Metrics</h2>
        <p className="text-text-secondary text-lg">Real-time analytics and achievements powered by cutting-edge technology</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <Rocket />, target: 150, label: 'Projects Completed', desc: 'Successfully delivered enterprise-level solutions across multiple industries.' },
          { icon: <Zap />, target: 99, label: 'Client Satisfaction %', desc: 'Maintaining excellence through continuous feedback loops and agile methodologies.' },
          { icon: <Trophy />, target: 25, label: 'Industry Awards', desc: 'Recognized globally for innovation in digital transformation.' },
          { icon: <Code2 />, target: 500, label: 'Code Commits Daily', desc: 'Continuous integration and deployment ensuring maximum code quality.' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-2xl text-center relative overflow-hidden group hover:border-accent transition-all"
          >
            <div className="w-16 h-16 mx-auto bg-accent rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-glow group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div className="text-5xl font-black mb-2 font-display">{stat.target}+</div>
            <div className="text-xs text-text-secondary uppercase tracking-[0.2em] mb-4">{stat.label}</div>
            <p className="text-[11px] text-text-dim leading-relaxed">{stat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-32 px-6 bg-primary-black overflow-hidden">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-8 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">About Diagnostic Infotech</h2>
          <div className="space-y-10 text-text-secondary text-lg leading-relaxed">
            <p>Founded in 2026 by Mr. Nikunj Patel, Diagnostic Infotech emerged from a vision to bridge the gap between cutting-edge technology and critical business sectors. We are a team of engineers, innovators, and strategists dedicated to architecting robust, scalable, and intelligent SaaS solutions.</p>
            <div className="border-l-4 border-accent pl-6 space-y-4">
              <h3 className="text-2xl font-bold text-white">Our Founder</h3>
              <p>Mr. Nikunj Patel, a visionary in the tech industry, founded Diagnostic Infotech with the goal of revolutionizing business solutions through technology.</p>
            </div>
            <div className="border-l-4 border-accent pl-6 space-y-4">
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              <p>To empower businesses with transformative digital tools that drive efficiency, foster growth, and create a competitive edge in a rapidly evolving global market.</p>
            </div>
            <p>From our headquarters in Surat, we've expanded our digital footprint across India, serving a diverse clientele from pathology labs to international trade conglomerates. Our commitment is to engineering excellence and client success.</p>
          </div>
        </div>
      </motion.div>


    </div>
  </section>
);

const Products = ({ onProductSelect }) => {
  

  return (
    <>
      
      
  <section id="products" className="py-32 px-6 bg-primary-black">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">10+ SaaS Verticals</h2>
        <p className="text-text-secondary text-lg">Fully isolated, multi-tenant solutions designed for rapid deployment.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            onClick={() => onProductSelect(product)}
            whileHover={{ y: -12, scale: 1.02 }}
            className={cn(
              "p-8 rounded-[32px] border transition-all cursor-pointer group relative overflow-hidden flex flex-col h-full",
              "hover:border-accent/50 hover:shadow-[0_0_40px_rgba(var(--accent-rgb),0.15)]",
              product.color
            )}
          >
            {/* Hover Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:bg-accent/10 group-hover:text-accent transition-all duration-500">
                {product.icon}
              </div>
              
              <h3 className="font-display text-2xl font-bold mb-3 flex items-center gap-3">
                {product.name}
                {product.status === 'live' && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                )}
              </h3>
              
              <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-grow">{product.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent group-hover:tracking-[0.3em] transition-all">Explore Vertical</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
    </>
  );
}








const Settings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'app' | 'security' | 'features'>('profile');
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@diagnosticinfotech.com',
    bio: 'Senior Systems Architect at Diagnostic Infotech.',
    avatar: 'https://picsum.photos/seed/admin/200/200'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const [appConfig, setAppConfig] = useState({
    language: 'English (US)',
    timezone: 'UTC+5:30 (IST)',
    compactMode: false
  });

  const { toggles, setToggle } = useFeatureToggles();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'app', label: 'App Config', icon: <Settings2 className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'features', label: 'Feature Toggles', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <section id="settings" className="py-32 px-6 bg-primary-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">Control Center</h2>
          <p className="text-text-secondary text-lg">Manage your identity, preferences, and system parameters.</p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          {/* Sidebar Tabs */}
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all border",
                  activeTab === tab.id 
                    ? "bg-accent/10 border-accent/30 text-accent shadow-glow" 
                    : "bg-white/5 border-transparent text-text-secondary hover:bg-white/10"
                )}
              >
                {tab.icon}
                <span className="text-sm font-bold uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="glass p-10 rounded-[32px] border border-white/10 min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-8">
                    <div className="relative group">
                      <img src={profile.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-2 border-accent shadow-glow" />
                      <button className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold uppercase tracking-widest">Change</button>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{profile.name}</h3>
                      <p className="text-text-dim text-sm font-mono">{profile.email}</p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-text-dim ml-2">Full Name</label>
                      <input 
                        type="text" 
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full bg-carbon-dark border border-metal-dark rounded-xl px-6 py-4 outline-none focus:border-accent transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-text-dim ml-2">Bio</label>
                      <textarea 
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        className="w-full bg-carbon-dark border border-metal-dark rounded-xl px-6 py-4 outline-none focus:border-accent transition-all h-32 resize-none" 
                      />
                    </div>
                  </div>
                  <button className="px-8 py-4 bg-accent rounded-xl text-white font-black uppercase tracking-widest text-xs shadow-glow hover:-translate-y-1 transition-all">Save Profile Changes</button>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">// CHANNELS & ALERTS</div>
                  <div className="space-y-4">
                    {[
                      { id: 'email', label: 'Email Notifications', desc: 'Receive critical system alerts and reports via email.', icon: <Mail className="w-5 h-5" /> },
                      { id: 'push', label: 'Push Notifications', desc: 'Real-time alerts in your browser and mobile device.', icon: <Zap className="w-5 h-5" /> },
                      { id: 'sms', label: 'SMS Alerts', desc: 'Urgent diagnostic alerts sent directly to your phone.', icon: <Phone className="w-5 h-5" /> },
                      { id: 'marketing', label: 'Marketing Updates', desc: 'Stay informed about new SaaS verticals and features.', icon: <Rocket className="w-5 h-5" /> },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-accent/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-white/5 text-text-secondary group-hover:text-accent transition-colors">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider">{item.label}</h4>
                            <p className="text-xs text-text-dim">{item.desc}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setNotifications({...notifications, [item.id]: !notifications[item.id as keyof typeof notifications]})}
                          className={cn(
                            "w-12 h-6 rounded-full relative transition-all",
                            notifications[item.id as keyof typeof notifications] ? "bg-accent" : "bg-metal-dark"
                          )}
                        >
                          <motion.div 
                            animate={{ x: notifications[item.id as keyof typeof notifications] ? 24 : 4 }}
                            className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-lg" 
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'app' && (
                <motion.div
                  key="app"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">// SYSTEM PARAMETERS</div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-text-dim ml-2">Language</label>
                      <div className="relative">
                        <Languages className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                        <select 
                          value={appConfig.language}
                          onChange={(e) => setAppConfig({...appConfig, language: e.target.value})}
                          className="w-full bg-carbon-dark border border-metal-dark rounded-xl pl-12 pr-6 py-4 outline-none focus:border-accent transition-all appearance-none text-sm"
                        >
                          <option>English (US)</option>
                          <option>Hindi (India)</option>
                          <option>Gujarati (India)</option>
                          <option>Spanish (ES)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-text-dim ml-2">Timezone</label>
                      <div className="relative">
                        <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                        <select 
                          value={appConfig.timezone}
                          onChange={(e) => setAppConfig({...appConfig, timezone: e.target.value})}
                          className="w-full bg-carbon-dark border border-metal-dark rounded-xl pl-12 pr-6 py-4 outline-none focus:border-accent transition-all appearance-none text-sm"
                        >
                          <option>UTC+5:30 (IST)</option>
                          <option>UTC+0:00 (GMT)</option>
                          <option>UTC-8:00 (PST)</option>
                        </select>
                      </div>
                    </div>
                  </div>


                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">// DATA PROTECTION</div>
                  <div className="p-8 bg-red-500/5 rounded-2xl border border-red-500/20 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold uppercase tracking-wider">Two-Factor Authentication</h4>
                        <p className="text-sm text-text-dim">Add an extra layer of security to your account by requiring a code from your phone.</p>
                      </div>
                    </div>
                    <button className="w-fit px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Enable 2FA Now</button>
                  </div>

                  <div className="grid gap-4">
                    <button className="w-full flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
                      <div className="flex items-center gap-4">
                        <Lock className="w-5 h-5 text-text-secondary" />
                        <span className="text-sm font-bold uppercase tracking-widest">Change Password</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-text-dim" />
                    </button>
                    <button className="w-full flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
                      <div className="flex items-center gap-4">
                        <Activity className="w-5 h-5 text-text-secondary" />
                        <span className="text-sm font-bold uppercase tracking-widest">Login Activity</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-text-dim" />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">// FEATURE TOGGLES</div>
                  <h3 className="text-2xl font-bold text-white">Module Activation</h3>
                  <p className="text-text-secondary">Enable or disable major SaaS verticals.</p>
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    {Object.keys(toggles).map((key) => (
                      <div key={key} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-transparent hover:border-white/10 transition-all">
                        <span className="font-bold text-lg capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <button 
                          onClick={() => setToggle(key as keyof typeof toggles, !toggles[key as keyof typeof toggles])}
                          className={cn(
                            'w-16 h-9 rounded-full p-1 transition-colors relative',
                            toggles[key as keyof typeof toggles] ? 'bg-accent' : 'bg-carbon-medium'
                          )}
                        >
                          <motion.div 
                            layout 
                            className="w-7 h-7 bg-white rounded-full shadow-lg"
                            transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                            style={{ x: toggles[key as keyof typeof toggles] ? '100%' : '0%' }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Arsenal = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <section id="arsenal" className="py-32 px-6 bg-carbon-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">Technical Arsenal</h2>
          <p className="text-text-secondary text-lg">Mastery of cutting-edge technologies and frameworks</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['all', 'core', 'tech'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-full border text-sm uppercase tracking-widest transition-all",
                activeCategory === cat 
                  ? "bg-accent border-accent text-white shadow-lg shadow-glow" 
                  : "bg-carbon-medium border-metal-dark text-text-secondary hover:border-accent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="w-[180px] h-[210px] relative group"
              >
                <div className="absolute inset-0 rotate-[30deg] rounded-[20px] bg-gradient-to-br from-carbon-medium to-carbon-light border-2 border-metal-dark group-hover:border-accent group-hover:shadow-glow transition-all overflow-hidden">
                  <div className="absolute inset-0 -rotate-[30deg] flex flex-col items-center justify-center p-6">
                    <div className="text-4xl mb-4 text-accent animate-float">
                      {skill.icon}
                    </div>
                    <div className="text-sm font-bold uppercase tracking-wider text-center mb-3">{skill.name}</div>
                    <div className="w-full h-1 bg-carbon-dark rounded-full overflow-hidden mb-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        className="h-full bg-accent"
                      />
                    </div>
                    <div className="text-xs font-bold text-text-secondary">{skill.level}%</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-32 px-6 bg-gradient-to-b from-carbon-dark to-primary-black">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">Initialize Connection</h2>
        <p className="text-text-secondary text-lg">Ready to transform your vision into reality? Let's connect.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          {[
            { icon: <MapPin />, title: 'Location', value: 'Surat, Gujarat, India', href: 'https://maps.google.com/?q=Surat+Gujarat+India' },
            { icon: <Mail />, title: 'Email', value: 'hello@prismflux.io', href: 'mailto:hello@prismflux.io' },
            { icon: <Phone />, title: 'Phone', value: '+91 9925061554', href: 'tel:+919925061554' },
            { icon: <Calendar />, title: 'Schedule Meeting', value: 'Book a consultation', href: 'https://calendly.com' },
          ].map((item, i) => (
            <a 
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 p-6 glass rounded-2xl group hover:translate-x-4 transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white shadow-lg group-hover:rotate-[10deg] transition-transform">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-text-secondary group-hover:text-accent transition-colors">{item.title}</h4>
                <p className="text-lg font-bold">{item.value}</p>
              </div>
              <ExternalLink className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        <form className="glass p-10 rounded-3xl space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-text-dim ml-2">Name</label>
              <input type="text" className="w-full bg-carbon-dark border border-metal-dark rounded-xl px-6 py-4 outline-none focus:border-accent transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-text-dim ml-2">Email</label>
              <input type="email" className="w-full bg-carbon-dark border border-metal-dark rounded-xl px-6 py-4 outline-none focus:border-accent transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-text-dim ml-2">Subject</label>
            <input type="text" className="w-full bg-carbon-dark border border-metal-dark rounded-xl px-6 py-4 outline-none focus:border-accent transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-text-dim ml-2">Message</label>
            <textarea className="w-full bg-carbon-dark border border-metal-dark rounded-xl px-6 py-4 outline-none focus:border-accent transition-all h-40 resize-none" />
          </div>
          <button className="w-full py-5 bg-accent rounded-xl text-white font-black uppercase tracking-[0.3em] shadow-xl shadow-glow hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
            <Send className="w-5 h-5" /> Transmit Message
          </button>
        </form>
      </div>
    </div>
  </section>
);

const PaymentSuccess = () => {
  const [planName, setPlanName] = useState('Premium');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get('plan');
    if (plan) setPlanName(plan);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-primary-black flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
      
      <div className="max-w-2xl w-full glass p-12 rounded-[40px] border border-accent/30 text-center relative z-10 shadow-glow">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
          Payment Successful
        </h1>
        
        <p className="text-text-secondary text-lg mb-10 leading-relaxed">
          Welcome to the ecosystem! Your <span className="text-white font-bold">{planName}</span> subscription has been activated. You now have full access to your selected SaaS verticals and premium features.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12 text-left">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-4 text-accent">
              <PartyPopper className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Next Steps</span>
            </div>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                Check your email for the onboarding guide.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                Access your dashboard via the Control Center.
              </li>
            </ul>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-4 text-accent">
              <Sparkles className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Premium Perks</span>
            </div>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                24/7 Priority Technical Support.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                Advanced AI Insights enabled.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="px-10 py-4 bg-accent text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-glow hover:scale-105 transition-all"
          >
            Go to Dashboard
          </button>
          <button 
            onClick={() => window.location.hash = '#settings'}
            className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
          >
            Configure Settings
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="py-20 px-6 border-t border-metal-dark bg-primary-black">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 relative flex items-center justify-center">
            <div className="w-8 h-8 rotate-45 bg-accent" />
          </div>
          <span className="text-2xl font-black tracking-widest uppercase">DIAGNOSTIC<span className="text-text-secondary font-light">INFOTECH</span></span>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed">
          Engineering intelligent multi-tenant SaaS solutions that power businesses across India and beyond.
        </p>
        <div className="flex gap-4">
          {['f', 't', 'in', 'ig'].map(s => (
            <a key={s} href="#" className="w-10 h-10 rounded-full bg-carbon-medium border border-metal-dark flex items-center justify-center text-text-secondary hover:bg-accent hover:text-white transition-all">
              {s}
            </a>
          ))}
        </div>
      </div>

      {[
        { title: 'Services', links: ['Web Development', 'App Development', 'Cloud Solutions', 'AI Integration'] },
        { title: 'Company', links: ['About Us', 'Our Team', 'Careers', 'Contact Us'] },
        { title: 'Legal', links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Compliance'] },
      ].map((section, i) => (
        <div key={i}>
          <h4 className="text-sm uppercase tracking-[0.2em] font-black mb-8">{section.title}</h4>
          <ul className="space-y-4">
            {section.links.map(link => (
              <li key={link}>
                <a href="#" className="text-sm text-text-secondary hover:text-accent hover:pl-2 transition-all">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="max-w-7xl mx-auto pt-10 border-t border-metal-dark flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-text-dim font-medium uppercase tracking-widest">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div>© 2026 DIAGNOSTIC INFOTECH. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-accent transition-colors">Terms</a>
          <a href="#" className="hover:text-accent transition-colors">Privacy</a>
          <a href="#" className="hover:text-accent transition-colors">Cookies</a>
        </div>
      </div>
      <div>Designed by <a href="https://templatemo.com" className="text-accent">TemplateMo</a></div>
    </div>
  </footer>
);

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const { toggles } = useFeatureToggles();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      setIsPaymentSuccess(true);
    }
    
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);



  return (
        <div className="min-h-screen selection:bg-accent/30 bg-primary-black dark">
      <AnimatePresence>
        {isLoading && <Loader />}
      </AnimatePresence>

      {isPaymentSuccess ? (
        <PaymentSuccess />
      ) : (
        <>
          <Navbar />
          <Hero />
          <About />
          <Philosophy />
                      <Products onProductSelect={setSelectedProduct} />
            <Downloads />

          <Settings />
          <Stats />
          <Testimonials />
          <Arsenal />
          <Contact />
          <Footer />
          {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

        </>
      )}
    </div>
  );
}
