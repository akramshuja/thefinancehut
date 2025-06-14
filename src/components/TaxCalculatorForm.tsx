
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SalaryDetails, Deductions, TaxCalculationResult } from '@/types/tax';
import { calculateTax } from '@/utils/taxCalculations';

interface TaxCalculatorFormProps {
  onCalculate: (results: TaxCalculationResult) => void;
}

const TaxCalculatorForm = ({ onCalculate }: TaxCalculatorFormProps) => {
  const [age, setAge] = useState<number>(25);
  const [salaryDetails, setSalaryDetails] = useState<SalaryDetails>({
    basicSalary: 0,
    da: 0,
    hra: 0,
    bonus: 0,
    otherAllowances: 0,
  });

  const [deductions, setDeductions] = useState<Deductions>({
    section80C: 0,
    section80D: 0,
    homeLoanInterest: 0,
    nps: 0,
    otherDeductions: 0,
  });

  const handleSalaryChange = (field: keyof SalaryDetails, value: string) => {
    setSalaryDetails(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleDeductionChange = (field: keyof Deductions, value: string) => {
    setDeductions(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleCalculate = () => {
    const results = calculateTax(salaryDetails, deductions, age);
    onCalculate(results);
  };

  return (
    <div className="space-y-6">
      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="age">Age Category</Label>
            <Select value={age.toString()} onValueChange={(value) => setAge(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select age category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">Below 60 years</SelectItem>
                <SelectItem value="65">60-80 years (Senior Citizen)</SelectItem>
                <SelectItem value="85">Above 80 years (Super Senior Citizen)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Salary Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Salary Details (Annual)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="basicSalary">Basic Salary (₹)</Label>
              <Input
                id="basicSalary"
                type="number"
                placeholder="0"
                onChange={(e) => handleSalaryChange('basicSalary', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="da">Dearness Allowance (₹)</Label>
              <Input
                id="da"
                type="number"
                placeholder="0"
                onChange={(e) => handleSalaryChange('da', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="hra">House Rent Allowance (₹)</Label>
              <Input
                id="hra"
                type="number"
                placeholder="0"
                onChange={(e) => handleSalaryChange('hra', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bonus">Bonus (₹)</Label>
              <Input
                id="bonus"
                type="number"
                placeholder="0"
                onChange={(e) => handleSalaryChange('bonus', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="otherAllowances">Other Allowances (₹)</Label>
              <Input
                id="otherAllowances"
                type="number"
                placeholder="0"
                onChange={(e) => handleSalaryChange('otherAllowances', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deductions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Deductions & Investments (Annual)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="section80C">Section 80C (₹)</Label>
              <Input
                id="section80C"
                type="number"
                placeholder="0"
                onChange={(e) => handleDeductionChange('section80C', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Max: ₹1,50,000</p>
            </div>
            <div>
              <Label htmlFor="section80D">Section 80D - Health Insurance (₹)</Label>
              <Input
                id="section80D"
                type="number"
                placeholder="0"
                onChange={(e) => handleDeductionChange('section80D', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Max: ₹25,000-₹50,000</p>
            </div>
            <div>
              <Label htmlFor="homeLoanInterest">Home Loan Interest (₹)</Label>
              <Input
                id="homeLoanInterest"
                type="number"
                placeholder="0"
                onChange={(e) => handleDeductionChange('homeLoanInterest', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Max: ₹2,00,000</p>
            </div>
            <div>
              <Label htmlFor="nps">NPS (₹)</Label>
              <Input
                id="nps"
                type="number"
                placeholder="0"
                onChange={(e) => handleDeductionChange('nps', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Max: ₹50,000</p>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="otherDeductions">Other Deductions (₹)</Label>
              <Input
                id="otherDeductions"
                type="number"
                placeholder="0"
                onChange={(e) => handleDeductionChange('otherDeductions', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleCalculate}
        className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 text-lg font-semibold"
      >
        Calculate Tax
      </Button>
    </div>
  );
};

export default TaxCalculatorForm;
