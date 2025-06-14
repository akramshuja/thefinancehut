
export interface SipFormData {
  investmentType: 'sip' | 'lumpsum';
  monthlyAmount: number;
  lumpSumAmount: number;
  duration: number;
  expectedReturn: number;
  hasExistingInvestment: boolean;
  existingAmount: number;
  existingDuration: number;
}

export interface SipResult {
  totalInvestment: number;
  futureValue: number;
  wealth: number;
  monthlyAmount: number;
  lumpSumAmount: number;
  existingValue: number;
  totalFutureValue: number;
}
