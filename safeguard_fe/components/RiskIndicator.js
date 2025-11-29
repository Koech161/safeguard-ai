'use client';

import { AlertTriangle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function RiskIndicator({ riskLevel, confidence }) {
  const getRiskConfig = (level) => {
    switch (level.toLowerCase()) {
      case 'low':
        return {
          icon: CheckCircle,
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'risk-low',
          label: 'Low Risk'
        };
      case 'medium':
        return {
          icon: AlertCircle,
          color: 'text-yellow-600 dark:text-yellow-400',
          bgColor: 'risk-medium',
          label: 'Medium Risk'
        };
      case 'high':
        return {
          icon: AlertTriangle,
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'risk-high',
          label: 'High Risk'
        };
      case 'critical':
        return {
          icon: XCircle,
          color: 'text-purple-600 dark:text-purple-400',
          bgColor: 'risk-critical',
          label: 'Critical Risk'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-100 dark:bg-gray-800',
          label: 'Unknown Risk'
        };
    }
  };

  const config = getRiskConfig(riskLevel);
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-lg border-2 ${config.bgColor} animate-fade-in`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className={`h-8 w-8 ${config.color}`} />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {config.label}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Confidence: {confidence}%
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-bold ${config.color}`}>
            {riskLevel.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}