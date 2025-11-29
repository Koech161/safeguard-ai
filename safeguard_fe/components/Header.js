'use client';

import { Shield } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-purple-200 dark:border-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Safeguard<span className="text-purple-600">AI</span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                AI-Powered Digital Abuse Protection
              </p>
            </div>
          </div>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}