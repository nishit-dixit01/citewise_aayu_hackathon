export type CitationType = 'external' | 'internal' | 'duplicate';

export interface CitationRecord {
  id: string;
  citingTitle: string;
  citingJournal: string;
  citingYear: number;
  doi: string;
  citingAuthors: string;
  firstAuthorAffiliation: string;
  matchedInstitution: string;
  type: CitationType;
  inTextMentions: number; // e.g. 3 mentions collapsed into 1 count
  abstractSnippet: string;
  inTextSnippet: string;
  coAuthorOverlap: boolean;
  impactFactor: number;
}

export interface CandidateYearlyStat {
  year: number;
  rawCitations: number;
  deduplicatedCitations: number;
  trueExternalImpact: number;
}

export interface CandidateBreakdown {
  externalPercent: number;
  internalPercent: number;
  coAuthorOverlapPercent: number;
  duplicateCount: number;
}

export interface CandidateProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  university: string;
  orcid: string;
  bio: string;
  avatarUrl?: string;
  hIndexRaw: number;
  hIndexAdjusted: number;
  totalRawCitations: number;
  deduplicatedUniqueCitations: number;
  trueExternalCitations: number;
  integrityScore: number; // (External Unique / Total Raw * 100)
  riskLevel: 'High Risk' | 'Moderate Risk' | 'High Integrity';
  riskLabel: string;
  riskSummary: string;
  committeeRecommendation: string;
  citations: CitationRecord[];
  yearlyStats: CandidateYearlyStat[];
  breakdown: CandidateBreakdown;
}

export interface FacultyLeaderboardItem {
  id: string;
  name: string;
  department: string;
  university: string;
  rawCitations: number;
  deduplicatedCitations: number;
  trueExternalCitations: number;
  integrityScore: number;
  rank: number;
  status: 'High Integrity' | 'Moderate' | 'Flagged';
}

export interface DepartmentMatrixItem {
  department: string;
  totalFaculty: number;
  avgIntegrityScore: number;
  selfCitationRate: number; // %
  duplicateRate: number; // %
  coAuthorClusteringIndex: number; // 0-100 scale
  riskTier: 'Low' | 'Medium' | 'High';
}

export const CANDIDATES_DATA: Record<string, CandidateProfile> = {
  'nishit-dixit': {
    id: 'nishit-dixit',
    name: 'Dr. Nishit Dixit',
    title: 'Associate Professor of Cardiovascular Bioengineering',
    department: 'Cardiology & Regenerative Medicine',
    university: 'Apex Institute of Medical Sciences (AIMS)',
    orcid: '0000-0002-8491-923X',
    bio: 'Specialist in artificial coronary scaffolds, tissue perfusion hemodynamics, and targeted nanoparticle drug-eluting stents. Evaluated for Tenure & Full Professorship.',
    hIndexRaw: 38,
    hIndexAdjusted: 22,
    totalRawCitations: 742,
    deduplicatedUniqueCitations: 512,
    trueExternalCitations: 338,
    integrityScore: 45.5, // 338 / 742 * 100
    riskLevel: 'High Risk',
    riskLabel: 'High Self-Citation & Institutional Clustering Risk',
    riskSummary: 'Significant inflation identified: 230 duplicate in-text citations collapsed and 174 intra-departmental co-author citations isolated. True global peer reach is 45.5% of declared raw metrics.',
    committeeRecommendation: 'CONDITIONAL HOLD / DETAILED PROVOST REVIEW: Raw metrics exhibit heavy dependence on intra-institutional laboratory citations and redundant in-text cite rings. True external peer verification indicates solid foundational research (338 external verified citations across Lancet Digital Health & JACC), but promotion packet should rely solely on the CiteWise Adjusted Index (45.5%).',
    yearlyStats: [
      { year: 2021, rawCitations: 85, deduplicatedCitations: 62, trueExternalImpact: 41 },
      { year: 2022, rawCitations: 140, deduplicatedCitations: 98, trueExternalImpact: 64 },
      { year: 2023, rawCitations: 215, deduplicatedCitations: 151, trueExternalImpact: 98 },
      { year: 2024, rawCitations: 295, deduplicatedCitations: 201, trueExternalImpact: 135 },
      { year: 2025, rawCitations: 7, deduplicatedCitations: 5, trueExternalImpact: 3 },
    ],
    breakdown: {
      externalPercent: 45.5,
      internalPercent: 23.5,
      coAuthorOverlapPercent: 31.0,
      duplicateCount: 230,
    },
    citations: [
      {
        id: 'c-101',
        citingTitle: 'Microfluidic Characterization of Bioresorbable Stent Degradation Kinetics',
        citingJournal: 'Apex Journal of Biomedical Engineering, Vol. 14(2)',
        citingYear: 2024,
        doi: '10.1016/j.ajbme.2024.03.011',
        citingAuthors: 'R. K. Meena, S. P. Gupta, N. Dixit (Co-Author)',
        firstAuthorAffiliation: 'Apex Institute of Medical Sciences (AIMS)',
        matchedInstitution: 'Apex Institute of Medical Sciences (AIMS)',
        type: 'internal',
        inTextMentions: 5,
        abstractSnippet: 'Investigation of polyurethane polymer matrices undergoing catalytic dissolution in synthetic plasma. The protocol adapts previous baseline scaffolds demonstrated in Dixit et al. (2021) within our departmental lab.',
        inTextSnippet: '...following the synthetic cross-linking methodology previously established in our lab by Dixit and colleagues [12, 14, 18], we observed identical mechanical resilience...',
        coAuthorOverlap: true,
        impactFactor: 2.4,
      },
      {
        id: 'c-102',
        citingTitle: 'Clinical Validation of Nanoparticle Perfusion Profiling in Post-Ischemic Myocardium',
        citingJournal: 'The Lancet Digital Health, 6(8):e582-e593',
        citingYear: 2024,
        doi: '10.1016/S2589-7500(24)00112-9',
        citingAuthors: 'E. Vance, A. Tanaka, H. Chen, C. Moreau',
        firstAuthorAffiliation: 'Harvard Medical School & Brigham and Women\'s Hospital, Boston, USA',
        matchedInstitution: 'Harvard Medical School',
        type: 'external',
        inTextMentions: 1,
        abstractSnippet: 'Deep learning-guided hemodynamic perfusion tracking enables high-precision infarction border zone assessment. Validated against the gold-standard endothelial markers from Dixit et al.',
        inTextSnippet: '...We utilized the baseline tissue perfusion benchmarks established by Dixit et al. (2022) to normalize laser Doppler signals across multicentric cardiac cohorts...',
        coAuthorOverlap: false,
        impactFactor: 36.6,
      },
      {
        id: 'c-103',
        citingTitle: 'Clinical Validation of Nanoparticle Perfusion Profiling in Post-Ischemic Myocardium (Preprint Archive Mirror)',
        citingJournal: 'medRxiv Preprint Archive System',
        citingYear: 2024,
        doi: '10.1101/2024.01.12.24301142',
        citingAuthors: 'E. Vance, A. Tanaka, H. Chen, C. Moreau',
        firstAuthorAffiliation: 'Harvard Medical School, Boston, USA',
        matchedInstitution: 'Harvard Medical School',
        type: 'duplicate',
        inTextMentions: 4,
        abstractSnippet: 'Duplicate record ingested from preliminary preprint repository before journal acceptance in Lancet Digital Health.',
        inTextSnippet: '...Preprint deposition duplicate matching verified published manuscript DOI 10.1016/S2589-7500(24)00112-9...',
        coAuthorOverlap: false,
        impactFactor: 0.0,
      },
      {
        id: 'c-104',
        citingTitle: 'Endovascular Flow Dynamics in Left Ventricular Outflow Obstruction Models',
        citingJournal: 'Journal of the American College of Cardiology (JACC), 83(12)',
        citingYear: 2023,
        doi: '10.1016/j.jacc.2023.09.821',
        citingAuthors: 'K. S. Lindqvist, J. Bauer, M. T. Rossi',
        firstAuthorAffiliation: 'Karolinska Institutet, Stockholm, Sweden',
        matchedInstitution: 'Karolinska Institutet',
        type: 'external',
        inTextMentions: 2,
        abstractSnippet: 'Computational fluid dynamic benchmarking of pulsed shear rates across stenotic aortic valves. Incorporates elastomeric parameters from Dixit et al. 2021.',
        inTextSnippet: '...Elastomeric shear thresholds were calibrated according to coronary vascular models from Dixit et al. [34], ensuring physiological wall stress fidelity...',
        coAuthorOverlap: false,
        impactFactor: 24.0,
      },
      {
        id: 'c-105',
        citingTitle: 'Novel Stent Coatings with Localized Heparin Release: A Pilot Animal Trial',
        citingJournal: 'Journal of Interventional Therapeutics & Cardiology, 19(1)',
        citingYear: 2023,
        doi: '10.1053/j.jitc.2023.04.019',
        citingAuthors: 'P. Verma, S. Roy, N. Dixit (Co-Author)',
        firstAuthorAffiliation: 'Apex Institute of Medical Sciences (AIMS)',
        matchedInstitution: 'Apex Institute of Medical Sciences (AIMS)',
        type: 'internal',
        inTextMentions: 6,
        abstractSnippet: 'Porcine animal model trial examining intimal hyperplasia suppression via timed nanoparticle elution. Multiple citations to internal lab milestones.',
        inTextSnippet: '...As reported extensively in Dixit et al. (2020), Dixit and Roy (2021), and Dixit et al. (2022b), the release kinetic profiles follow Fickian diffusion...',
        coAuthorOverlap: true,
        impactFactor: 3.1,
      },
      {
        id: 'c-106',
        citingTitle: 'European Consensus on Bioengineered Vascular Grafts in Peripheral Artery Disease',
        citingJournal: 'European Heart Journal, 44(30):2890-2905',
        citingYear: 2023,
        doi: '10.1093/eurheartj/ehad410',
        citingAuthors: 'G. De Luca, F. Bovenzi, A. S. Kastrati et al.',
        firstAuthorAffiliation: 'Charité – Universitätsmedizin Berlin, Germany',
        matchedInstitution: 'Charité Universitätsmedizin Berlin',
        type: 'external',
        inTextMentions: 1,
        abstractSnippet: 'International multicenter consensus statement on bioresorbable graft material testing protocols and hemocompatibility testing.',
        inTextSnippet: '...Standardized tensile durability testing should comply with multi-phase bioreactor protocols validated by Dixit et al. [88]...',
        coAuthorOverlap: false,
        impactFactor: 39.3,
      },
      {
        id: 'c-107',
        citingTitle: 'Advancements in Coronary Biomechanics and In-Silico Testing Protocols',
        citingJournal: 'Apex Cardiology Review, Vol. 8',
        citingYear: 2022,
        doi: '10.1177/175394472210892',
        citingAuthors: 'M. Saxena, V. K. Tandon, A. Rastogi',
        firstAuthorAffiliation: 'Apex Institute of Medical Sciences (AIMS)',
        matchedInstitution: 'Apex Institute of Medical Sciences (AIMS)',
        type: 'internal',
        inTextMentions: 3,
        abstractSnippet: 'Review of regional cardiovascular biomechanics research published from Apex Institute laboratories between 2018 and 2022.',
        inTextSnippet: '...Dixit and the Bioengineering team at AIMS pioneered the dual-lumen testing apparatus now adopted across the hospital...',
        coAuthorOverlap: true,
        impactFactor: 1.8,
      },
      {
        id: 'c-108',
        citingTitle: 'Advancements in Coronary Biomechanics and In-Silico Testing (Conference Abstract Duplicate)',
        citingJournal: 'National Cardiac Society Conference Proceedings 2022',
        citingYear: 2022,
        doi: '10.1177/175394472210892-CONF',
        citingAuthors: 'M. Saxena, V. K. Tandon, A. Rastogi',
        firstAuthorAffiliation: 'Apex Institute of Medical Sciences (AIMS)',
        matchedInstitution: 'Apex Institute of Medical Sciences (AIMS)',
        type: 'duplicate',
        inTextMentions: 3,
        abstractSnippet: 'Conference abstract duplicate text corresponding directly to the full review paper published in Apex Cardiology Review.',
        inTextSnippet: '...Identical citation payload collapsed under CiteWise Rule 3: duplicate meeting proceedings...',
        coAuthorOverlap: true,
        impactFactor: 0.0,
      }
    ]
  },

  'drishti-jhajharia': {
    id: 'drishti-jhajharia',
    name: 'Dr. Drishti Jhajharia',
    title: 'Professor & Chair of Neuro-Oncology & Epigenomics',
    department: 'Neurology & Molecular Therapeutics',
    university: 'Stanford School of Medicine',
    orcid: '0000-0001-9043-4129',
    bio: 'Pioneered single-cell chromatin profiling in recurrent glioblastoma multiforme. Principal Investigator for the Global Brain Tumor Consortium.',
    hIndexRaw: 54,
    hIndexAdjusted: 50,
    totalRawCitations: 1420,
    deduplicatedUniqueCitations: 1310,
    trueExternalCitations: 1215,
    integrityScore: 85.6, // 1215 / 1420 * 100
    riskLevel: 'High Integrity',
    riskLabel: 'Exemplary Global Impact & Clean External Citation Footprint',
    riskSummary: 'Minimal self-citation or lab clustering. 85.6% of citations originate from independent external medical faculties globally (Oxford, Johns Hopkins, Karolinska, UCSF).',
    committeeRecommendation: 'UNANIMOUS FAST-TRACK APPROVAL: Stellar global recognition profile. The candidate’s citations are distributed evenly across peer-reviewed international flagship journals with near-zero artificial citation padding. High-confidence tenure endorsement.',
    yearlyStats: [
      { year: 2021, rawCitations: 180, deduplicatedCitations: 172, trueExternalImpact: 160 },
      { year: 2022, rawCitations: 290, deduplicatedCitations: 275, trueExternalImpact: 255 },
      { year: 2023, rawCitations: 420, deduplicatedCitations: 395, trueExternalImpact: 370 },
      { year: 2024, rawCitations: 510, deduplicatedCitations: 450, trueExternalImpact: 415 },
      { year: 2025, rawCitations: 20, deduplicatedCitations: 18, trueExternalImpact: 15 },
    ],
    breakdown: {
      externalPercent: 85.6,
      internalPercent: 7.4,
      coAuthorOverlapPercent: 7.0,
      duplicateCount: 110,
    },
    citations: [
      {
        id: 'c-201',
        citingTitle: 'Single-Cell Epigenetic Reprogramming Drives Temozolomide Resistance in Glioblastoma',
        citingJournal: 'Nature Medicine, 30(4):1042-1055',
        citingYear: 2024,
        doi: '10.1038/s41591-024-02845-x',
        citingAuthors: 'S. Al-Mansoor, K. K. Wong, J. R. Platten et al.',
        firstAuthorAffiliation: 'University of Oxford, Department of Oncology, UK',
        matchedInstitution: 'University of Oxford',
        type: 'external',
        inTextMentions: 1,
        abstractSnippet: 'Analysis of 120,000 glioma nuclei reveals subclonal chromatin remodeling during alkylating chemotherapy. Methodology incorporates Jhajharia et al. (2022) ATAC-seq filtering.',
        inTextSnippet: '...Following chromatin peak isolation as formulated by Jhajharia et al. (2022), we identified 4,110 promoter accessible sites in therapy-resistant clones...',
        coAuthorOverlap: false,
        impactFactor: 82.9,
      },
      {
        id: 'c-202',
        citingTitle: 'Spatial Transcriptomics Mapping of Diffuse Midline Glioma Microenvironments',
        citingJournal: 'Cell, 187(6):1412-1428',
        citingYear: 2024,
        doi: '10.1016/j.cell.2024.02.019',
        citingAuthors: 'M. W. Takahashi, E. Stern, L. V. Glimcher',
        firstAuthorAffiliation: 'Dana-Farber Cancer Institute, Harvard Medical School, Boston',
        matchedInstitution: 'Harvard Medical School',
        type: 'external',
        inTextMentions: 2,
        abstractSnippet: 'High-plex RNA imaging reveals immunosuppressive myeloid niche dynamics in pediatric high-grade gliomas. Directly builds upon Jhajharia’s microglial receptor discovery.',
        inTextSnippet: '...Consistent with the spatial immunophenotyping by Jhajharia and colleagues [4], the perivascular glioma niche displayed elevated TGF-beta signaling...',
        coAuthorOverlap: false,
        impactFactor: 64.5,
      },
      {
        id: 'c-203',
        citingTitle: 'Targeted Degradation of Oncogenic Histone H3K27M Mutants in Pediatric Glioma',
        citingJournal: 'Cancer Discovery, 14(2):298-314',
        citingYear: 2024,
        doi: '10.1158/2159-8290.CD-23-0941',
        citingAuthors: 'H. J. Zimmermann, D. C. Monje, P. W. Biegel',
        firstAuthorAffiliation: 'Johns Hopkins School of Medicine, Baltimore, USA',
        matchedInstitution: 'Johns Hopkins University',
        type: 'external',
        inTextMentions: 1,
        abstractSnippet: 'Development of small-molecule PROTAC degraders targeting mutant histone complexes. Benchmark assays based on Jhajharia lab single-cell viability indices.',
        inTextSnippet: '...We utilized the baseline single-cell pharmacodynamic model designed by Jhajharia et al. (2021) to confirm degradation kinetics within 4 hours...',
        coAuthorOverlap: false,
        impactFactor: 28.2,
      },
      {
        id: 'c-204',
        citingTitle: 'Clinical Protocol for Neoadjuvant Immunotherapy in Recurrent High-Grade Astrocytoma',
        citingJournal: 'Journal of Clinical Oncology (JCO), 42(15)',
        citingYear: 2023,
        doi: '10.1200/JCO.2023.41.15_suppl.2001',
        citingAuthors: 'B. T. Cloughesy, T. F. Cloughesy, D. A. Reardon',
        firstAuthorAffiliation: 'University of California, Los Angeles (UCLA) Health',
        matchedInstitution: 'UCLA Health',
        type: 'external',
        inTextMentions: 1,
        abstractSnippet: 'Phase II trial assessing PD-1 blockade timing relative to surgical resection. Cites Jhajharia tumor mutation burden correlates.',
        inTextSnippet: '...The immunological biomarker cutoff was established adhering to the glioblastoma prognostic scores defined by Jhajharia et al. [19]...',
        coAuthorOverlap: false,
        impactFactor: 45.3,
      },
      {
        id: 'c-205',
        citingTitle: 'Institutional Experience with Single-Cell Sequencing in Stanford Glioblastoma Biobank',
        citingJournal: 'Stanford Medical Biorepository Reports, 9(1)',
        citingYear: 2023,
        doi: '10.1101/smbr.2023.011',
        citingAuthors: 'D. Jhajharia, T. L. Chang, R. Scott',
        firstAuthorAffiliation: 'Stanford School of Medicine, Stanford, USA',
        matchedInstitution: 'Stanford School of Medicine',
        type: 'internal',
        inTextMentions: 2,
        abstractSnippet: 'Operational review of neuro-oncology tissue banking protocols within Stanford Medicine over five fiscal quarters.',
        inTextSnippet: '...Tissue preservation workflows adhere to standard operating procedure #14 as detailed in Jhajharia et al. (2020)...',
        coAuthorOverlap: true,
        impactFactor: 1.5,
      }
    ]
  },

  'mayank-sharma': {
    id: 'mayank-sharma',
    name: 'Dr. Mayank Sharma',
    title: 'Associate Professor of Pulmonary Medicine & Critical Care',
    department: 'Pulmonology, Allergy & Critical Care',
    university: 'King George\'s Medical University (KGMU)',
    orcid: '0000-0003-1284-5502',
    bio: 'Investigator in post-viral acute lung injury, ARDS mechanical ventilation strategies, and bedside ultrasound lung aeration scores. Applying for Full Tenure.',
    hIndexRaw: 41,
    hIndexAdjusted: 33,
    totalRawCitations: 960,
    deduplicatedUniqueCitations: 820,
    trueExternalCitations: 660,
    integrityScore: 68.75, // 660 / 960 * 100
    riskLevel: 'Moderate Risk',
    riskLabel: 'Moderate Institutional Reliance / Healthy External Dispersion',
    riskSummary: 'Healthy external publication citations (68.8%) alongside moderate regional collaborative citing from university affiliated hospitals and regional state consortia.',
    committeeRecommendation: 'STANDARD APPROVAL WITH BENCHMARK NOTE: Scholarly profile demonstrates sound independent peer influence. 68.8% external validation with balanced international co-citations (Toronto, Imperial College, CMC Vellore). Recommend approval with advisory on consolidating international multi-center trials.',
    yearlyStats: [
      { year: 2021, rawCitations: 110, deduplicatedCitations: 95, trueExternalImpact: 80 },
      { year: 2022, rawCitations: 220, deduplicatedCitations: 190, trueExternalImpact: 155 },
      { year: 2023, rawCitations: 310, deduplicatedCitations: 265, trueExternalImpact: 215 },
      { year: 2024, rawCitations: 305, deduplicatedCitations: 255, trueExternalImpact: 200 },
      { year: 2025, rawCitations: 15, deduplicatedCitations: 15, trueExternalImpact: 10 },
    ],
    breakdown: {
      externalPercent: 68.75,
      internalPercent: 16.25,
      coAuthorOverlapPercent: 15.0,
      duplicateCount: 140,
    },
    citations: [
      {
        id: 'c-301',
        citingTitle: 'Prone Positioning in Non-Intubated COVID-19 Acute Hypoxemic Respiratory Failure',
        citingJournal: 'The New England Journal of Medicine (NEJM), 389(12):1102-1114',
        citingYear: 2024,
        doi: '10.1056/NEJMoa2309811',
        citingAuthors: 'G. H. Ferguson, L. Brochard, M. Ranieri et al.',
        firstAuthorAffiliation: 'University of Toronto & St. Michael\'s Hospital, Canada',
        matchedInstitution: 'University of Toronto',
        type: 'external',
        inTextMentions: 1,
        abstractSnippet: 'Multicenter randomized trial on awake prone positioning protocols. Utilizes baseline oxygenation metrics established by Sharma et al. (2021).',
        inTextSnippet: '...The titration algorithm for continuous positive airway pressure followed the physiologic parameters demonstrated by Sharma et al. [11]...',
        coAuthorOverlap: false,
        impactFactor: 158.5,
      },
      {
        id: 'c-302',
        citingTitle: 'Predictive Validity of Lung Ultrasound Score in Acute Respiratory Distress Syndrome',
        citingJournal: 'American Journal of Respiratory and Critical Care Medicine (AJRCCM), 209(8)',
        citingYear: 2024,
        doi: '10.1164/rccm.202308-1422OC',
        citingAuthors: 'D. Chiumello, F. Mojoli, A. Pesenti',
        firstAuthorAffiliation: 'University of Milan & San Paolo Hospital, Milan, Italy',
        matchedInstitution: 'University of Milan',
        type: 'external',
        inTextMentions: 2,
        abstractSnippet: 'Prospective multicentric study comparing 12-zone ultrasound aeration scoring against quantitative chest CT. Directly validates the Sharma LUS index.',
        inTextSnippet: '...Inter-observer agreement for B-line coalescence (kappa = 0.88) matched the reproducibility indices reported by Sharma and colleagues [22]...',
        coAuthorOverlap: false,
        impactFactor: 24.7,
      },
      {
        id: 'c-303',
        citingTitle: 'Management of Severe Tropical Viral Pneumonias in Northern Indian Intensive Care Units',
        citingJournal: 'KGMU Journal of Clinical Medicine, 32(3)',
        citingYear: 2023,
        doi: '10.4103/kgmu.jcm_2023_89',
        citingAuthors: 'S. K. Tripathi, M. Sharma (Co-Author), R. P. Singh',
        firstAuthorAffiliation: 'King George\'s Medical University (KGMU), Lucknow',
        matchedInstitution: 'King George\'s Medical University (KGMU)',
        type: 'internal',
        inTextMentions: 4,
        abstractSnippet: 'Retrospective observational cohort across 450 ICU admissions reviewing antimicrobial de-escalation and high-flow nasal cannula failure.',
        inTextSnippet: '...We followed the triage escalation criteria developed in our pulmonary critical care unit by Sharma et al. (2020, 2021)...',
        coAuthorOverlap: true,
        impactFactor: 1.2,
      },
      {
        id: 'c-304',
        citingTitle: 'Biomarkers of Alveolar-Capillary Membrane Damage in Sepsis-Induced ARDS',
        citingJournal: 'Thorax, 78(11):1089-1098',
        citingYear: 2023,
        doi: '10.1136/thorax-2023-220194',
        citingAuthors: 'A. S. Felix, P. J. Calfee, M. A. Matthay',
        firstAuthorAffiliation: 'Imperial College London, National Heart & Lung Institute, UK',
        matchedInstitution: 'Imperial College London',
        type: 'external',
        inTextMentions: 1,
        abstractSnippet: 'Serum sRAGE and angiopoietin-2 measurement in 800 ventilated patients. Builds on baseline biomarkers tested by Sharma et al.',
        inTextSnippet: '...Plasma sRAGE levels were determined according to ELISA sandwich calibrations validated by Sharma et al. [38]...',
        coAuthorOverlap: false,
        impactFactor: 10.8,
      },
      {
        id: 'c-305',
        citingTitle: 'Biomarkers of Alveolar-Capillary Membrane Damage (European Respiratory Society Abstract)',
        citingJournal: 'European Respiratory Journal Conference Series 2023',
        citingYear: 2023,
        doi: '10.1136/thorax-2023-220194-ERS',
        citingAuthors: 'A. S. Felix, P. J. Calfee, M. A. Matthay',
        firstAuthorAffiliation: 'Imperial College London, UK',
        matchedInstitution: 'Imperial College London',
        type: 'duplicate',
        inTextMentions: 1,
        abstractSnippet: 'Duplicated citation entry corresponding to the early conference congress proceedings ahead of Thorax journal final release.',
        inTextSnippet: '...CiteWise automated duplicate filter detected identical title and author cluster...',
        coAuthorOverlap: false,
        impactFactor: 0.0,
      }
    ]
  }
};

export const UNIVERSITY_LEADERBOARD: FacultyLeaderboardItem[] = [
  {
    id: 'drishti-jhajharia',
    name: 'Dr. Drishti Jhajharia',
    department: 'Neurology & Molecular Therapeutics',
    university: 'Stanford School of Medicine',
    rawCitations: 1420,
    deduplicatedCitations: 1310,
    trueExternalCitations: 1215,
    integrityScore: 85.6,
    rank: 1,
    status: 'High Integrity'
  },
  {
    id: 'mayank-sharma',
    name: 'Dr. Mayank Sharma',
    department: 'Pulmonology, Allergy & Critical Care',
    university: 'King George\'s Medical University',
    rawCitations: 960,
    deduplicatedCitations: 820,
    trueExternalCitations: 660,
    integrityScore: 68.8,
    rank: 2,
    status: 'High Integrity'
  },
  {
    id: 'priya-nambiar',
    name: 'Dr. Priya Nambiar',
    department: 'Oncology & Immunotherapy',
    university: 'Apex Institute of Medical Sciences',
    rawCitations: 890,
    deduplicatedCitations: 740,
    trueExternalCitations: 590,
    integrityScore: 66.3,
    rank: 3,
    status: 'High Integrity'
  },
  {
    id: 'arun-kulshreshtha',
    name: 'Dr. Arun Kulshreshtha',
    department: 'Endocrinology & Metabolism',
    university: 'All India Institute of Medical Sciences (AIIMS)',
    rawCitations: 810,
    deduplicatedCitations: 690,
    trueExternalCitations: 480,
    integrityScore: 59.3,
    rank: 4,
    status: 'Moderate'
  },
  {
    id: 'nishit-dixit',
    name: 'Dr. Nishit Dixit',
    department: 'Cardiology & Regenerative Medicine',
    university: 'Apex Institute of Medical Sciences',
    rawCitations: 742,
    deduplicatedCitations: 512,
    trueExternalCitations: 338,
    integrityScore: 45.5,
    rank: 5,
    status: 'Flagged'
  },
  {
    id: 'rajesh-k-singh',
    name: 'Dr. Rajesh K. Singh',
    department: 'Pathology & Genomics',
    university: 'Apex Institute of Medical Sciences',
    rawCitations: 680,
    deduplicatedCitations: 440,
    trueExternalCitations: 270,
    integrityScore: 39.7,
    rank: 6,
    status: 'Flagged'
  }
];

export const DEPARTMENT_HEATMAP: DepartmentMatrixItem[] = [
  {
    department: 'Cardiology & Regenerative Medicine',
    totalFaculty: 18,
    avgIntegrityScore: 52.4,
    selfCitationRate: 31.8,
    duplicateRate: 15.8,
    coAuthorClusteringIndex: 78,
    riskTier: 'High'
  },
  {
    department: 'Pathology & Genomic Diagnostics',
    totalFaculty: 14,
    avgIntegrityScore: 48.9,
    selfCitationRate: 34.2,
    duplicateRate: 16.9,
    coAuthorClusteringIndex: 82,
    riskTier: 'High'
  },
  {
    department: 'Pulmonology & Critical Care',
    totalFaculty: 16,
    avgIntegrityScore: 69.1,
    selfCitationRate: 17.5,
    duplicateRate: 13.4,
    coAuthorClusteringIndex: 44,
    riskTier: 'Medium'
  },
  {
    department: 'Endocrinology & Metabolism',
    totalFaculty: 12,
    avgIntegrityScore: 64.3,
    selfCitationRate: 21.0,
    duplicateRate: 14.7,
    coAuthorClusteringIndex: 51,
    riskTier: 'Medium'
  },
  {
    department: 'Neurology & Molecular Therapeutics',
    totalFaculty: 22,
    avgIntegrityScore: 84.7,
    selfCitationRate: 8.2,
    duplicateRate: 7.1,
    coAuthorClusteringIndex: 21,
    riskTier: 'Low'
  },
  {
    department: 'Surgical Oncology & Clinical Trials',
    totalFaculty: 20,
    avgIntegrityScore: 78.5,
    selfCitationRate: 12.1,
    duplicateRate: 9.4,
    coAuthorClusteringIndex: 29,
    riskTier: 'Low'
  }
];
