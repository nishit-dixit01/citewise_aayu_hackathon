'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCandidate } from '@/lib/candidate-context';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  FileCheck2,
  Search,
  ExternalLink,
  ChevronRight,
  Info,
  Layers,
  Sparkles,
  GitMerge,
  FilterX
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { allCandidates, setSelectedCandidateId } = useCandidate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPreviewId, setSelectedPreviewId] = useState('nishit-dixit');

  const filteredCandidates = allCandidates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePreview = allCandidates.find((c) => c.id === selectedPreviewId) || allCandidates[0];

  const handleLaunchCandidate = (id: string) => {
    setSelectedCandidateId(id);
    router.push('/dashboard');
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Asymmetric Left-aligned Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-800 text-[11px] font-mono font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>Academic Promotion & Tenure Audit Engine</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-tight leading-[1.12]">
                Transparent citation forensics for clinical & academic promotions.
              </h1>

              <p className="text-base text-slate-600 font-sans leading-relaxed max-w-2xl">
                Commercial citation metrics fail to expose reciprocal laboratory loops, preprint duplication, and repeated in-text counts. 
                <strong className="text-slate-800 font-semibold"> CiteWise</strong> systematically audits medical literature to deliver verified, conflict-free metrics for university boards.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => handleLaunchCandidate(activePreview.id)}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Launch Assessment Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <Link
                  href="/audit-log"
                  className="px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm transition flex items-center gap-2 shadow-2xs hover:border-slate-400"
                >
                  <FileCheck2 className="w-4 h-4 text-slate-500" />
                  <span>Inspect Audit Ledger</span>
                </Link>
              </div>

              {/* Institutional Assurance */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> DORA-Compliant Cleansing
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> In-Text Deduplication
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Cross-University Conflict Filter
                </span>
              </div>
            </motion.div>

            {/* Right Column: Live Forensic Mini-Card (Visualizing the Delta) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                  <span className="font-mono text-xs font-bold text-slate-900 uppercase">Live Audit Stream</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Candidate: {activePreview.name}
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-center p-2.5 bg-white rounded border border-slate-200">
                  <span className="text-slate-500">1. Raw Scopus Volume:</span>
                  <span className="font-bold text-slate-800">{activePreview.totalRawCitations}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-white rounded border border-slate-200">
                  <span className="text-amber-700 flex items-center gap-1">
                    <GitMerge className="w-3.5 h-3.5" /> 2. Preprint & Mentions Collapsed:
                  </span>
                  <span className="font-bold text-amber-700">
                    -{activePreview.totalRawCitations - activePreview.deduplicatedUniqueCitations}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-white rounded border border-slate-200">
                  <span className="text-blue-700 flex items-center gap-1">
                    <FilterX className="w-3.5 h-3.5" /> 3. Internal Lab Citations Filtered:
                  </span>
                  <span className="font-bold text-blue-700">
                    -{activePreview.deduplicatedUniqueCitations - activePreview.trueExternalCitations}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50/70 rounded-lg border border-blue-200">
                  <span className="font-bold text-blue-900">True External Sovereign Impact:</span>
                  <span className="font-bold text-blue-700 text-sm">
                    {activePreview.trueExternalCitations} ({activePreview.integrityScore.toFixed(1)}%)
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-tight">
                *Audited in real-time against PubMed Central XML full-text citation spans and ORCID roster links.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem vs. Solution Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-2xl mb-8">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/50">
            Systemic Diagnosis
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-sans font-bold text-slate-900 tracking-tight">
            Raw Citation Inflation vs. CiteWise True Impact
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Why conventional metrics fail medical promotion committees and how our multi-stage pipeline resolves citation manipulation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem Card */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-red-200 bg-white p-6 shadow-xs relative space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-red-100">
              <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                <ShieldAlert className="w-4 h-4" />
                <span>Conventional Unfiltered Indexing</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-50 text-red-700 font-semibold border border-red-200">
                Flawed Metric
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-sans">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-slate-800">Preprint Duplication:</strong> A preprint on medRxiv and its peer-reviewed paper count as two separate citations.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-slate-800">In-Text Mention Inflation:</strong> A single paper citing a researcher 6 times in different paragraphs inflates text metrics.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-slate-800">Internal Laboratory Rings:</strong> Departmental colleagues cite each other reciprocally to artificially boost h-index scores.
                </span>
              </li>
            </ul>

            <div className="pt-3 border-t border-red-100 text-xs font-mono text-red-700 bg-red-50/60 p-2.5 rounded">
              Result: Up to 55% of reported academic impact in tenure files is intra-departmental or duplicated noise.
            </div>
          </motion.div>

          {/* Solution Card */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-emerald-200 bg-white p-6 shadow-xs relative space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>CiteWise True Impact Engine</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                DORA Audited
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-sans">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-slate-800">Preprint Deduplication:</strong> Identifies matched DOI metadata, preprint identifiers, and collapses identical works into 1 record.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-slate-800">In-Text Normalization:</strong> Collapses multiple occurrences within one manuscript into a single sovereign count.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-slate-800">External Affiliation Isolation:</strong> Strips departmental and same-university citations to surface true global independent peers.
                </span>
              </li>
            </ul>

            <div className="pt-3 border-t border-emerald-100 text-xs font-mono text-emerald-800 bg-emerald-50/60 p-2.5 rounded">
              Result: Objective, audit-ready CiteWise Integrity Score (External Unique / Total Raw × 100).
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Interactive Preview Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-7 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200/50">
                Candidate Assessment Sandbox
              </span>
              <h3 className="mt-1 text-xl font-sans font-bold text-slate-900 tracking-tight">
                Simulate Faculty Evaluation Across Risk Profiles
              </h3>
            </div>

            {/* Quick Filter Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate or dept..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Candidate Selection Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {filteredCandidates.map((c) => {
              const isSelected = c.id === selectedPreviewId;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedPreviewId(c.id)}
                  className={`text-left p-3.5 rounded-lg border transition cursor-pointer press-tactile ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500 shadow-xs'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-slate-900 text-sm">{c.name}</span>
                    {c.riskLevel === 'High Risk' && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                        High Risk
                      </span>
                    )}
                    {c.riskLevel === 'Moderate Risk' && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                        Moderate
                      </span>
                    )}
                    {c.riskLevel === 'High Integrity' && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                        High Integrity
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 truncate">{c.department}</p>
                </button>
              );
            })}
          </div>

          {/* Active Candidate Detailed Snapshot Card */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-5 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-sans font-bold text-slate-900">{activePreview.name}</h4>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
                    ORCID: {activePreview.orcid}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {activePreview.title} • {activePreview.university}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLaunchCandidate(activePreview.id)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer press-tactile transition-colors"
                >
                  <span>Open Full Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/report"
                  onClick={() => setSelectedCandidateId(activePreview.id)}
                  className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs shadow-2xs flex items-center gap-1.5 transition"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>PDF Audit</span>
                </Link>
              </div>
            </div>

            {/* Metrics Comparison Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <span className="text-[10px] font-mono font-semibold uppercase text-slate-500">
                  Raw Declarations
                </span>
                <div className="text-xl font-bold font-sans text-slate-900 mt-1">
                  {activePreview.totalRawCitations}
                </div>
                <span className="text-[10px] text-slate-400">Unfiltered Scopus / Scholar</span>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <span className="text-[10px] font-mono font-semibold uppercase text-slate-500">
                  Deduplicated Unique
                </span>
                <div className="text-xl font-bold font-sans text-slate-700 mt-1">
                  {activePreview.deduplicatedUniqueCitations}
                </div>
                <span className="text-[10px] text-amber-600 font-mono font-medium">
                  -{activePreview.totalRawCitations - activePreview.deduplicatedUniqueCitations} duplicates
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <span className="text-[10px] font-mono font-semibold uppercase text-slate-500">
                  True External Impact
                </span>
                <div className="text-xl font-bold font-sans text-blue-600 mt-1">
                  {activePreview.trueExternalCitations}
                </div>
                <span className="text-[10px] text-blue-600 font-medium">Independent Global Peers</span>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <span className="text-[10px] font-mono font-semibold uppercase text-slate-500">
                  CiteWise Score
                </span>
                <div
                  className={`text-xl font-bold font-sans mt-1 ${
                    activePreview.integrityScore > 75
                      ? 'text-emerald-600'
                      : activePreview.integrityScore > 55
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {activePreview.integrityScore.toFixed(1)}%
                </div>
                <span className="text-[10px] font-mono text-slate-500">{activePreview.riskLevel}</span>
              </div>
            </div>

            {/* AI Committee Briefing Preview */}
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                <strong className="text-slate-800">Committee Assessment: </strong>
                {activePreview.riskSummary}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
