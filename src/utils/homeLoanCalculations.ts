import { HomeLoanInputs, HomeLoanResults } from '@/types/homeLoan';

export const calculateHomeLoan = (inputs: HomeLoanInputs): HomeLoanResults => {
  const { loanAmount, interestRate, tenureYears } = inputs;
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  
  // Calculate EMI using formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyEmi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const totalAmount = monthlyEmi * totalMonths;
  const totalInterest = totalAmount - loanAmount;
  
  // Generate amortization schedule for first 12 months
  const amortizationSchedule = [];
  let balance = loanAmount;
  
  for (let month = 1; month <= Math.min(12, totalMonths); month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyEmi - interestPayment;
    balance -= principalPayment;
    
    amortizationSchedule.push({
      month,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance),
      emi: monthlyEmi
    });
  }
  
  const results: HomeLoanResults = {
    monthlyEmi,
    totalAmount,
    totalInterest,
    amortizationSchedule
  };
  
  // Calculate prepayment scenarios if provided
  if (inputs.prepaymentAmount && inputs.prepaymentAmount > 0) {
    results.withPrepayment = calculatePrepaymentScenario(inputs);
  }
  
  // Calculate extra EMI scenarios if provided
  if (inputs.extraEmiCount && inputs.extraEmiCount > 0) {
    results.withExtraEmi = calculateExtraEmiScenario(inputs);
  }
  
  return results;
};

const calculatePrepaymentScenario = (inputs: HomeLoanInputs) => {
  const { loanAmount, interestRate, tenureYears, prepaymentAmount = 0 } = inputs;
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  
  // Calculate EMI
  const monthlyEmi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  // Scenario 1: Reduce EMI (keep same tenure)
  const newLoanAmount = loanAmount - prepaymentAmount;
  const newEmi = newLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  // Scenario 2: Reduce tenure (keep same EMI)
  // Calculate remaining tenure with prepayment
  let balance = loanAmount - prepaymentAmount;
  let months = 0;
  
  while (balance > 0 && months < totalMonths * 2) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyEmi - interestPayment;
    balance -= principalPayment;
    months++;
  }
  
  const originalTotalAmount = monthlyEmi * totalMonths;
  const newTotalAmount = (monthlyEmi * months) + prepaymentAmount;
  const totalSavings = originalTotalAmount - newTotalAmount;
  const interestSaved = totalSavings;
  const timeReduced = totalMonths - months;
  
  return {
    newEmi,
    newTenure: months / 12,
    totalSavings,
    interestSaved,
    timeReduced: timeReduced / 12
  };
};

const calculateExtraEmiScenario = (inputs: HomeLoanInputs) => {
  const { loanAmount, interestRate, tenureYears, extraEmiCount = 0 } = inputs;
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  
  // Calculate original EMI
  const monthlyEmi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const originalTotalAmount = monthlyEmi * totalMonths;
  
  // Calculate new scenario with extra EMIs
  // Assume extra EMIs are paid at the beginning
  const extraAmount = monthlyEmi * extraEmiCount;
  const adjustedLoanAmount = loanAmount - extraAmount;
  
  // Calculate new tenure
  let balance = adjustedLoanAmount;
  let months = 0;
  
  while (balance > 0 && months < totalMonths * 2) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyEmi - interestPayment;
    balance -= principalPayment;
    months++;
  }
  
  const newTotalAmount = (monthlyEmi * months) + extraAmount;
  const totalSavings = originalTotalAmount - newTotalAmount;
  const interestSaved = totalSavings;
  const timeReduced = totalMonths - months;
  
  return {
    newTenure: months / 12,
    totalSavings,
    interestSaved,
    timeReduced: timeReduced / 12
  };
};
