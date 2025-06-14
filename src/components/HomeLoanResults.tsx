
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { HomeLoanResults } from '@/types/homeLoan';

interface HomeLoanResultsProps {
  results: HomeLoanResults | null;
}

const HomeLoanResults = ({ results }: HomeLoanResultsProps) => {
  if (!results) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number, decimals: number = 1) => {
    return num.toFixed(decimals);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Loan Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic EMI</TabsTrigger>
            <TabsTrigger value="prepayment">Prepayment</TabsTrigger>
            <TabsTrigger value="extra-emi">Extra EMI</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Monthly EMI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.monthlyEmi)}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(results.totalAmount)}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Interest</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(results.totalInterest)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="prepayment" className="mt-6">
            {results.withPrepayment ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Reduced EMI Option</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>New EMI:</strong> {formatCurrency(results.withPrepayment.newEmi || 0)}</p>
                      <p><strong>EMI Reduction:</strong> {formatCurrency(results.monthlyEmi - (results.withPrepayment.newEmi || 0))}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Reduced Tenure Option</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>New Tenure:</strong> {formatNumber(results.withPrepayment.newTenure || 0)} years</p>
                      <p><strong>Time Saved:</strong> {formatNumber(results.withPrepayment.timeReduced || 0)} years</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Savings Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Total Interest Saved:</strong> <span className="text-green-600 font-bold">{formatCurrency(results.withPrepayment.interestSaved)}</span></p>
                    <p><strong>Total Savings:</strong> <span className="text-green-600 font-bold">{formatCurrency(results.withPrepayment.totalSavings)}</span></p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No prepayment amount specified</p>
            )}
          </TabsContent>
          
          <TabsContent value="extra-emi" className="mt-6">
            {results.withExtraEmi ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Loan Closure Impact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>New Tenure:</strong> {formatNumber(results.withExtraEmi.newTenure)} years</p>
                      <p><strong>Time Saved:</strong> {formatNumber(results.withExtraEmi.timeReduced)} years</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Financial Benefits</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>Interest Saved:</strong> <span className="text-green-600 font-bold">{formatCurrency(results.withExtraEmi.interestSaved)}</span></p>
                      <p><strong>Total Savings:</strong> <span className="text-green-600 font-bold">{formatCurrency(results.withExtraEmi.totalSavings)}</span></p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No extra EMI count specified</p>
            )}
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Amortization Schedule (First 12 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Month</th>
                        <th className="text-right py-2">EMI</th>
                        <th className="text-right py-2">Principal</th>
                        <th className="text-right py-2">Interest</th>
                        <th className="text-right py-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.amortizationSchedule.map((row) => (
                        <tr key={row.month} className="border-b">
                          <td className="py-2">{row.month}</td>
                          <td className="text-right py-2">{formatCurrency(row.emi)}</td>
                          <td className="text-right py-2">{formatCurrency(row.principal)}</td>
                          <td className="text-right py-2">{formatCurrency(row.interest)}</td>
                          <td className="text-right py-2">{formatCurrency(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HomeLoanResults;
