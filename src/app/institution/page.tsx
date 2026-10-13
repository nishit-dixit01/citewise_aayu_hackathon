'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCandidate } from '@/lib/candidate-context';
import { UNIVERSITY_LEADERBOARD, DEPARTMENT_HEATMAP } from '@/lib/data';
import {
  Building2,
  Trophy,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Grid3X3,
  Info
} from 'lucide-react';

export default function InstitutionAnalyticsPage() {
  const router = useRouter();
  const { setSelectedCandidateId } = useCandidate();

  const handleSelectFaculty = (id: string) => {
    setSelectedCandidateId(id);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-1">
            <Link href="/" className="hover:text-slate-900 transition">
              Overview
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Institutional Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 tracking-tight">
            Institutional Research Integrity & Faculty Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Department-wide benchmarking, self-citation cluster heatmaps, and true peer impact rankings across medical faculty.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono">
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Audited Cohort</span>
            <span className="font-bold text-slate-800">102 Faculty Members Across 6 Depts</span>
          </div>
        </div>
      </div>

      {/* University Leaderboard Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h2 className="text-base font-sans font-bold text-slate-900">
                Medical Faculty Integrity Leaderboard
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked by True External Peer Impact vs. Raw Declared Citation Volume
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            Formula: Integrity Score = True External / Raw × 100
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono font-semibold text-[10px]">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Faculty Member & Department</th>
                <th className="py-3 px-4 text-right">Raw Citations</th>
                <th className="py-3 px-4 text-right">Deduplicated</th>
                <th className="py-3 px-4 text-right">True External</th>
                <th className="py-3 px-4 text-right">CiteWise Index</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {UNIVERSITY_LEADERBOARD.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/90 transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    #{item.rank}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 text-xs sm:text-sm">{item.name}</div>
                    <div className="text-slate-500 text-[11px]">{item.department}</div>
                    <div className="text-slate-400 text-[10px] font-mono">{item.university}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-500 text-xs">
                    {item.rawCitations.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-700 text-xs">
                    {item.deduplicatedCitations.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-blue-600 text-xs sm:text-sm">
                    {item.trueExternalCitations.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono">
                    <span
                      className={`font-bold text-xs ${
                        item.integrityScore > 70
                          ? 'text-emerald-600'
                          : item.integrityScore > 50
                          ? 'text-amber-600'
                          : 'text-red-600'
                      }`}
                    >
                      {item.integrityScore.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    {item.status === 'High Integrity' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> High Integrity
                      </span>
                    )}
                    {item.status === 'Moderate' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> Moderate
                      </span>
                    )}
                    {item.status === 'Flagged' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-50 text-red-800 border border-red-200">
                        <ShieldAlert className="w-3 h-3 text-red-600" /> Flagged for Audit
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleSelectFaculty(item.id)}
                      className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium text-xs transition cursor-pointer press-tactile"
                    >
                      Audit Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Self-Citation CoI Heatmap Section with subtle card hover physics */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Grid3X3 className="w-4 h-4 text-blue-600" />
              <h2 className="text-base font-sans font-bold text-slate-900">
                Departmental Conflict-of-Interest (CoI) Heatmap
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Visual risk matrix exposing intra-institutional citation clusters, reciprocal laboratory citing, and redundant conference repeats.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-emerald-100 border border-emerald-300"></span> Low Risk
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-amber-100 border border-amber-300"></span> Medium Risk
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-red-100 border border-red-300"></span> High Cluster Risk
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEPARTMENT_HEATMAP.map((dept) => {
            const isHigh = dept.riskTier === 'High';
            const isMedium = dept.riskTier === 'Medium';
            const cardBg = isHigh
              ? 'bg-red-50/30 border-red-200'
              : isMedium
              ? 'bg-amber-50/30 border-amber-200'
              : 'bg-emerald-50/30 border-emerald-200';

            return (
              <motion.div
                key={dept.department}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.16 }}
                className={`p-4 rounded-xl border transition ${cardBg}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-sans font-bold text-slate-900 text-xs sm:text-sm">
                    {dept.department}
                  </h3>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      isHigh
                        ? 'bg-red-100 text-red-800'
                        : isMedium
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {dept.riskTier} Risk
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-600 font-mono text-[11px]">
                    <span>Cohort Size:</span>
                    <span className="font-semibold text-slate-900">{dept.totalFaculty} faculty</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 font-mono text-[11px]">
                    <span>Avg Integrity:</span>
                    <span className="font-bold text-slate-900">{dept.avgIntegrityScore}%</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 font-mono text-[11px]">
                    <span>Self-Citation:</span>
                    <span
                      className={`font-semibold ${
                        isHigh ? 'text-red-700' : isMedium ? 'text-amber-700' : 'text-emerald-700'
                      }`}
                    >
                      {dept.selfCitationRate}%
                    </span>
                  </div>

                  {/* Co-author clustering progress bar */}
                  <div className="pt-2 border-t border-slate-200/60 font-mono">
                    <div className="flex justify-between items-center text-[10px] mb-1">
                      <span className="text-slate-500">Co-Author Cluster:</span>
                      <span className="font-bold text-slate-800">{dept.coAuthorClusteringIndex}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isHigh ? 'bg-red-500' : isMedium ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${dept.coAuthorClusteringIndex}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Committee Note Banner */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
          <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
          <p>
            <strong>Provost Advisory:</strong> High Co-Author Clustering scores (&gt;70) indicate that faculty members in those departments heavily cite colleagues in adjacent laboratory benches, leading to artificially elevated h-index calculations. Promotion dossiers in these departments should mandate CiteWise True External citation metrics before committee votes.
          </p>
        </div>
      </div>
    </div>
  );
}
