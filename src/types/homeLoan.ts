
export interface HomeLoanInputs {
  loanAmount: number;
  interestRate: number;
  tenureYears: number;
  prepaymentAmount?: number;
  prepaymentFrequency?: 'monthly' | 'yearly' | 'one-time';
  prepaymentStartMonth?: number;
  extraEmiCount?: number;
}

export interface HomeLoanResults {
  monthlyEmi: number;
  totalAmount: number;
  totalInterest: number;
  
  // Prepayment scenarios
  withPrepayment?: {
    newEmi?: number;
    newTenure?: number;
    totalSavings: number;
    interestSaved: number;
    timeReduced?: number;
  };
  
  // Extra EMI scenarios
  withExtraEmi?: {
    newTenure: number;
    totalSavings: number;
    interestSaved: number;
    timeReduced: number;
  };
  
  // Amortization schedule (first 12 months)
  amortizationSchedule: Array<{
    month: number;
    principal: number;
    interest: number;
    balance: number;
    emi: number;
  }>;
}
