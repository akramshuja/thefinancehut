
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
  const annualRate = expectedReturn / 100;
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
    futureValue = lumpSumAmount * Math.pow(1 + annualRate, duration);
  }
  
  const wealth = futureValue - totalInvestment;
  
  // Calculate existing investment value if applicable
  let existingValue = 0;
  let totalExistingInvestment = 0;
  if (hasExistingInvestment && existingAmount > 0) {
    // Use existingDuration if provided, otherwise use the same duration as new investment
    const growthPeriod = existingDuration > 0 ? existingDuration : duration;
    existingValue = existingAmount * Math.pow(1 + annualRate, growthPeriod);
    totalExistingInvestment = existingAmount;
  }
  
  const totalFutureValue = futureValue + existingValue;
  const totalInvestedAmount = totalInvestment + totalExistingInvestment;
  const totalWealth = totalFutureValue - totalInvestedAmount;
  
  return {
    totalInvestment: totalInvestedAmount,
    futureValue: totalFutureValue,
    wealth: totalWealth,
    monthlyAmount: investmentType === 'sip' ? monthlyAmount : 0,
    lumpSumAmount: investmentType === 'lumpsum' ? lumpSumAmount : 0,
    existingValue,
    totalFutureValue
  };
};
