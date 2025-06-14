
import { TaxCalculationResult } from '@/types/tax';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface TaxComparisonProps {
  results: TaxCalculationResult;
}

const TaxComparison = ({ results }: TaxComparisonProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const { oldRegime, newRegime, recommendation, savings } = results;

  return (
    <div className="space-y-6">
      {/* Recommendation Banner */}
      <div className={`p-4 rounded-lg ${recommendation === 'new' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'} border`}>
        <div className="flex items-center gap-2 mb-2">
          {savings > 0 ? (
            <TrendingDown className="w-5 h-5 text-green-600" />
          ) : (
            <TrendingUp className="w-5 h-5 text-red-600" />
          )}
          <h3 className="font-semibold text-gray-800">
            {recommendation === 'new' ? 'New Regime Recommended' : 'Old Regime Recommended'}
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          You can save {formatCurrency(Math.abs(savings))} by choosing the {recommendation} regime.
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Old Regime */}
        <Card className={`${recommendation === 'old' ? 'ring-2 ring-blue-500' : ''}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-blue-700">Old Regime</CardTitle>
              {recommendation === 'old' && (
                <Badge className="bg-blue-100 text-blue-700">Recommended</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Gross Salary:</span>
              <span className="font-medium">{formatCurrency(oldRegime.grossSalary)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Taxable Income:</span>
              <span className="font-medium">{formatCurrency(oldRegime.taxableIncome)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Income Tax:</span>
              <span className="font-medium">{formatCurrency(oldRegime.incomeTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Health & Education Cess:</span>
              <span className="font-medium">{formatCurrency(oldRegime.cess)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total Tax:</span>
              <span className="text-red-600">{formatCurrency(oldRegime.totalTax)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Net Salary:</span>
              <span className="text-green-600">{formatCurrency(oldRegime.netSalary)}</span>
            </div>
            <div className="text-center text-sm text-gray-600">
              Effective Rate: {oldRegime.effectiveRate.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        {/* New Regime */}
        <Card className={`${recommendation === 'new' ? 'ring-2 ring-green-500' : ''}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-green-700">New Regime</CardTitle>
              {recommendation === 'new' && (
                <Badge className="bg-green-100 text-green-700">Recommended</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Gross Salary:</span>
              <span className="font-medium">{formatCurrency(newRegime.grossSalary)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Taxable Income:</span>
              <span className="font-medium">{formatCurrency(newRegime.taxableIncome)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Income Tax:</span>
              <span className="font-medium">{formatCurrency(newRegime.incomeTax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Health & Education Cess:</span>
              <span className="font-medium">{formatCurrency(newRegime.cess)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total Tax:</span>
              <span className="text-red-600">{formatCurrency(newRegime.totalTax)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Net Salary:</span>
              <span className="text-green-600">{formatCurrency(newRegime.netSalary)}</span>
            </div>
            <div className="text-center text-sm text-gray-600">
              Effective Rate: {newRegime.effectiveRate.toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxComparison;
