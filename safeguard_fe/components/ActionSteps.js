'use client';

import React from 'react';
import { Shield, AlertTriangle, Heart, BookOpen } from 'lucide-react';

export default function ActionSteps({ actions, category, riskLevel = 'UNKNOWN' }) {
  // Fallback actions based on risk level and category
  const getFallbackActions = (cat, level) => {
    const baseActions = [
      'Document all messages and take screenshots',
      'Block the sender on all platforms',
      'Report the content to platform moderators',
      'Reach out to trusted friends or family'
    ];

    const highRiskActions = [
      'Contact local authorities or emergency services',
      'Inform trusted contacts about the situation',
      'Avoid being alone if you feel unsafe',
      'Seek immediate support from local organizations'
    ];

    const threatActions = [
      'Take all threats seriously and document them',
      'Contact local law enforcement immediately',
      'Increase personal security measures',
      'Share your location with trusted contacts'
    ];

    const sexualHarassmentActions = [
      'Do not engage with the harasser',
      'Save all evidence including screenshots',
      'Report to platform safety teams',
      'Contact sexual assault support services'
    ];

    const cyberbullyingActions = [
      'Limit social media exposure temporarily',
      'Adjust privacy settings on all accounts',
      'Seek emotional support from trusted people',
      'Consider professional counseling if needed'
    ];

    let fallbackActions = [...baseActions];

    if (level === 'HIGH' || level === 'CRITICAL') {
      fallbackActions = [...highRiskActions];
    }

    if (cat.includes('Threat') || cat.includes('Violence')) {
      fallbackActions = [...threatActions];
    } else if (cat.includes('Sexual')) {
      fallbackActions = [...sexualHarassmentActions];
    } else if (cat.includes('Cyberbullying') || cat.includes('Harassment')) {
      fallbackActions = [...cyberbullyingActions];
    }

    return fallbackActions.slice(0, 4); // Return max 4 actions
  };

  // Filter out empty actions and use fallback if needed
  const validActions = actions && Array.isArray(actions)
    ? actions.filter(action =>
      action &&
      action.trim() !== '' &&
      action.length > 2 &&
      action !== 'IMMEDIATE_ACTIONS:' &&
      !action.includes('IMMEDIATE_ACTIONS')
    )
    : [];

  // Use fallback actions if no valid actions are provided
  const displayActions = validActions.length > 0
    ? validActions.slice(0, 4)
    : getFallbackActions(category, riskLevel);

  const getCategoryIcon = (cat) => {
    if (!cat) return BookOpen;
    if (cat.includes('Threat') || cat.includes('Violence')) return AlertTriangle;
    if (cat.includes('Sexual')) return Shield;
    if (cat.includes('Mental') || cat.includes('Emotional')) return Heart;
    return BookOpen;
  };

  let iconElement;
  const iconComponent = getCategoryIcon(category);
  iconElement = React.createElement(iconComponent, { className: "w-6 h-6 text-purple-600" });

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 animate-fade-in">
      <div className="flex items-center mb-4 space-x-3">
        {iconElement}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Immediate Actions Recommended
        </h3>
        {validActions.length === 0 && (
          <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-200">
            General Guidance
          </span>
        )}
      </div>

      {displayActions.length === 0 ? (
        <div className="py-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No specific actions available. Please contact local support services for assistance.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {displayActions.map((action, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">
                  {index + 1}
                </span>
              </div>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {action}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}