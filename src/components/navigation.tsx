'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCandidate } from '@/lib/candidate-context';
import {
  ShieldAlert,
  ShieldCheck,
  Building2,
  FileText,
  LayoutDashboard,
  Home,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ChevronDown
} from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();
  const { selectedCandidateId, setSelectedCandidateId, candidate, allCandidates } = useCandidate();

  const navLinks = [
    { href: '/', label: 'Overview', icon: Home },
    { href: '/dashboard', label: 'Candidate Dashboard', icon: LayoutDashboard },
    { href: '/audit-log', label: 'Verifiable Audit Log', icon: FileCheck },
    { href: '/institution', label: 'Institution Analytics', icon: Building2 },
    { href: '/report', label: 'PDF Report Generator', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Banner for Institutional Credentials */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-slate-300 tracking-wider text-[11px] font-medium">
            Academic Promotion Audit Engine • CrossRef & NIH PubMed Ledger Active
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-400 text-[11px]">
          <span className="font-mono text-slate-400">Node Sync: 100% Validated</span>
          <span className="text-slate-700">|</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 inline" /> COI Filter Active
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.04, rotate: 1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors"
          >
            <ShieldCheck className="w-5 h-5 stroke-[2]" />
          </motion.div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-bold text-lg text-slate-900 tracking-tight">
                CiteWise
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-wide">
                Medical
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Research Impact Intelligence</p>
          </div>
        </Link>

        {/* Navigation Items with Animated Underline/Pill */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3.5 py-2 rounded-lg text-xs font-semibold tracking-normal transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-slate-100 rounded-lg border border-slate-200/60 shadow-xs"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-1.5 transition-colors ${
                    isActive ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Global Demo Preset Selector Dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 hover:border-slate-300 transition shadow-xs">
            <div className="flex flex-col pr-2">
              <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                Evaluation Candidate
              </span>
              <div className="relative flex items-center">
                <select
                  value={selectedCandidateId}
                  onChange={(e) => setSelectedCandidateId(e.target.value)}
                  className="appearance-none bg-transparent pr-6 text-xs font-bold text-slate-900 cursor-pointer focus:outline-none"
                >
                  {allCandidates.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.riskLevel})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-0 pointer-events-none" />
              </div>
            </div>

            {/* Candidate Risk Tag in Header */}
            <div className="hidden sm:block pl-2.5 border-l border-slate-200">
              {candidate.riskLevel === 'High Risk' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-red-50 text-red-700 border border-red-200">
                  <ShieldAlert className="w-3 h-3" /> High Risk
                </span>
              )}
              {candidate.riskLevel === 'Moderate Risk' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertTriangle className="w-3 h-3" /> Moderate
                </span>
              )}
              {candidate.riskLevel === 'High Integrity' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Subnavigation */}
      <div className="lg:hidden border-t border-slate-200 bg-slate-50/70 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap text-xs font-medium transition ${
                isActive
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
