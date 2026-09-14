import type { Loan, LoanCondition, Milestone } from './types.ts';

export const MILESTONES: Milestone[] = [
  'Started',
  'Processing',
  'Underwriting',
  'Approval',
  'Docs Out',
  'Funding',
];

export const CATEGORY_LABEL: Record<string, string> = {
  PTA: 'Prior to Approval',
  PTD: 'Prior to Docs',
  PTF: 'Prior to Funding',
};

export const LOANS: Loan[] = [
  { loanNumber: '2609001842', borrower: 'Alvarez, R.',  milestone: 'Underwriting', loanAmountCents: 41_250_000, loanOfficer: 'M. Whitfield', lockExpiresOn: '2026-09-22' },
  { loanNumber: '2609000317', borrower: 'Brennan, T.',  milestone: 'Processing',   loanAmountCents: 28_900_000, loanOfficer: 'M. Whitfield', lockExpiresOn: '2026-10-04' },
  { loanNumber: '2609002104', borrower: 'Okafor, D.',   milestone: 'Underwriting', loanAmountCents: 55_000_000, loanOfficer: 'J. Santos',    lockExpiresOn: '2026-09-15' },
  { loanNumber: '2609000998', borrower: 'Price, K.',    milestone: 'Funding',      loanAmountCents: 33_475_000, loanOfficer: 'J. Santos',    lockExpiresOn: '2026-09-19' },
  { loanNumber: '2609001560', borrower: 'Nakamura, S.', milestone: 'Processing',   loanAmountCents: 19_800_000, loanOfficer: 'L. Duarte',    lockExpiresOn: '2026-10-11' },
  { loanNumber: '2609002233', borrower: 'Whitcomb, A.', milestone: 'Approval',     loanAmountCents: 62_150_000, loanOfficer: 'L. Duarte',    lockExpiresOn: '2026-09-30' },
  { loanNumber: '2609002501', borrower: 'Okonkwo, B.',  milestone: 'Docs Out',     loanAmountCents: 38_600_000, loanOfficer: 'M. Whitfield', lockExpiresOn: '2026-09-17' },
];

export const CONDITIONS: LoanCondition[] = [
  { id: 'c-8801', category: 'PTA', text: 'Most recent 2 months bank statements, all pages',   cleared: false },
  { id: 'c-8802', category: 'PTD', text: 'Verbal VOE within 10 days of note date',            cleared: false },
  { id: 'c-8803', category: 'PTD', text: 'Homeowners policy with mortgagee clause',           cleared: false },
  { id: 'c-8804', category: 'PTF', text: 'Signed 4506-C for both borrowers',                  cleared: false },
];

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}
