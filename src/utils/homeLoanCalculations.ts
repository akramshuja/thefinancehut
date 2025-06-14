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
  const { loanAmount, interestRate, tenureYears, prepaymentAmount = 0, prepaymentStartMonth = 12 } = inputs;
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  
  // Calculate EMI
  const monthlyEmi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  // Calculate outstanding balance at prepayment month
  let outstandingBalance = loanAmount;
  for (let month = 1; month < prepaymentStartMonth; month++) {
    const interestPayment = outstandingBalance * monthlyRate;
    const principalPayment = monthlyEmi - interestPayment;
    outstandingBalance -= principalPayment;
  }
  
  // Scenario 1: Reduce EMI (keep same tenure)
  const newLoanAmount = outstandingBalance - prepaymentAmount;
  const remainingMonths = totalMonths - prepaymentStartMonth + 1;
  const newEmi = newLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths) / 
    (Math.pow(1 + monthlyRate, remainingMonths) - 1);
  
  // Scenario 2: Reduce tenure (keep same EMI)
  let balance = outstandingBalance - prepaymentAmount;
  let months = 0;
  
  while (balance > 0 && months < totalMonths * 2) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyEmi - interestPayment;
    balance -= principalPayment;
    months++;
  }
  
  // Calculate savings
  const originalTotalAmount = monthlyEmi * totalMonths;
  const prepaidMonthsAmount = monthlyEmi * (prepaymentStartMonth - 1);
  const remainingMonthsAmount = (monthlyEmi * months) + prepaymentAmount;
  const newTotalAmount = prepaidMonthsAmount + remainingMonthsAmount;
  const totalSavings = originalTotalAmount - newTotalAmount;
  const interestSaved = totalSavings;
  const timeReduced = (totalMonths - prepaymentStartMonth + 1) - months;
  
  return {
    newEmi,
    newTenure: (prepaymentStartMonth - 1 + months) / 12,
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
