
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HomeLoanInputs } from '@/types/homeLoan';

interface HomeLoanCalculatorFormProps {
  onCalculate: (inputs: HomeLoanInputs) => void;
}

const HomeLoanCalculatorForm = ({ onCalculate }: HomeLoanCalculatorFormProps) => {
  const [formData, setFormData] = useState<HomeLoanInputs>({
    loanAmount: 5000000,
    interestRate: 8.5,
    tenureYears: 20,
    prepaymentAmount: 0,
    extraEmiCount: 0,
  });

  const handleInputChange = (field: keyof HomeLoanInputs, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleCalculate = () => {
    onCalculate(formData);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Home Loan Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Details</TabsTrigger>
            <TabsTrigger value="prepayment">Prepayment</TabsTrigger>
            <TabsTrigger value="extra-emi">Extra EMI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  placeholder="50,00,000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={formData.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  placeholder="8.5"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tenureYears">Loan Tenure (Years)</Label>
                <Input
                  id="tenureYears"
                  type="number"
                  value={formData.tenureYears}
                  onChange={(e) => handleInputChange('tenureYears', e.target.value)}
                  placeholder="20"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="prepayment" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prepaymentAmount">Prepayment Amount (₹)</Label>
                <Input
                  id="prepaymentAmount"
                  type="number"
                  value={formData.prepaymentAmount || ''}
                  onChange={(e) => handleInputChange('prepaymentAmount', e.target.value)}
                  placeholder="5,00,000"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Enter a lump sum amount you want to prepay to see the impact on your loan.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="extra-emi" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="extraEmiCount">Number of Extra EMIs</Label>
                <Input
                  id="extraEmiCount"
                  type="number"
                  value={formData.extraEmiCount || ''}
                  onChange={(e) => handleInputChange('extraEmiCount', e.target.value)}
                  placeholder="12"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Enter the number of additional EMIs you want to pay to see the impact on loan closure.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button onClick={handleCalculate} className="w-full mt-6">
          Calculate Home Loan
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomeLoanCalculatorForm;
