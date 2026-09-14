export type Milestone =
  | 'Started'
  | 'Processing'
  | 'Underwriting'
  | 'Approval'
  | 'Docs Out'
  | 'Funding';

export type Loan = {
  loanNumber: string;
  borrower: string;
  milestone: Milestone;
  /** Cents. We never put money in a float. */
  loanAmountCents: number;
  loanOfficer: string;
  lockExpiresOn: string;
};

/** Underwriting conditions, by when they have to be cleared. */
export type ConditionCategory = 'PTA' | 'PTD' | 'PTF';

export type LoanCondition = {
  id: string;
  category: ConditionCategory;
  text: string;
  cleared: boolean;
};
