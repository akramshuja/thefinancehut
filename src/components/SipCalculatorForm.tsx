
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SipFormData, SipResult } from '@/types/sip';
import { calculateSIP } from '@/utils/sipCalculations';

interface SipCalculatorFormProps {
  onCalculate: (result: SipResult) => void;
}

const SipCalculatorForm = ({ onCalculate }: SipCalculatorFormProps) => {
  const [formData, setFormData] = useState<SipFormData>({
    investmentType: 'sip',
    monthlyAmount: 5000,
    lumpSumAmount: 100000,
    duration: 10,
    expectedReturn: 12,
    hasExistingInvestment: false,
    existingAmount: 0,
    existingDuration: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateSIP(formData);
    onCalculate(result);
  };

  const updateFormData = (field: keyof SipFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Investment Type</CardTitle>
          <CardDescription>Choose your investment method</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.investmentType}
            onValueChange={(value) => updateFormData('investmentType', value)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sip" id="sip" />
              <Label htmlFor="sip">SIP (Monthly)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lumpsum" id="lumpsum" />
              <Label htmlFor="lumpsum">Lump Sum</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {formData.investmentType === 'sip' ? (
          <div className="space-y-2">
            <Label htmlFor="monthlyAmount">Monthly Investment (₹)</Label>
            <Input
              id="monthlyAmount"
              type="number"
              value={formData.monthlyAmount}
              onChange={(e) => updateFormData('monthlyAmount', parseInt(e.target.value) || 0)}
              placeholder="Enter monthly amount"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="lumpSumAmount">Lump Sum Amount (₹)</Label>
            <Input
              id="lumpSumAmount"
              type="number"
              value={formData.lumpSumAmount}
              onChange={(e) => updateFormData('lumpSumAmount', parseInt(e.target.value) || 0)}
              placeholder="Enter lump sum amount"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="duration">Investment Duration (Years)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => updateFormData('duration', parseInt(e.target.value) || 0)}
            placeholder="Enter duration in years"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
        <Input
          id="expectedReturn"
          type="number"
          step="0.1"
          value={formData.expectedReturn}
          onChange={(e) => updateFormData('expectedReturn', parseFloat(e.target.value) || 0)}
          placeholder="Enter expected return percentage"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Existing Investment</CardTitle>
          <CardDescription>Do you have any existing investment to include?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hasExisting"
              checked={formData.hasExistingInvestment}
              onChange={(e) => updateFormData('hasExistingInvestment', e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="hasExisting">I have existing investments</Label>
          </div>

          {formData.hasExistingInvestment && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="existingAmount">Current Value (₹)</Label>
                <Input
                  id="existingAmount"
                  type="number"
                  value={formData.existingAmount}
                  onChange={(e) => updateFormData('existingAmount', parseInt(e.target.value) || 0)}
                  placeholder="Enter current investment value"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="existingDuration">Duration to Goal (Years)</Label>
                <Input
                  id="existingDuration"
                  type="number"
                  value={formData.existingDuration}
                  onChange={(e) => updateFormData('existingDuration', parseInt(e.target.value) || 0)}
                  placeholder="Years until you need the money"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" size="lg">
        Calculate Returns
      </Button>
    </form>
  );
};

export default SipCalculatorForm;
