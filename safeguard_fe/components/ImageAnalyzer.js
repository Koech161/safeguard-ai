'use client';

import { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, AlertCircle, FileImage, CheckCircle, X } from 'lucide-react';
import RiskIndicator from './RiskIndicator';
import ActionSteps from './ActionSteps';
import { BackendUrl } from '@/utils/proxy'

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

export default function ImageAnalyzer() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (selectedFile) => {
    // Check file type
    if (!ACCEPTED_FORMATS.includes(selectedFile.type)) {
      setError(`Invalid file format. Accepted formats: ${ACCEPTED_EXTENSIONS.join(', ')}`);
      return false;
    }

    // Check file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
      setError(`File is too large (${sizeMB}MB). Maximum size is 20MB.`);
      return false;
    }

    return true;
  };

  const handleFileSelect = (selectedFile) => {
    setError('');
    setResult(null);

    if (!validateFile(selectedFile)) {
      return;
    }

    setFile(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
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
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`p-12 text-center transition-all border-2 border-dashed rounded-lg cursor-pointer ${dragActive
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
              }`}
          >
            <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors ${dragActive ? 'text-purple-500' : 'text-gray-400'}`} />
            <p className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">
              {dragActive ? 'Drop your image here' : 'Drag and drop your image or click to upload'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Supported formats: PNG, JPG, JPEG, WebP, GIF (Max 20MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_EXTENSIONS.map(ext => `.${ext.replace('.', '')}`).join(',')}
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
                  setError('');
                }}
                className="absolute p-2 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-2 left-2 px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-full flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>Selected</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">File:</span> {file.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Size:</span> {(file.size / 1024).toFixed(2)} KB / 20000 KB
              </p>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 text-sm text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              Choose Different Image
            </button>

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
        <div className="flex items-start px-4 py-3 space-x-3 text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900 dark:border-red-800 dark:text-red-300">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Upload Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
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