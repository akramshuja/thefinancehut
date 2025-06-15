
import { useState } from 'react';
import { Calculator, TrendingUp, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import TaxCalculatorForm from '@/components/TaxCalculatorForm';
import TaxComparison from '@/components/TaxComparison';
import { TaxCalculationResult } from '@/types/tax';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [taxResults, setTaxResults] = useState<TaxCalculationResult | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Calculator className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Income Tax Calculator</h1>
                <p className="text-sm md:text-base text-gray-600">Compare Old vs New Tax Regime (AY 2025-26)</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/sip-calculator">
                <Button variant="outline" className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">SIP Calculator</span>
                  <span className="sm:hidden">SIP</span>
                </Button>
              </Link>
              <Link to="/home-loan-calculator">
                <Button variant="outline" className="flex items-center gap-2 text-sm">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home Loan</span>
                  <span className="sm:hidden">Loan</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-gray-800">Enter Your Details</h2>
            <TaxCalculatorForm onCalculate={setTaxResults} />
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-gray-800">Tax Comparison</h2>
            {taxResults ? (
              <TaxComparison results={taxResults} />
            ) : (
              <div className="flex items-center justify-center h-48 md:h-64 text-gray-500">
                <div className="text-center">
                  <Calculator className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm md:text-base">Fill in your details to see tax calculations</p>
                </div>
              )}
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 md:mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl md:rounded-2xl p-6 md:p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Updated Tax Slabs for AY 2025-26</h3>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Old Tax Regime</h4>
                <p className="text-sm opacity-90 mb-2">
                  Higher tax rates but allows various deductions under sections like 80C, 80D, etc.
                </p>
                <p className="text-xs opacity-80">
                  Standard Deduction: ₹50,000 | Rebate: ₹12,500 (up to ₹5L income)
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">New Tax Regime</h4>
                <p className="text-sm opacity-90 mb-2">
                  Lower tax rates with increased rebate but limited deductions allowed.
                </p>
                <p className="text-xs opacity-80">
                  Standard Deduction: ₹75,000 | Rebate: ₹60,000 (up to ₹12L income)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
