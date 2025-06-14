
export interface SalaryDetails {
  basicSalary: number;
  da: number;
  hra: number;
  bonus: number;
  otherAllowances: number;
}

export interface Deductions {
  section80C: number;
  section80D: number;
  homeLoanInterest: number;
  nps: number;
  otherDeductions: number;
}

export interface TaxCalculation {
  grossSalary: number;
  taxableIncome: number;
  incomeTax: number;
  cess: number;
  totalTax: number;
  netSalary: number;
  effectiveRate: number;
}

export interface TaxCalculationResult {
  oldRegime: TaxCalculation;
  newRegime: TaxCalculation;
  recommendation: 'old' | 'new';
  savings: number;
}
