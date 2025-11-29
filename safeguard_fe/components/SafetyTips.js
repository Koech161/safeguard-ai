'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, Heart, Users, Lock, Smartphone, Phone, Globe, MapPin } from 'lucide-react';

export default function SafetyTips() {
  const [activeCategory, setActiveCategory] = useState('immediate');

  // GBV-focused safety tips data
  const safetyTips = {
    immediate: {
      title: 'Immediate Safety Planning',
      icon: AlertTriangle,
      tips: [
        'Identify safe places to go in an emergency - friends, family, or shelters',
        'Keep important documents (ID, bank cards) in a safe, accessible place',
        'Save emergency contacts on speed dial and memorize key numbers',
        'Plan escape routes from your home and workplace',
        'Keep a charged phone with emergency credit at all times',
        'Establish a code word with trusted people to signal danger',
        'Pack an emergency bag with essentials and keep it hidden',
        'Identify neighbors you can trust in case of emergency',
        'Know the location of your local police station and hospital',
        'Practice your safety plan regularly'
      ]
    },
    digital: {
      title: 'Digital Safety for GBV',
      icon: Shield,
      tips: [
        'Use private browsing mode and clear history if your device is shared',
        'Create separate email accounts for sensitive communications',
        'Use app locks and hidden folders for safety-related apps',
        'Disable location sharing and GPS on your devices',
        'Use secure messaging apps with disappearing messages for sensitive talks',
        'Regularly check for spyware or tracking apps on your phone',
        'Use different passwords for different accounts and change them regularly',
        'Be cautious with cloud storage - it may be accessible to others',
        'Document all abusive messages, calls, and emails with timestamps',
        'Use public computers at libraries for sensitive research if needed'
      ]
    },
    legal: {
      title: 'Legal Protection & Evidence',
      icon: Lock,
      tips: [
        'Keep detailed records of all incidents with dates, times, and evidence',
        'Take screenshots of abusive messages before blocking the person',
        'Save voicemails and record threatening calls if legally permitted',
        'Document any injuries with photos and medical reports',
        'Know your rights regarding protection orders in your country',
        'Keep copies of police reports and case numbers',
        'Save evidence in multiple secure locations (cloud, USB, trusted friend)',
        'Contact local legal aid services for free legal advice',
        'Understand the digital evidence laws in your jurisdiction',
        'Keep a journal of incidents for court proceedings'
      ]
    },
    support: {
      title: 'Seeking Support',
      icon: Heart,
      tips: [
        'Reach out to local GBV shelters and support organizations',
        'Contact national domestic violence hotlines for immediate guidance',
        'Connect with support groups for survivors of gender-based violence',
        'Seek counseling or therapy from trauma-informed professionals',
        'Talk to trusted friends or family members about your situation',
        'Contact workplace support services if available',
        'Reach out to religious or community leaders you trust',
        'Use anonymous helplines if you need confidential advice',
        'Connect with online support communities for additional resources',
        'Remember you are not alone - many organizations want to help'
      ]
    },
    financial: {
      title: 'Financial Safety',
      icon: Users,
      tips: [
        'Open a separate bank account in your name only',
        'Keep some emergency cash in a safe, accessible place',
        'Secure important financial documents separately',
        'Monitor your credit report for suspicious activity',
        'Change online banking passwords regularly',
        'Inform your bank about your situation for additional security',
        'Keep records of shared assets and financial transactions',
        'Contact social services about available financial assistance',
        'Explore employment assistance programs for economic independence',
        'Create a budget for independent living if planning to leave'
      ]
    },
    children: {
      title: 'Protecting Children',
      icon: Smartphone,
      tips: [
        'Educate children about safe online behavior and digital boundaries',
        'Monitor children\'s online activities and friend lists',
        'Use parental controls appropriately without being overly restrictive',
        'Create safety plans with older children for emergency situations',
        'Keep children\'s documents and medical records secure',
        'Talk to schools about safety protocols and trusted contacts',
        'Establish code words with children for unsafe situations',
        'Ensure children know emergency numbers and safe adults to contact',
        'Document any concerning behavior or incidents involving children',
        'Seek specialized support services for children exposed to GBV'
      ]
    }
  };

  
  const categories = Object.keys(safetyTips);

  return (
    <div className="p-8 bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          GBV Safety Planning & Resources
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Comprehensive safety guidance and support resources for survivors of gender-based violence
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => {
          const Icon = safetyTips[category].icon;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeCategory === category
                  ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon size={18} />
              <span className="capitalize">{category.replace('_', ' ')}</span>
            </button>
          );
        })}
      </div>

      {/* Tips Display */}
      <div className="p-6 bg-purple-50 dark:bg-purple-900 rounded-xl animate-fade-in">
        <div className="flex items-center mb-6 space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-800">
            {(() => {
              const Icon = safetyTips[activeCategory].icon;
              return <Icon className="w-6 h-6 text-purple-600 dark:text-purple-300" />;
            })()}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {safetyTips[activeCategory].title}
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {safetyTips[activeCategory].tips.map((tip, index) => (
            <div
              key={index}
              className="flex items-start p-4 space-x-3 transition-shadow bg-white rounded-lg shadow-sm dark:bg-gray-800 hover:shadow-md"
            >
              <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 bg-purple-100 rounded-full dark:bg-purple-900">
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">
                  {index + 1}
                </span>
              </div>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>


      {/* Emergency Action Section */}
      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
        <div className="p-6 border border-red-200 bg-red-50 dark:bg-red-900 rounded-xl dark:border-red-800">
          <div className="flex items-center mb-4 space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            <h3 className="text-xl font-bold text-red-800 dark:text-red-200">
              Immediate Danger Protocol
            </h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <p className="text-red-700 dark:text-red-300">Call local emergency services immediately</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <p className="text-red-700 dark:text-red-300">Get to a safe location if possible</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <p className="text-red-700 dark:text-red-300">Contact trusted friends or family</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <p className="text-red-700 dark:text-red-300">Go to the nearest hospital if injured</p>
            </div>
          </div>
        </div>

        <div className="p-6 border border-green-200 bg-green-50 dark:bg-green-900 rounded-xl dark:border-green-800">
          <div className="flex items-center mb-4 space-x-3">
            <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
              Emotional Support
            </h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <p className="text-green-700 dark:text-green-300">You deserve to feel safe and respected</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <p className="text-green-700 dark:text-green-300">GBV is never your fault</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <p className="text-green-700 dark:text-green-300">Healing takes time - be patient with yourself</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <p className="text-green-700 dark:text-green-300">Professional support can help with recovery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Reminder */}
      <div className="p-4 mt-6 text-center rounded-lg bg-blue-50 dark:bg-blue-900">
        <p className="text-blue-800 dark:text-blue-200">
          <strong>Remember:</strong> You have the right to live free from violence and fear. 
          Support is available, and you don&apos;t have to go through this alone.
        </p>
      </div>
    </div>
  );
}