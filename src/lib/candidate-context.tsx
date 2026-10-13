'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CANDIDATES_DATA, CandidateProfile } from './data';

interface CandidateContextType {
  selectedCandidateId: string;
  setSelectedCandidateId: (id: string) => void;
  candidate: CandidateProfile;
  allCandidates: CandidateProfile[];
}

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export function CandidateProvider({ children }: { children: React.ReactNode }) {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('nishit-dixit');

  // Sync to local storage if available
  useEffect(() => {
    const saved = localStorage.getItem('citewise_candidate_id');
    if (saved && CANDIDATES_DATA[saved]) {
      setSelectedCandidateId(saved);
    }
  }, []);

  const handleSelectCandidate = (id: string) => {
    if (CANDIDATES_DATA[id]) {
      setSelectedCandidateId(id);
      localStorage.setItem('citewise_candidate_id', id);
    }
  };

  const candidate = CANDIDATES_DATA[selectedCandidateId] || CANDIDATES_DATA['nishit-dixit'];
  const allCandidates = Object.values(CANDIDATES_DATA);

  return (
    <CandidateContext.Provider
      value={{
        selectedCandidateId,
        setSelectedCandidateId: handleSelectCandidate,
        candidate,
        allCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
}

export function useCandidate() {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidate must be used within a CandidateProvider');
  }
  return context;
}
