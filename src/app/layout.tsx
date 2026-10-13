import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import { CandidateProvider } from '@/lib/candidate-context';
import { Navigation } from '@/components/navigation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'CiteWise: Medical Citation & Research Impact Intelligence',
  description:
    'Institutional research integrity platform: Deduplicating citations, collapsing in-text repetition, filtering internal university conflicts, and generating verifiable promotion audit reports.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
        <CandidateProvider>
          <Navigation />
          <main className="flex-1 pb-16">{children}</main>
          <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="font-serif text-slate-700">
                <strong>CiteWise Medical</strong> — Academic Promotion & Research Integrity Audit System
              </p>
              <p className="text-slate-600 font-mono text-[11px]">
                Compliant with ICMJE, DORA Declaration & Committee on Publication Ethics (COPE) Guidelines
              </p>
            </div>
          </footer>
        </CandidateProvider>
      </body>
    </html>
  );
}
