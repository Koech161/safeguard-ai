'use client';

import { useState } from 'react';
import axios from 'axios';
import { Send, AlertCircle } from 'lucide-react';
import RiskIndicator from './RiskIndicator';
import ActionSteps from './ActionSteps';
import  {BackendUrl} from '@/utils/proxy'

export default function TextAnalyzer() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const analyzeText = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${BackendUrl}/analyze/text/`, {
        text: text,
        language: 'en'
      });
     
      
      setResult(response.data);
    } catch (err) {
      setError('Failed to analyze text. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="text-input" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Paste suspicious text, messages, or comments
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste any message, comment, or text you'd like to analyze for abusive content..."
          className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {text.length} characters
          </span>
          <button
            onClick={analyzeText}
            disabled={loading || !text.trim()}
            className="flex items-center px-6 py-3 space-x-2 font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-purple-400"
          >
            {loading ? (
              <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>{loading ? 'Analyzing...' : 'Analyze Text'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center px-4 py-3 space-x-2 text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900 dark:border-red-800 dark:text-red-300">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-fade-in">
          <RiskIndicator 
            riskLevel={result.risk_level} 
            confidence={result.confidence} 
          />
          
          <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
              Analysis Explanation
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              {result.explanation}
            </p>
            <div className="p-3 mt-4 rounded-lg bg-purple-50 dark:bg-purple-900">
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Category: {result.category}
              </span>
            </div>
          </div>

          <ActionSteps 
            actions={result.immediate_actions} 
            category={result.category} 
            riskLevel={result.risk_level}
          />
        </div>
      )}
    </div>
  );
}