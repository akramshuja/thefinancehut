
import { SipFormData, SipResult } from '@/types/sip';

export const calculateSIP = (formData: SipFormData): SipResult => {
  const {
    investmentType,
    monthlyAmount,
    lumpSumAmount,
    duration,
    expectedReturn,
    hasExistingInvestment,
    existingAmount,
    existingDuration
  } = formData;

  const monthlyRate = expectedReturn / 100 / 12;
  const totalMonths = duration * 12;
  
  let totalInvestment = 0;
  let futureValue = 0;
  
  if (investmentType === 'sip') {
    totalInvestment = monthlyAmount * totalMonths;
    // SIP Future Value Formula: P * [((1 + r)^n - 1) / r] * (1 + r)
    futureValue = monthlyAmount * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
  } else {
    totalInvestment = lumpSumAmount;
    // Lump Sum Future Value Formula: P * (1 + r)^n
    futureValue = lumpSumAmount * Math.pow(1 + (expectedReturn / 100), duration);
  }
  
  const wealth = futureValue - totalInvestment;
  
  // Calculate existing investment value if applicable
  let existingValue = 0;
  if (hasExistingInvestment && existingAmount > 0) {
    existingValue = existingAmount * Math.pow(1 + (expectedReturn / 100), existingDuration);
  }
  
  const totalFutureValue = futureValue + existingValue;
  
  return {
    totalInvestment,
    futureValue,
    wealth,
    monthlyAmount: investmentType === 'sip' ? monthlyAmount : 0,
    lumpSumAmount: investmentType === 'lumpsum' ? lumpSumAmount : 0,
    existingValue,
    totalFutureValue
  };
};
