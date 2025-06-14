
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SipResult } from '@/types/sip';
import { TrendingUp, Target, Calculator, PiggyBank } from 'lucide-react';

interface SipResultsProps {
  result: SipResult;
}

const SipResults = ({ result }: SipResultsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Investment</CardTitle>
            <PiggyBank className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">
              {formatCurrency(result.totalInvestment)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Future Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {formatCurrency(result.futureValue)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-purple-700">Wealth Generated</CardTitle>
          <Target className="h-5 w-5 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-800 mb-2">
            {formatCurrency(result.wealth)}
          </div>
          <p className="text-sm text-purple-600">
            Your investment will grow by {formatCurrency(result.wealth)}
          </p>
        </CardContent>
      </Card>

      {result.existingValue > 0 && (
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Existing Investment Value</CardTitle>
            <Calculator className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800 mb-2">
              {formatCurrency(result.existingValue)}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-orange-600">Total Future Value:</span>
                <span className="font-semibold text-orange-800">
                  {formatCurrency(result.totalFutureValue)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Investment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Investment Type:</span>
            <span className="font-medium">
              {result.monthlyAmount > 0 ? `SIP - ${formatCurrency(result.monthlyAmount)}/month` : `Lump Sum - ${formatCurrency(result.lumpSumAmount)}`}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Total Investment:</span>
            <span className="font-medium">{formatCurrency(result.totalInvestment)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Expected Returns:</span>
            <span className="font-medium text-green-600">{formatCurrency(result.wealth)}</span>
          </div>
          <div className="flex justify-between py-2 font-semibold text-lg">
            <span>Total Future Value:</span>
            <span className="text-green-600">
              {formatCurrency(result.existingValue > 0 ? result.totalFutureValue : result.futureValue)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SipResults;
