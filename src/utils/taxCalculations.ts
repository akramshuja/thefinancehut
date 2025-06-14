
import { SalaryDetails, Deductions, TaxCalculation, TaxCalculationResult } from '@/types/tax';

// Tax slabs for AY 2025-26 (Updated)
const OLD_REGIME_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 0.05 },
  { min: 500000, max: 1000000, rate: 0.20 },
  { min: 1000000, max: Infinity, rate: 0.30 },
];

const OLD_REGIME_SLABS_SENIOR = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 500000, rate: 0.05 },
  { min: 500000, max: 1000000, rate: 0.20 },
  { min: 1000000, max: Infinity, rate: 0.30 },
];

const OLD_REGIME_SLABS_SUPER_SENIOR = [
  { min: 0, max: 500000, rate: 0 },
  { min: 500000, max: 1000000, rate: 0.20 },
  { min: 1000000, max: Infinity, rate: 0.30 },
];

const NEW_REGIME_SLABS = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400000, max: 800000, rate: 0.05 },
  { min: 800000, max: 1200000, rate: 0.10 },
  { min: 1200000, max: 1600000, rate: 0.15 },
  { min: 1600000, max: 2000000, rate: 0.20 },
  { min: 2000000, max: 2400000, rate: 0.25 },
  { min: 2400000, max: Infinity, rate: 0.30 },
];

const calculateIncomeTax = (taxableIncome: number, slabs: typeof OLD_REGIME_SLABS): number => {
  let tax = 0;
  
  for (const slab of slabs) {
    if (taxableIncome <= slab.min) break;
    
    const taxableInThisSlab = Math.min(taxableIncome, slab.max) - slab.min;
    tax += taxableInThisSlab * slab.rate;
  }
  
  return Math.max(0, tax);
};

const calculateGrossSalary = (salary: SalaryDetails): number => {
  return salary.basicSalary + salary.da + salary.hra + salary.bonus + salary.otherAllowances;
};

const calculateOldRegimeTax = (salary: SalaryDetails, deductions: Deductions, age: number = 25): TaxCalculation => {
  const grossSalary = calculateGrossSalary(salary);
  
  // Standard deduction for salaried individuals
  const standardDeduction = Math.min(50000, grossSalary);
  
  // HRA exemption (simplified calculation)
  const hraExemption = Math.min(
    salary.hra,
    Math.min(salary.basicSalary * 0.5, salary.hra * 0.9) // Simplified HRA calculation
  );
  
  // Total deductions
  const totalDeductions = standardDeduction + 
    Math.min(deductions.section80C, 150000) +
    Math.min(deductions.section80D, 25000) +
    Math.min(deductions.homeLoanInterest, 200000) +
    Math.min(deductions.nps, 50000) +
    deductions.otherDeductions +
    hraExemption;
  
  const taxableIncome = Math.max(0, grossSalary - totalDeductions);
  
  // Select appropriate slab based on age
  let slabs = OLD_REGIME_SLABS;
  if (age >= 80) {
    slabs = OLD_REGIME_SLABS_SUPER_SENIOR;
  } else if (age >= 60) {
    slabs = OLD_REGIME_SLABS_SENIOR;
  }
  
  const incomeTax = calculateIncomeTax(taxableIncome, slabs);
  
  // Apply rebate under section 87A (Rs. 12,500 for income up to Rs. 5 lakh)
  const rebateAmount = taxableIncome <= 500000 ? Math.min(incomeTax, 12500) : 0;
  const taxAfterRebate = Math.max(0, incomeTax - rebateAmount);
  
  const cess = taxAfterRebate * 0.04; // 4% Health and Education Cess
  const totalTax = taxAfterRebate + cess;
  const netSalary = grossSalary - totalTax;
  const effectiveRate = grossSalary > 0 ? (totalTax / grossSalary) * 100 : 0;
  
  return {
    grossSalary,
    taxableIncome,
    incomeTax: taxAfterRebate,
    cess,
    totalTax,
    netSalary,
    effectiveRate,
  };
};

const calculateNewRegimeTax = (salary: SalaryDetails, deductions: Deductions): TaxCalculation => {
  const grossSalary = calculateGrossSalary(salary);
  
  // Standard deduction increased to Rs. 75,000 for salaried individuals
  const standardDeduction = Math.min(75000, grossSalary);
  
  // Limited deductions in new regime (employer NPS contribution, etc.)
  const limitedDeductions = Math.min(deductions.nps, 50000); // Only employer NPS contribution allowed
  
  const totalDeductions = standardDeduction + limitedDeductions;
  const taxableIncome = Math.max(0, grossSalary - totalDeductions);
  const incomeTax = calculateIncomeTax(taxableIncome, NEW_REGIME_SLABS);
  
  // Apply increased rebate under section 87A (Rs. 60,000 for income up to Rs. 12 lakh)
  const rebateAmount = taxableIncome <= 1200000 ? Math.min(incomeTax, 60000) : 0;
  const taxAfterRebate = Math.max(0, incomeTax - rebateAmount);
  
  const cess = taxAfterRebate * 0.04; // 4% Health and Education Cess
  const totalTax = taxAfterRebate + cess;
  const netSalary = grossSalary - totalTax;
  const effectiveRate = grossSalary > 0 ? (totalTax / grossSalary) * 100 : 0;
  
  return {
    grossSalary,
    taxableIncome,
    incomeTax: taxAfterRebate,
    cess,
    totalTax,
    netSalary,
    effectiveRate,
  };
};

export const calculateTax = (salary: SalaryDetails, deductions: Deductions, age: number = 25): TaxCalculationResult => {
  const oldRegime = calculateOldRegimeTax(salary, deductions, age);
  const newRegime = calculateNewRegimeTax(salary, deductions);
  
  const savings = oldRegime.totalTax - newRegime.totalTax;
  const recommendation = savings > 0 ? 'new' : 'old';
  
  return {
    oldRegime,
    newRegime,
    recommendation,
    savings,
  };
};
