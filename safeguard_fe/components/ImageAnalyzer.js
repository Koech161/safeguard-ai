'use client';

import { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, AlertCircle, FileImage } from 'lucide-react';
import RiskIndicator from './RiskIndicator';
import ActionSteps from './ActionSteps';
import  {BackendUrl} from '@/utils/proxy'

export default function ImageAnalyzer() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError('');
    setResult(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const analyzeImage = async () => {
    if (!file) {
      setError('Please select an image file');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(`${BackendUrl}/analyze/image/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResult(response.data);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload screenshot or image containing text
        </label>
        
        {!preview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-12 text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:border-gray-600 hover:border-purple-400"
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">
              Drop your screenshot here or click to upload
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Supports PNG, JPG, JPEG up to 5MB
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto rounded-lg shadow-md max-h-64"
              />
              <button
                onClick={() => {
                  setFile(null);
                  setPreview('');
                }}
                className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
              >
                <AlertCircle className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={analyzeImage}
              disabled={loading}
              className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-purple-400"
            >
              {loading ? (
                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
              ) : (
                <FileImage className="w-5 h-5" />
              )}
              <span>{loading ? 'Analyzing Image...' : 'Analyze Image Content'}</span>
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center px-4 py-3 space-x-2 text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900 dark:border-red-800 dark:text-red-300">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-fade-in">
          {result.detected_text && (
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                Detected Text:
              </h4>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {result.detected_text}
              </p>
            </div>
          )}

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
          />
        </div>
      )}
    </div>
  );
}