
import { useState } from 'react';
import { Calculator } from 'lucide-react';
import TaxCalculatorForm from '@/components/TaxCalculatorForm';
import TaxComparison from '@/components/TaxComparison';
import { TaxCalculationResult } from '@/types/tax';

const Index = () => {
  const [taxResults, setTaxResults] = useState<TaxCalculationResult | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Indian Income Tax Calculator</h1>
              <p className="text-gray-600">Compare Old vs New Tax Regime (AY 2024-25)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Enter Your Details</h2>
            <TaxCalculatorForm onCalculate={setTaxResults} />
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Tax Comparison</h2>
            {taxResults ? (
              <TaxComparison results={taxResults} />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Fill in your details to see tax calculations</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">About Indian Tax Regimes</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Old Tax Regime</h4>
                <p className="text-sm opacity-90">
                  Higher tax rates but allows various deductions under sections like 80C, 80D, etc.
                  Suitable for those with significant investments and deductions.
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">New Tax Regime</h4>
                <p className="text-sm opacity-90">
                  Lower tax rates but limited deductions allowed.
                  Beneficial for those with fewer investments and deductions.
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
