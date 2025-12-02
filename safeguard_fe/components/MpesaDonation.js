'use client';

import { useState } from 'react';
import { Smartphone, Copy, CheckCircle, Heart, Shield, Users } from 'lucide-react';

export default function MpesaDonation() {
  const [copiedField, setCopiedField] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const mpesaSteps = [
    {
      step: 1,
      instruction: 'Go to M-Pesa on your phone',
      icon: '📱'
    },
    {
      step: 2,
      instruction: 'Select "Lipa Na M-Pesa"',
      icon: '💳'
    },
    {
      step: 3,
      instruction: 'Select "Buy Goods and Services"',
      icon: '🏢'
    },
    {
      step: 4,
      instruction: 'Enter Till Number',
      details: '8458034',
      copyable: true,
      field: 'till'
    },

    {
      step: 5,
      instruction: 'Enter Amount',
      details: 'Any amount you wish to donate',
      example: 'e.g., 100, 500, 1000'
    },
    {
      step: 6,
      instruction: 'Enter your M-Pesa PIN',
      icon: '🔒'
    },

  ];

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handlePaymentDone = () => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 5000);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4 space-x-3">
          <Heart className="w-10 h-10 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Support SafeguardAI via M-Pesa
          </h2>
        </div>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Your donation helps us protect women and girls from digital abuse across Africa.
          Every contribution makes a difference.
        </p>
      </div>

      {/* Payment Information Card */}
      <div className="p-6 mb-8 border border-green-200 bg-green-50 dark:bg-green-900 rounded-xl dark:border-green-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
              M-Pesa Payment Details
            </h3>
          </div>
          <div className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-full">
            Till Number
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-white rounded-lg dark:bg-green-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-800 dark:text-green-200">Till Number</span>
              <button
                onClick={() => copyToClipboard('8458034', 'till')}
                className="flex items-center px-2 py-1 space-x-1 text-xs text-green-600 bg-green-100 rounded hover:bg-green-200 dark:bg-green-700 dark:text-green-300"
              >
                {copiedField === 'till' ? (
                  <CheckCircle size={14} />
                ) : (
                  <Copy size={14} />
                )}
                <span>{copiedField === 'till' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">8458034</div>
          </div>

          {/* <div className="p-4 bg-white rounded-lg dark:bg-green-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-800 dark:text-green-200">Account Number</span>
              <button
                onClick={() => copyToClipboard('SAFEGUARD', 'account')}
                className="flex items-center px-2 py-1 space-x-1 text-xs text-green-600 bg-green-100 rounded hover:bg-green-200 dark:bg-green-700 dark:text-green-300"
              >
                {copiedField === 'account' ? (
                  <CheckCircle size={14} />
                ) : (
                  <Copy size={14} />
                )}
                <span>{copiedField === 'account' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">SAFEGUARD</div>
          </div> */}
        </div>

        {/* <div className="p-4 mt-4 rounded-lg bg-yellow-50 dark:bg-yellow-900">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Note:</strong> Use &quot;SAFEGUARD&quot; as the account number when prompted. 
            The name &quot;SAFEGUARD AI&quot; should appear for confirmation before you enter your PIN.
          </p>
        </div> */}
      </div>

      {/* Step-by-Step Instructions */}
      <div className="mb-8">
        <h3 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
          Payment Instructions
        </h3>

        <div className="space-y-4">
          {mpesaSteps.map((step) => (
            <div
              key={step.step}
              className="flex items-start p-4 space-x-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex items-center justify-center shrink-0 w-8 h-8 text-white bg-green-600 rounded-full">
                {step.icon || step.step}
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {step.instruction}
                </p>

                {step.details && (
                  <div className="flex items-center justify-between mt-2">
                    <div className="px-3 py-1 font-mono text-sm text-gray-800 bg-white rounded dark:bg-gray-600 dark:text-gray-200">
                      {step.details}
                    </div>

                    {step.copyable && (
                      <button
                        onClick={() => copyToClipboard(step.details, step.field)}
                        className="flex items-center px-2 py-1 space-x-1 text-xs text-green-600 bg-green-100 rounded hover:bg-green-200 dark:bg-green-700 dark:text-green-300"
                      >
                        {copiedField === step.field ? (
                          <CheckCircle size={12} />
                        ) : (
                          <Copy size={12} />
                        )}
                        <span>{copiedField === step.field ? 'Copied!' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                )}

                {step.example && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {step.example}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Amounts */}
      <div className="p-6 mb-8 border border-purple-200 bg-purple-50 dark:bg-purple-900 rounded-xl dark:border-purple-800">
        <h3 className="mb-4 text-xl font-bold text-purple-800 dark:text-purple-200">
          Suggested Donation Amounts
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { amount: 'KSh 100', desc: 'Basic Support' },
            { amount: 'KSh 500', desc: 'Regular Support' },
            { amount: 'KSh 1,000', desc: 'Substantial Help' },
            { amount: 'KSh 5,000', desc: 'Major Impact' }
          ].map((suggestion, index) => (
            <div
              key={index}
              className="p-4 text-center bg-white rounded-lg dark:bg-purple-800"
            >
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {suggestion.amount}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">
                {suggestion.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Message */}
      <div className="p-6 mb-8 border border-blue-200 bg-blue-50 dark:bg-blue-900 rounded-xl dark:border-blue-800">
        <h3 className="mb-4 text-xl font-bold text-blue-800 dark:text-blue-200">
          How Your Donation Helps
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="font-semibold text-blue-800 dark:text-blue-200">AI Protection</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Maintain our abuse detection systems</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="font-semibold text-blue-800 dark:text-blue-200">Support Services</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Provide resources and guidance</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="font-semibold text-blue-800 dark:text-blue-200">Community Reach</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Expand to protect more women</div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Button */}
      <div className="text-center">
        <button
          onClick={handlePaymentDone}
          className="px-8 py-4 font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
        >
          I&apos;ve Completed My M-Pesa Payment
        </button>

        {showConfirmation && (
          <div className="flex items-center justify-center p-3 mt-4 space-x-2 rounded-lg bg-green-50 dark:bg-green-900">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-green-700 dark:text-green-300">
              Thank you for your generous support! Your donation helps make digital spaces safer.
            </p>
          </div>
        )}
      </div>


    </div>
  );
}