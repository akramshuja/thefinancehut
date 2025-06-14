
import { useState } from 'react';
import { Calculator, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SipCalculatorForm from '@/components/SipCalculatorForm';
import SipResults from '@/components/SipResults';
import { SipResult } from '@/types/sip';
import { Button } from '@/components/ui/button';

const SipCalculator = () => {
  const [sipResults, setSipResults] = useState<SipResult | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="p-2 bg-green-600 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SIP Calculator</h1>
              <p className="text-gray-600">Calculate your SIP & Lump Sum investment returns</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Investment Details</h2>
            <SipCalculatorForm onCalculate={setSipResults} />
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Investment Results</h2>
            {sipResults ? (
              <SipResults result={sipResults} />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Fill in your investment details to see projected returns</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Investment Tips</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">SIP Benefits</h4>
                <p className="text-sm opacity-90 mb-2">
                  Systematic Investment Plans help in rupee cost averaging and reduce market timing risks.
                </p>
                <p className="text-xs opacity-80">
                  Start early and stay consistent for better long-term wealth creation.
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Lump Sum Benefits</h4>
                <p className="text-sm opacity-90 mb-2">
                  Ideal when you have surplus funds and want to take advantage of market conditions.
                </p>
                <p className="text-xs opacity-80">
                  Best suited for investors with good market timing and risk appetite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;
