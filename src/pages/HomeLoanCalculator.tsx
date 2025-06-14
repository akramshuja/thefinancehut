
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HomeLoanCalculatorForm from '@/components/HomeLoanCalculatorForm';
import HomeLoanResults from '@/components/HomeLoanResults';
import { HomeLoanInputs, HomeLoanResults as HomeLoanResultsType } from '@/types/homeLoan';
import { calculateHomeLoan } from '@/utils/homeLoanCalculations';

const HomeLoanCalculator = () => {
  const [results, setResults] = useState<HomeLoanResultsType | null>(null);

  const handleCalculate = (inputs: HomeLoanInputs) => {
    const calculatedResults = calculateHomeLoan(inputs);
    setResults(calculatedResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-center mb-2">Home Loan Calculator</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Calculate your home loan EMI, analyze prepayment benefits, and explore the impact of extra EMI payments on your loan tenure and interest savings.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <HomeLoanCalculatorForm onCalculate={handleCalculate} />
          {results && <HomeLoanResults results={results} />}
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Understanding Home Loan Calculations</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2">EMI Calculation</h3>
                <p className="text-muted-foreground mb-4">
                  EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is principal, r is monthly interest rate, and n is number of months.
                </p>
                
                <h3 className="font-semibold mb-2">Prepayment Benefits</h3>
                <p className="text-muted-foreground">
                  Making a lump sum prepayment can either reduce your EMI amount or shorten your loan tenure, resulting in significant interest savings.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Extra EMI Strategy</h3>
                <p className="text-muted-foreground mb-4">
                  Paying additional EMIs upfront reduces your principal amount early, leading to substantial interest savings and faster loan closure.
                </p>
                
                <h3 className="font-semibold mb-2">Amortization Schedule</h3>
                <p className="text-muted-foreground">
                  Shows the monthly breakdown of principal and interest payments. Initially, a larger portion goes toward interest, gradually shifting to principal over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanCalculator;
