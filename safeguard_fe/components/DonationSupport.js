'use client';

import { useState } from 'react';
import { Heart, Smartphone, CreditCard, CheckCircle, XCircle, Loader } from 'lucide-react';
import { BackendUrl} from '@/utils/proxy'
export default function DonationSupport() {
  const [activeMethod, setActiveMethod] = useState('mpesa');
  const [amount, setAmount] = useState('5.00');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paypalUrl, setPaypalUrl] = useState('');

  const presetAmounts = [
    
    { value: '1.00', label: '$1' },
    { value: '5.00', label: '$5' },
    { value: '10.00', label: '$10' },
    { value: '25.00', label: '$25' },
    { value: '50.00', label: '$50' },
    { value: '100.00', label: '$100' }
  ];

  const mpesaInstructions = [
    'Go to M-Pesa on your phone',
    'Select "Lipa Na M-Pesa"',
    'Select "Pay Bill"',
    'Enter Business No: 247247',
    'Enter Account No: 0748111111',
    'Enter the amount you wish to donate',
    'Enter your M-Pesa PIN',
    'Confirm payment'
  ];

  const handleMpesaDonation = async () => {
    if (!phoneNumber.trim()) {
      setPaymentStatus({ type: 'error', message: 'Please enter your phone number' });
      return;
    }

    setIsProcessing(true);
    setPaymentStatus(null);

    // Simulate M-Pesa payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus({ 
        type: 'success', 
        message: `Thank you! M-Pesa payment request sent to ${phoneNumber}. Please complete the transaction on your phone.` 
      });
      setPhoneNumber('');
    }, 2000);
  };

  const handlePaypalDonation = async () => {
    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      const response = await fetch(`${BackendUrl}/paypal/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `amount=${amount}`
      });

      const data = await response.json();
      
      if (data.approval_url) {
        // Redirect to PayPal
        window.location.href = data.approval_url;
      } else {
        setPaymentStatus({ type: 'error', message: data.error || 'Failed to create payment' });
      }
    } catch (error) {
      setPaymentStatus({ type: 'error', message: 'Connection error. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDonation = () => {
    if (activeMethod === 'mpesa') {
      handleMpesaDonation();
    } else {
      handlePaypalDonation();
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4 space-x-3">
          <Heart className="w-10 h-10 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Support Our Mission
          </h2>
        </div>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Your donation helps us continue providing free digital safety tools and support 
          for women and girls across Africa. Every contribution makes a difference.
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="flex gap-4 p-4 mb-6 rounded-lg bg-gray-50 dark:bg-gray-700">
        <button
          onClick={() => setActiveMethod('mpesa')}
          className={`flex items-center justify-center flex-1 space-x-3 px-6 py-4 rounded-lg font-medium transition-all ${
            activeMethod === 'mpesa'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
          }`}
        >
          <Smartphone size={24} />
          <span>M-Pesa (Kenya)</span>
        </button>
        
        <button
          onClick={() => setActiveMethod('paypal')}
          className={`flex items-center justify-center flex-1 space-x-3 px-6 py-4 rounded-lg font-medium transition-all ${
            activeMethod === 'paypal'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
          }`}
        >
          <CreditCard size={24} />
          <span>PayPal (International)</span>
        </button>
      </div>

      {/* Amount Selection */}
      <div className="mb-6">
        <label className="block mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Donation Amount
        </label>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {presetAmounts.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setAmount(preset.value)}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                amount === preset.value
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Or enter custom amount (USD)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter amount"
          />
        </div>
      </div>

      {/* Payment Method Specific Forms */}
      {activeMethod === 'mpesa' && (
        <div className="p-6 mb-6 border border-green-200 bg-green-50 dark:bg-green-900 rounded-xl dark:border-green-800">
          <div className="flex items-center mb-4 space-x-3">
            <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
              M-Pesa Donation
            </h3>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-green-800 dark:text-green-200">
              Your M-Pesa Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g., 0748111111"
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-800 dark:border-green-700 dark:text-white"
            />
          </div>

          <div className="p-4 bg-white rounded-lg dark:bg-green-800">
            <h4 className="mb-3 font-semibold text-green-800 dark:text-green-200">
              M-Pesa Payment Instructions:
            </h4>
            <ol className="space-y-2 text-sm text-green-700 dark:text-green-300">
              {mpesaInstructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-600 rounded-full">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
            
            <div className="p-3 mt-4 rounded-lg bg-yellow-50 dark:bg-yellow-900">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Business Number:</strong> 247247<br />
                <strong>Account Number:</strong> 0748111111
              </p>
            </div>
          </div>
        </div>
      )}

      {activeMethod === 'paypal' && (
        <div className="p-6 mb-6 border border-blue-200 bg-blue-50 dark:bg-blue-900 rounded-xl dark:border-blue-800">
          <div className="flex items-center mb-4 space-x-3">
            <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
              PayPal Donation
            </h3>
          </div>
          
          <p className="mb-4 text-blue-700 dark:text-blue-300">
            You will be redirected to PayPal to complete your donation of <strong>${amount} USD</strong>. 
            PayPal supports credit cards and bank transfers.
          </p>
          
          <div className="p-4 bg-white rounded-lg dark:bg-blue-800">
            <h4 className="mb-2 font-semibold text-blue-800 dark:text-blue-200">
              Why donate via PayPal?
            </h4>
            <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
              <li>• Secure international payments</li>
              <li>• Credit card and bank transfer support</li>
              <li>• Instant processing</li>
              <li>• Receipt provided immediately</li>
            </ul>
          </div>
        </div>
      )}

      {/* Donation Button */}
      <button
        onClick={handleDonation}
        disabled={isProcessing || (activeMethod === 'mpesa' && !phoneNumber.trim())}
        className="flex items-center justify-center w-full px-8 py-4 space-x-3 font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Heart className="w-5 h-5" />
            <span>Donate ${amount}</span>
          </>
        )}
      </button>

      {/* Payment Status */}
      {paymentStatus && (
        <div className={`flex items-center space-x-3 p-4 mt-4 rounded-lg ${
          paymentStatus.type === 'success' 
            ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {paymentStatus.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <p>{paymentStatus.message}</p>
        </div>
      )}

      {/* Impact Message */}
      <div className="p-6 mt-6 border border-purple-200 bg-purple-50 dark:bg-purple-900 rounded-xl dark:border-purple-800">
        <h3 className="mb-3 text-lg font-semibold text-purple-800 dark:text-purple-200">
          Your Impact
        </h3>
        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">100+</div>
            <div className="text-purple-700 dark:text-purple-300">Women Protected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">24/7</div>
            <div className="text-purple-700 dark:text-purple-300">Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Free</div>
            <div className="text-purple-700 dark:text-purple-300">Always Free Service</div>
          </div>
        </div>
        <p className="mt-4 text-sm text-purple-700 dark:text-purple-300">
          Your donation helps maintain our AI systems, provide resources, and expand our reach 
          to protect more women and girls from digital abuse across Africa.
        </p>
      </div>
    </div>
  );
}