'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCandidate } from '@/lib/candidate-context';
import { CitationRecord, CitationType } from '@/lib/data';
import {
  FileCheck,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ChevronRight,
  FileText,
  Copy,
  Check,
  BookOpen,
  Info
} from 'lucide-react';

export default function AuditLogPage() {
  const { candidate } = useCandidate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | CitationType>('all');
  const [activeEvidenceRecord, setActiveEvidenceRecord] = useState<CitationRecord | null>(
    candidate.citations[0] || null
  );
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

  // Filter citations based on active candidate, search query, and type filter
  const filteredCitations = candidate.citations.filter((record) => {
    const matchesType =
      selectedTypeFilter === 'all' ? true : record.type === selectedTypeFilter;
    const matchesSearch =
      record.citingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.citingAuthors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.citingJournal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleCopyDoi = (doi: string) => {
    navigator.clipboard.writeText(doi);
    setCopiedDoi(doi);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-1">
            <Link href="/dashboard" className="hover:text-slate-900 transition">
              Candidate Dashboard
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Audit Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 tracking-tight">
            Verifiable Citation Audit Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Cryptographic ledger for <strong>{candidate.name}</strong> ({candidate.university})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Ledger Root Hash</span>
            <span className="font-mono text-xs font-semibold text-slate-800">0x7F2A...4B19</span>
          </div>
          <Link
            href="/report"
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-xs flex items-center gap-1.5 press-tactile"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Official PDF</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search citing paper, author, journal, or DOI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-sans"
          />
        </div>

        {/* Filter Badges with Tactile microphysics */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedTypeFilter('all')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer press-tactile ${
              selectedTypeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({candidate.citations.length})
          </button>
          <button
            onClick={() => setSelectedTypeFilter('external')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer flex items-center gap-1 press-tactile ${
              selectedTypeFilter === 'external'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" /> External
          </button>
          <button
            onClick={() => setSelectedTypeFilter('internal')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer flex items-center gap-1 press-tactile ${
              selectedTypeFilter === 'internal'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <AlertTriangle className="w-3 h-3" /> Internal
          </button>
          <button
            onClick={() => setSelectedTypeFilter('duplicate')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer flex items-center gap-1 press-tactile ${
              selectedTypeFilter === 'duplicate'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
            }`}
          >
            <XCircle className="w-3 h-3" /> Duplicate
          </button>
        </div>
      </div>

      {/* Main Table + Side Evidence Drawer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table Column */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono font-semibold text-[10px]">
                <tr>
                  <th className="py-3 px-4">Citing Publication</th>
                  <th className="py-3 px-4">Authors & Affiliation</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4 text-center">In-Text</th>
                  <th className="py-3 px-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredCitations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 font-mono text-xs">
                      No citation records match the search filter.
                    </td>
                  </tr>
                ) : (
                  filteredCitations.map((item) => {
                    const isSelected = activeEvidenceRecord?.id === item.id;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setActiveEvidenceRecord(item)}
                        className={`hover:bg-slate-50/90 cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        {/* Citing Publication */}
                        <td className="py-3 px-4 max-w-xs">
                          <div className="font-semibold text-slate-900 line-clamp-2">
                            {item.citingTitle}
                          </div>
                          <div className="text-slate-500 text-[11px] mt-0.5 font-mono">
                            {item.citingJournal} ({item.citingYear})
                          </div>
                          <div className="font-mono text-[10px] text-blue-600 mt-0.5">
                            DOI: {item.doi}
                          </div>
                        </td>

                        {/* Authors & Affiliation */}
                        <td className="py-3 px-4 max-w-[180px]">
                          <div className="text-slate-800 font-medium truncate">
                            {item.citingAuthors}
                          </div>
                          <div className="text-slate-500 text-[11px] truncate mt-0.5 font-mono">
                            {item.firstAuthorAffiliation}
                          </div>
                        </td>

                        {/* Verification Badges */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          {item.type === 'external' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> External - Verified
                            </span>
                          )}
                          {item.type === 'internal' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              <AlertTriangle className="w-3 h-3 text-amber-600" /> Internal - Same Univ.
                            </span>
                          )}
                          {item.type === 'duplicate' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-50 text-red-800 border border-red-200">
                              <XCircle className="w-3 h-3 text-red-600" /> Duplicate - Collapsed
                            </span>
                          )}
                        </td>

                        {/* In-Text Mention Count */}
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded font-mono font-bold text-[10px] ${
                              item.inTextMentions > 1
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {item.inTextMentions} {item.inTextMentions > 1 ? 'mentions → 1' : 'mention'}
                          </span>
                        </td>

                        {/* Slide out arrow */}
                        <td className="py-3 px-3 text-right">
                          <ChevronRight
                            className={`w-3.5 h-3.5 ml-auto transition-transform ${
                              isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-300'
                            }`}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 font-mono text-[11px]">
            <span>Showing {filteredCitations.length} verified citation links</span>
            <span>PubMed Central XML Cross-Referenced</span>
          </div>
        </div>

        {/* Side Drawer: Evidence Card with Animated Entrance */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
          <AnimatePresence mode="wait">
            {activeEvidenceRecord && (
              <motion.div
                key={activeEvidenceRecord.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4"
              >
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/50">
                      Audit Verification Evidence
                    </span>
                    <h3 className="font-sans font-bold text-slate-900 text-sm mt-1.5 leading-snug">
                      {activeEvidenceRecord.citingTitle}
                    </h3>
                  </div>
                </div>

                {/* Status Classification Banner */}
                <div
                  className={`p-3 rounded-lg border text-xs ${
                    activeEvidenceRecord.type === 'external'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : activeEvidenceRecord.type === 'internal'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                      : 'bg-red-50/70 border-red-200 text-red-950'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 font-mono text-[11px]">
                    {activeEvidenceRecord.type === 'external' && (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>External Sovereign Citation (Verified)</span>
                      </>
                    )}
                    {activeEvidenceRecord.type === 'internal' && (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Institutional Co-Affiliation Conflict Flag</span>
                      </>
                    )}
                    {activeEvidenceRecord.type === 'duplicate' && (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-red-600" />
                        <span>Duplicate Publication Hash Merged</span>
                      </>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed">
                    {activeEvidenceRecord.type === 'external'
                      ? 'Originates from an independent university with no co-author conflict in PubMed.'
                      : activeEvidenceRecord.type === 'internal'
                      ? `Matches candidate institution: "${activeEvidenceRecord.matchedInstitution}". Excluded from True Impact index.`
                      : 'Preprint or duplicate congress proceeding collapsed into sovereign peer-reviewed entry.'}
                  </p>
                </div>

                {/* Metadata details */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Authors:</span>
                    <span className="text-slate-800 font-medium">{activeEvidenceRecord.citingAuthors}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">First Author Affiliation:</span>
                    <span className="text-slate-700">{activeEvidenceRecord.firstAuthorAffiliation}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">DOI:</span>
                      <span className="text-slate-800">{activeEvidenceRecord.doi}</span>
                    </div>
                    <button
                      onClick={() => handleCopyDoi(activeEvidenceRecord.doi)}
                      className="p-1 text-slate-500 hover:text-slate-800 rounded bg-slate-100 cursor-pointer press-tactile"
                      title="Copy DOI"
                    >
                      {copiedDoi === activeEvidenceRecord.doi ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Abstract Snippet */}
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Citing Abstract Excerpt
                  </span>
                  <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600 font-sans leading-relaxed">
                    "{activeEvidenceRecord.abstractSnippet}"
                  </div>
                </div>

                {/* Exact In-Text Citation Snippet */}
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1 flex items-center justify-between">
                    <span>Exact In-Text Citation Snippet</span>
                    <span className="text-blue-600">
                      {activeEvidenceRecord.inTextMentions} mention(s) detected
                    </span>
                  </span>
                  <div className="p-3 bg-amber-50/50 rounded border border-amber-200/70 text-xs text-slate-800 font-mono leading-relaxed">
                    {activeEvidenceRecord.inTextSnippet}
                  </div>
                </div>

                {/* External Link */}
                <a
                  href={`https://doi.org/${activeEvidenceRecord.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1.5 press-tactile"
                >
                  <span>View Full Record on DOI.org</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
