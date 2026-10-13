'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCandidate } from '@/lib/candidate-context';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Award,
  BookOpen,
  FileText,
  FileCheck2,
  Building,
  CheckCircle2,
  GitMerge,
  FilterX
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function CandidateDashboardPage() {
  const { candidate } = useCandidate();

  const donutData = [
    { name: 'External Global Peers', value: candidate.breakdown.externalPercent, color: '#2563EB' },
    { name: 'Internal Same-University', value: candidate.breakdown.internalPercent, color: '#F59E0B' },
    { name: 'Co-Author Overlap', value: candidate.breakdown.coAuthorOverlapPercent, color: '#EF4444' },
  ];

  const integrityScoreColor =
    candidate.integrityScore >= 75
      ? 'text-emerald-600'
      : candidate.integrityScore >= 55
      ? 'text-amber-600'
      : 'text-red-600';

  const badgeBg =
    candidate.riskLevel === 'High Integrity'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : candidate.riskLevel === 'Moderate Risk'
      ? 'bg-amber-50 text-amber-800 border-amber-200'
      : 'bg-red-50 text-red-800 border-red-200';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-1">
            <Link href="/" className="hover:text-slate-900 transition">
              Overview
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Evaluation Dossier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 tracking-tight">
            Academic Portfolio & Citation Impact Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/audit-log"
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition shadow-2xs flex items-center gap-1.5 press-tactile"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Audit Ledger</span>
          </Link>
          <Link
            href="/report"
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-xs flex items-center gap-1.5 press-tactile"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Official PDF</span>
          </Link>
        </div>
      </div>

      {/* Candidate Profile Info Card with Framer Motion entry */}
      <motion.div
        key={candidate.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs"
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-900 text-white font-mono font-bold text-xl flex items-center justify-center shrink-0 shadow-xs border border-slate-800">
              {candidate.name.replace('Dr. ', '').split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-sans font-bold text-slate-900">{candidate.name}</h2>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${badgeBg}`}>
                  {candidate.riskLevel === 'High Risk' && <ShieldAlert className="w-3 h-3" />}
                  {candidate.riskLevel === 'Moderate Risk' && <AlertTriangle className="w-3 h-3" />}
                  {candidate.riskLevel === 'High Integrity' && <ShieldCheck className="w-3 h-3" />}
                  {candidate.riskLabel}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1">{candidate.title}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2 font-mono">
                <span className="flex items-center gap-1">
                  <Building className="w-3 h-3 text-slate-400" />
                  {candidate.department}
                </span>
                <span>•</span>
                <span>{candidate.university}</span>
                <span>•</span>
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  ORCID: {candidate.orcid}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-3 max-w-4xl leading-relaxed font-sans">
                {candidate.bio}
              </p>
            </div>
          </div>

          {/* H-Index Comparison Box */}
          <div className="lg:w-60 bg-slate-50 border border-slate-200 rounded-lg p-3.5 shrink-0 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                Index Recalibration
              </span>
              <span className="text-[10px] font-mono text-slate-400">DORA Standard</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center my-2">
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-[9px] text-slate-400 uppercase font-mono font-semibold block">Declared h</span>
                <span className="text-lg font-bold font-sans text-slate-500">{candidate.hIndexRaw}</span>
              </div>
              <div className="bg-white p-2 rounded border border-blue-200 shadow-2xs">
                <span className="text-[9px] text-blue-600 uppercase font-mono font-semibold block">CiteWise True h</span>
                <span className="text-lg font-bold font-sans text-blue-600">{candidate.hIndexAdjusted}</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight text-center">
              Stripped 100% intra-lab clustering and redundant repeats.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Top KPI Summary Cards with Staggered Visual Feel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Raw Citations */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Total Raw Volume</span>
            <BookOpen className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-sans font-bold text-slate-900 tracking-tight">
            {candidate.totalRawCitations.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Unfiltered citations aggregated from Scopus & Google Scholar.
          </p>
        </motion.div>

        {/* Card 2: Deduplicated Unique Citations */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Deduplicated Unique</span>
            <GitMerge className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-sans font-bold text-slate-800 tracking-tight">
            {candidate.deduplicatedUniqueCitations.toLocaleString()}
          </div>
          <p className="text-[11px] text-amber-700 mt-2 font-medium font-mono">
            Collapsed {candidate.breakdown.duplicateCount} duplicate mentions.
          </p>
        </motion.div>

        {/* Card 3: True External Citations */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">True External Impact</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-sans font-bold text-blue-600 tracking-tight">
            {candidate.trueExternalCitations.toLocaleString()}
          </div>
          <p className="text-[11px] text-blue-700 mt-2 font-medium">
            Excluding internal university & co-author network citations.
          </p>
        </motion.div>

        {/* Card 4: CiteWise Integrity Score */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">CiteWise Integrity</span>
            <ShieldCheck className={`w-4 h-4 ${candidate.integrityScore >= 70 ? 'text-emerald-500' : 'text-amber-500'}`} />
          </div>
          <div className={`text-3xl font-sans font-bold tracking-tight ${integrityScoreColor}`}>
            {candidate.integrityScore.toFixed(1)}%
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            (External Unique / Total Raw) × 100
          </p>
        </motion.div>
      </div>

      {/* Analytics Grid: Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-sans font-bold text-slate-900 tracking-tight">
                Year-over-Year Citation Trajectory
              </h3>
              <p className="text-xs text-slate-500">
                Raw declared metrics vs. verified CiteWise True External Impact (2021–2025)
              </p>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
              Audited Trajectory
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={candidate.yearlyStats}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '11px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '12px', fontSize: '11px' }}
                  iconType="circle"
                />
                <Bar
                  dataKey="rawCitations"
                  name="Raw Declared Citations"
                  fill="#94A3B8"
                  radius={[3, 3, 0, 0]}
                  barSize={16}
                />
                <Bar
                  dataKey="deduplicatedCitations"
                  name="Deduplicated Unique"
                  fill="#F59E0B"
                  radius={[3, 3, 0, 0]}
                  barSize={16}
                />
                <Bar
                  dataKey="trueExternalImpact"
                  name="True External Impact"
                  fill="#2563EB"
                  radius={[3, 3, 0, 0]}
                  barSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center font-mono text-[11px]">
            <span>External verification delta: -{candidate.totalRawCitations - candidate.trueExternalCitations} citations</span>
            <span className="font-semibold text-slate-700">Audit Status: Validated</span>
          </div>
        </div>

        {/* Donut Chart: Provenance Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-sans font-bold text-slate-900 tracking-tight">
              Citation Provenance Breakdown
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Categorization by author network & university affiliation
            </p>
          </div>

          <div className="h-52 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={76}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => `${value}%`}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-sans font-bold text-slate-900">
                {candidate.breakdown.externalPercent.toFixed(0)}%
              </span>
              <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">External</span>
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-3 border-t border-slate-100 text-xs font-mono">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="text-slate-700">External Global Peers</span>
              </div>
              <span className="font-bold text-slate-900">{candidate.breakdown.externalPercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="text-slate-700">Internal Same-University</span>
              </div>
              <span className="font-bold text-slate-900">{candidate.breakdown.internalPercent}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-slate-700">Direct Co-Author Overlap</span>
              </div>
              <span className="font-bold text-slate-900">{candidate.breakdown.coAuthorOverlapPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Executive Summary Brief Card */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-7 shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400">
                Algorithmic Promotion Finding
              </span>
              <h3 className="text-base font-sans font-bold text-white">
                Academic Evaluation Committee Recommendation
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            ICMJE & COPE Standardized
          </span>
        </div>

        <div className="mt-4 space-y-4">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {candidate.committeeRecommendation}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
            <div className="bg-slate-850 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 block mb-0.5 text-[10px] uppercase font-mono">Deduplication Result</span>
              <span className="text-slate-200 font-semibold font-mono text-[11px]">
                {candidate.breakdown.duplicateCount} records merged via DOI hash
              </span>
            </div>
            <div className="bg-slate-850 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 block mb-0.5 text-[10px] uppercase font-mono">Affiliation Conflict</span>
              <span className="text-slate-200 font-semibold font-mono text-[11px]">
                {candidate.breakdown.internalPercent}% intra-institutional
              </span>
            </div>
            <div className="bg-slate-850 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400 block mb-0.5 text-[10px] uppercase font-mono">Committee Verdict</span>
              <span
                className={`font-semibold font-mono text-[11px] ${
                  candidate.riskLevel === 'High Risk'
                    ? 'text-red-400'
                    : candidate.riskLevel === 'Moderate Risk'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {candidate.riskLevel === 'High Risk'
                  ? 'Provost Review Mandated'
                  : candidate.riskLevel === 'Moderate Risk'
                  ? 'Standard Approval with Note'
                  : 'Fast-Track Promotion Endorsed'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
