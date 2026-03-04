import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const initialSoftware = [
  {
    id: 'sw-1',
    name: 'PathLab Manager',
    version: 'v3.1.2',
    category: 'pathology',
    icon: '🔬',
    size: '62 MB',
    platform: 'Windows / Web',
    status: 'live',
    desc: 'Complete pathology laboratory management — patient records, test reports, billing, and NABL compliance.',
    url: '#',
    changelog: 'Added barcode scanning, improved report templates.',
    date: '2025-11-01'
  },
  {
    id: 'sw-2',
    name: 'Trade Pilot AI',
    version: 'v2.1.0',
    category: 'exim',
    icon: '🚢',
    size: '52 MB',
    platform: 'Windows / macOS / Web',
    status: 'live',
    desc: 'Complete export guide & AI-powered trade solution. Features include buyer/supplier discovery, OEM data, profit calculators, and compliance red-flags.',
    url: '#',
    changelog: 'Renamed to Trade Pilot AI. Added AI buyer discovery, OEM manufacturer database, and shipping cost calculator.',
    date: '2026-02-21'
  },
  {
    id: 'sw-3',
    name: 'FoodFlow',
    version: 'v4.2.0',
    category: 'food',
    icon: '🍕',
    size: '55 MB',
    platform: 'Android / iOS / Web',
    status: 'live',
    desc: 'White-label food delivery platform — restaurant management, real-time tracking, and driver allocation.',
    url: '#',
    changelog: 'Live order tracking revamp, push notifications.',
    date: '2025-11-10'
  },
  {
    id: 'sw-4',
    name: 'LogixChain',
    version: 'v2.3.0',
    category: 'logistics',
    icon: '🚛',
    size: '80 MB',
    platform: 'Windows / Web',
    status: 'live',
    desc: 'Logistics & supply chain platform — fleet management, warehouse ops, and route optimization.',
    url: '#',
    changelog: 'AI route optimizer, fuel cost analytics.',
    date: '2025-10-28'
  },
  {
    id: 'sw-5',
    name: 'LegalMind AI',
    version: 'v1.0.0',
    category: 'legal',
    icon: '⚖️',
    size: 'N/A',
    platform: 'Web',
    status: 'comingSoon',
    desc: 'AI-powered legal research and case management tool for law firms.',
    url: '#',
    changelog: 'Initial release pending.',
    date: '2026-06-01'
  }
];

const Downloads = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [downloadState, setDownloadState] = useState<{ [key: string]: 'idle' | 'loading' | 'downloaded' | 'error' }>({});

  const handleDownload = (id: string) => {
    setDownloadState(prev => ({ ...prev, [id]: 'loading' }));
    setTimeout(() => {
      // Simulate a random failure
      if (Math.random() > 0.5) {
        setDownloadState(prev => ({ ...prev, [id]: 'downloaded' }));
      } else {
        setDownloadState(prev => ({ ...prev, [id]: 'error' }));
      }
    }, 2000);
  };

  const categories = ['all', ...Array.from(new Set(initialSoftware.map(s => s.category)))];

  const filteredSoftware = activeCategory === 'all'
    ? initialSoftware
    : initialSoftware.filter(s => s.category === activeCategory);

  return (
    <section id="downloads" className="py-32 px-6 bg-gradient-to-b from-primary-black via-carbon-dark to-primary-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">Software Downloads</h2>
          <p className="text-text-secondary text-lg">Access the latest versions of our powerful SaaS solutions.</p>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all",
                activeCategory === cat
                  ? "bg-accent border-accent text-white shadow-lg shadow-glow"
                  : "bg-carbon-medium border-metal-dark text-text-secondary hover:border-accent hover:text-accent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-8">
          <AnimatePresence>
            {filteredSoftware.map((release, index) => (
              <motion.div
                key={release.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  "grid grid-cols-[60px_1fr_auto] items-center gap-6 p-6 glass rounded-2xl border border-white/10 transition-all",
                  release.status === 'live' && "hover:border-accent/50 hover:bg-accent/5"
                )}
              >
                <div className="w-14 h-14 text-3xl flex items-center justify-center bg-carbon-dark rounded-xl">{release.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-3">
                    {release.name} 
                    <span className="text-sm font-mono text-accent">{release.version}</span>
                    {release.status !== 'live' && (
                      <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-[9px] font-bold uppercase tracking-wider">Coming Soon</span>
                    )}
                  </h3>
                  <p className="text-sm text-text-secondary">{release.desc}</p>
                  <p className="text-xs text-accent font-mono mt-2"><span className="font-bold">Latest:</span> {release.changelog}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-text-dim font-mono">
                    <span>{release.platform}</span>
                    <span>|</span>
                    <span>{release.size}</span>
                    <span>|</span>
                    <span>{new Date(release.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {release.status === 'live' ? (
                    <button 
                      onClick={() => handleDownload(release.id)}
                      disabled={downloadState[release.id] === 'loading' || downloadState[release.id] === 'downloaded'}
                      className={cn(
                        "flex items-center justify-center gap-2 w-36 h-11 bg-accent rounded-xl text-white font-bold uppercase tracking-widest text-xs shadow-glow transition-all",
                        downloadState[release.id] === 'loading' && 'cursor-wait bg-accent/80',
                        downloadState[release.id] === 'downloaded' && 'bg-emerald-500',
                        downloadState[release.id] === 'error' && 'bg-red-500',
                        downloadState[release.id] !== 'loading' && downloadState[release.id] !== 'downloaded' && 'hover:scale-105'
                      )}
                    >
                      {downloadState[release.id] === 'loading' ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : downloadState[release.id] === 'downloaded' ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Downloaded</span>
                        </>
                      ) : downloadState[release.id] === 'error' ? (
                        <>
                          <AlertCircle className="w-4 h-4" />
                          <span>Retry</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="flex items-center justify-center gap-2 w-36 h-11 bg-metal-dark rounded-xl text-text-dim font-bold uppercase tracking-widest text-xs cursor-not-allowed"
                    >
                      <Clock className="w-4 h-4" />
                      <span>Coming Soon</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Downloads;
