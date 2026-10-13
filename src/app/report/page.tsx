'use client';

import React from 'react';
import Link from 'next/link';
import { useCandidate } from '@/lib/candidate-context';
import {
  Printer,
  FileCheck2,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  Award,
  ArrowLeft
} from 'lucide-react';

export default function ReportPage() {
  const { candidate } = useCandidate();

  const handlePrint = () => {
    window.print();
  };

  const [currentDate, setCurrentDate] = React.useState('October 13, 2026');

  React.useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Action Bar (Hidden during Print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Official Academic Promotion Audit Sheet
            </h2>
            <p className="text-xs text-slate-500">
              Formatted for 1-Page Official PDF Output / Promotion Committee Sign-Off
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable 1-Page Document Container */}
      <div className="bg-white border border-slate-300 p-8 sm:p-12 shadow-md rounded-lg text-slate-900 printable-document">
        {/* Official Header */}
        <div className="border-b-2 border-slate-900 pb-5 flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-slate-900 text-white rounded flex items-center justify-center font-serif font-black text-2xl">
              CW
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl text-slate-900 tracking-tight leading-none uppercase">
                Academic Medical Promotion Board
              </h1>
              <p className="text-xs font-sans text-slate-600 mt-1">
                Office of Faculty Affairs & Academic Integrity • Medical Research Evaluation Dossier
              </p>
              <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                Audit Ledger Hash: 0x9D4E...732A • Standard Operating Protocol ICMJE / DORA-2024
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-2.5 py-1 text-[11px] font-mono font-bold bg-slate-100 border border-slate-300 text-slate-800 uppercase rounded">
              CONFIDENTIAL REPORT
            </span>
            <p className="text-[10px] text-slate-500 mt-1">Date: {currentDate}</p>
          </div>
        </div>

        {/* Candidate Identification Section */}
        <div className="my-6 grid grid-cols-2 gap-4 text-xs bg-slate-50/70 p-4 rounded border border-slate-200">
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-semibold block">Candidate Evaluated</span>
            <span className="text-base font-serif font-bold text-slate-900">{candidate.name}</span>
            <p className="text-slate-600 text-xs mt-0.5">{candidate.title}</p>
          </div>
          <div className="space-y-1">
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-semibold">Department: </span>
              <span className="font-semibold text-slate-800">{candidate.department}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-semibold">Institution: </span>
              <span className="text-slate-700">{candidate.university}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-semibold">ORCID ID: </span>
              <span className="font-mono text-blue-700 font-semibold">{candidate.orcid}</span>
            </div>
          </div>
        </div>

        {/* Verification Status Banner */}
        <div
          className={`p-3.5 rounded border my-5 text-xs flex items-center justify-between ${
            candidate.riskLevel === 'High Integrity'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : candidate.riskLevel === 'Moderate Risk'
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-red-50 border-red-300 text-red-950'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {candidate.riskLevel === 'High Integrity' && (
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            )}
            {candidate.riskLevel === 'Moderate Risk' && (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            {candidate.riskLevel === 'High Risk' && (
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <div>
              <span className="font-bold text-xs uppercase tracking-wider block">
                Verification Assessment: {candidate.riskLabel}
              </span>
              <span className="text-[11px] leading-tight opacity-90">
                {candidate.riskSummary}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0 pl-4 border-l border-current/20">
            <span className="text-[10px] uppercase font-semibold block">CiteWise Score</span>
            <span className="text-lg font-serif font-bold">{candidate.integrityScore.toFixed(1)}%</span>
          </div>
        </div>

        {/* Metric Comparison Table */}
        <div className="my-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">
            Table 1: Citation Provenance & Cleansing Audit Metrics
          </h3>
          <table className="w-full text-xs text-left border border-slate-300">
            <thead className="bg-slate-100 text-slate-700 border-b border-slate-300 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-2 border-r border-slate-300">Audit Phase / Metric Category</th>
                <th className="p-2 border-r border-slate-300 text-right">Volume</th>
                <th className="p-2 border-r border-slate-300">Cleansing Rule Applied</th>
                <th className="p-2 text-right">Adjusted Metric</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-2 border-r border-slate-200 font-semibold">1. Declared Raw Citations</td>
                <td className="p-2 border-r border-slate-200 text-right font-serif">{candidate.totalRawCitations}</td>
                <td className="p-2 border-r border-slate-200 text-slate-500">Google Scholar / Scopus API baseline</td>
                <td className="p-2 text-right text-slate-400">N/A</td>
              </tr>
              <tr>
                <td className="p-2 border-r border-slate-200 font-semibold">2. In-Text Mention Normalization</td>
                <td className="p-2 border-r border-slate-200 text-right font-serif text-amber-600">
                  -{candidate.totalRawCitations - candidate.deduplicatedUniqueCitations}
                </td>
                <td className="p-2 border-r border-slate-200 text-slate-500">
                  Multiple paragraph cites within single manuscript collapsed
                </td>
                <td className="p-2 text-right font-semibold">{candidate.deduplicatedUniqueCitations}</td>
              </tr>
              <tr>
                <td className="p-2 border-r border-slate-200 font-semibold">3. Intra-University & Co-Author Exclusion</td>
                <td className="p-2 border-r border-slate-200 text-right font-serif text-amber-600">
                  -{candidate.deduplicatedUniqueCitations - candidate.trueExternalCitations}
                </td>
                <td className="p-2 border-r border-slate-200 text-slate-500">
                  Filtered same-institution & co-author network citations
                </td>
                <td className="p-2 text-right font-semibold font-serif text-blue-700">
                  {candidate.trueExternalCitations}
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold">
                <td className="p-2 border-r border-slate-200">CiteWise Verified Impact Index</td>
                <td className="p-2 border-r border-slate-200 text-right font-serif">
                  {candidate.integrityScore.toFixed(1)}%
                </td>
                <td className="p-2 border-r border-slate-200 text-slate-700">
                  DORA-certified external sovereign citations / total raw
                </td>
                <td className="p-2 text-right font-serif text-slate-900">
                  {candidate.trueExternalCitations} Verified
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Narrative Committee Recommendation */}
        <div className="my-6 p-4 rounded bg-slate-50 border border-slate-200 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Algorithmic Committee Recommendation Finding
          </span>
          <p className="text-slate-800 leading-relaxed font-serif">
            {candidate.committeeRecommendation}
          </p>
        </div>

        {/* Verification Ledger Table Snippet */}
        <div className="my-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">
            Table 2: Sample Verified External Citations (Verified Peer Footprint)
          </h3>
          <div className="border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[9px] border-b border-slate-200">
                <tr>
                  <th className="p-2">Citing Title & Journal</th>
                  <th className="p-2">First Author Affiliation</th>
                  <th className="p-2">Status</th>
                  <th className="p-2 text-right">Impact Factor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidate.citations.slice(0, 3).map((c) => (
                  <tr key={c.id}>
                    <td className="p-2 max-w-xs">
                      <div className="font-semibold text-slate-900 truncate">{c.citingTitle}</div>
                      <div className="text-[10px] text-slate-500">{c.citingJournal}</div>
                    </td>
                    <td className="p-2 text-slate-700 truncate max-w-[180px]">
                      {c.firstAuthorAffiliation}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {c.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-2 text-right font-mono font-semibold text-slate-800">
                      {c.impactFactor > 0 ? c.impactFactor.toFixed(1) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Official Sign-Off Block for Committee Members */}
        <div className="mt-10 pt-6 border-t-2 border-slate-900 grid grid-cols-3 gap-6 text-xs">
          <div>
            <div className="h-10 border-b border-slate-400"></div>
            <span className="block mt-1 font-bold text-slate-800">Dean of Faculty & Medicine</span>
            <span className="text-[10px] text-slate-500 block">Print Name: _____________________</span>
            <span className="text-[10px] text-slate-500 block">Date: __________________________</span>
          </div>

          <div>
            <div className="h-10 border-b border-slate-400"></div>
            <span className="block mt-1 font-bold text-slate-800">Chair, Tenure & Promotion Board</span>
            <span className="text-[10px] text-slate-500 block">Print Name: _____________________</span>
            <span className="text-[10px] text-slate-500 block">Date: __________________________</span>
          </div>

          <div>
            <div className="h-10 border-b border-slate-400"></div>
            <span className="block mt-1 font-bold text-slate-800">Institutional Provost / Oversight</span>
            <span className="text-[10px] text-slate-500 block">Print Name: _____________________</span>
            <span className="text-[10px] text-slate-500 block">Date: __________________________</span>
          </div>
        </div>

        {/* Footer Seal */}
        <div className="mt-8 text-center text-[10px] text-slate-400 font-mono border-t border-slate-200 pt-3">
          This document is generated by CiteWise Medical Intelligence Engine v3.4. Cryptographically authenticated under Institutional License #CW-MED-9214.
        </div>
      </div>
    </div>
  );
}
