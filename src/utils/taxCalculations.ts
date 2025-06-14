
import { SalaryDetails, Deductions, TaxCalculation, TaxCalculationResult } from '@/types/tax';

// Tax slabs for AY 2024-25
const OLD_REGIME_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 0.05 },
  { min: 500000, max: 1000000, rate: 0.20 },
  { min: 1000000, max: Infinity, rate: 0.30 },
];

const NEW_REGIME_SLABS = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 600000, rate: 0.05 },
  { min: 600000, max: 900000, rate: 0.10 },
  { min: 900000, max: 1200000, rate: 0.15 },
  { min: 1200000, max: 1500000, rate: 0.20 },
  { min: 1500000, max: Infinity, rate: 0.30 },
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

const calculateOldRegimeTax = (salary: SalaryDetails, deductions: Deductions): TaxCalculation => {
  const grossSalary = calculateGrossSalary(salary);
  
  // Standard deduction
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
  const incomeTax = calculateIncomeTax(taxableIncome, OLD_REGIME_SLABS);
  const cess = incomeTax * 0.04; // 4% Health and Education Cess
  const totalTax = incomeTax + cess;
  const netSalary = grossSalary - totalTax;
  const effectiveRate = grossSalary > 0 ? (totalTax / grossSalary) * 100 : 0;
  
  return {
    grossSalary,
    taxableIncome,
    incomeTax,
    cess,
    totalTax,
    netSalary,
    effectiveRate,
  };
};

const calculateNewRegimeTax = (salary: SalaryDetails, deductions: Deductions): TaxCalculation => {
  const grossSalary = calculateGrossSalary(salary);
  
  // Standard deduction
  const standardDeduction = Math.min(50000, grossSalary);
  
  // Limited deductions in new regime (employer NPS contribution, etc.)
  const limitedDeductions = Math.min(deductions.nps, 50000); // Only employer NPS contribution allowed
  
  const totalDeductions = standardDeduction + limitedDeductions;
  const taxableIncome = Math.max(0, grossSalary - totalDeductions);
  const incomeTax = calculateIncomeTax(taxableIncome, NEW_REGIME_SLABS);
  const cess = incomeTax * 0.04; // 4% Health and Education Cess
  const totalTax = incomeTax + cess;
  const netSalary = grossSalary - totalTax;
  const effectiveRate = grossSalary > 0 ? (totalTax / grossSalary) * 100 : 0;
  
  return {
    grossSalary,
    taxableIncome,
    incomeTax,
    cess,
    totalTax,
    netSalary,
    effectiveRate,
  };
};

export const calculateTax = (salary: SalaryDetails, deductions: Deductions): TaxCalculationResult => {
  const oldRegime = calculateOldRegimeTax(salary, deductions);
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
