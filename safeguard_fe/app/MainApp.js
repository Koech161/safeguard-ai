'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import TextAnalyzer from '../components/TextAnalyzer';
import ImageAnalyzer from '../components/ImageAnalyzer';
import ResourcesSection from '../components/ResourcesSection';
import SafetyTips from '../components/SafetyTips';
import ContactDeveloper from '../components/ContactDeveloper'
import { 
  Shield, 
  MessageSquare, 
  Image, 
  Heart, 
  Sparkles,
  Zap,
  Lock,
  Globe,
  ChevronRight
} from 'lucide-react';

export default function MainApp() {
  const [activeTab, setActiveTab] = useState('text');

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900" />
        <div className="absolute inset-0 bg-black/50" />
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
          />
        ))}
      </div>

      <div className="min-h-screen text-white bg-black/40 backdrop-blur-3xl">
        <Header />

        {/* Hero Section - Futuristic & Empowering */}
        <section className="relative px-6 pt-32 pb-24 overflow-hidden">
          <div className="relative z-10 mx-auto text-center max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold leading-tight text-transparent md:text-7xl bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400">
                You Are Not Alone.<br />
                <span className="text-4xl md:text-6xl">We See. We Protect.</span>
              </h1>
              
              <p className="max-w-4xl mx-auto mt-8 text-xl leading-relaxed text-gray-300 md:text-2xl">
                Advanced African-trained AI that instantly detects digital harassment, threats, 
                manipulation, and abuse then arms you with real, safe next steps.
              </p>
            </motion.div>

            {/* Trust Badges - Floating Cards */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              {[
                { icon: Shield, text: "Military-Grade Encryption", color: "from-emerald-500 to-teal-600" },
                { icon: Heart, text: "Anonymous & Trauma-Informed", color: "from-purple-500 to-purple-600" },
                { icon: Zap, text: "Real-Time African Context AI", color: "from-purple-500 to-indigo-600" },
                { icon: Globe, text: "Supports 20+ African Languages", color: "from-blue-500 to-cyan-600" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-r opacity-70 blur-xl group-hover:blur-2xl"
                    style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                  />
                  <div className={`relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 flex items-center gap-3 min-w-max`}>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color}`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16"
            >
              <p className="mb-8 text-lg text-gray-400">
                Paste a message or upload a screenshot. Our AI analyzes it in seconds.
              </p>
              <div className="inline-flex items-center gap-3 text-purple-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span>Safe • Instant • Free</span>
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Analysis Section - Glass Cards */}
        <section className="px-6 pb-24 mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden border shadow-2xl bg-white/10 backdrop-blur-2xl rounded-3xl border-white/20"
          >
            {/* Futuristic Tab Bar */}
            <div className="flex border-b border-white/10">
              {[
                { id: 'text', icon: MessageSquare, label: 'Analyze Text' },
                { id: 'image', icon: Image, label: 'Analyze Screenshot' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-3 px-8 py-6 font-semibold transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'text-purple-400' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <tab.icon className="w-6 h-6" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-500"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'text' ? <TextAnalyzer /> : <ImageAnalyzer />}
            </div>
          </motion.div>

          <div className="mt-16">
            <ResourcesSection />
          </div>

          <div className="mt-16">
            <SafetyTips />
          </div>

          <div className="mt-16">
            <ContactDeveloper/>
          </div>
        </section>

        {/* Footer - Cyber Empowerment */}
        <footer className="relative py-20 border-t bg-gradient-to-t from-black/80 via-purple-900/20 to-transparent border-white/10">
          <div className="px-6 mx-auto text-center max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <Shield className="w-12 h-12 text-purple-400" strokeWidth={1.5} />
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
                  Safeguard<span className="text-purple-400">AI</span>
                </h2>
              </div>

              <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-300">
                Built by Africans, for Africans. Every detection helps train stronger protection for our sisters tomorrow.
              </p>

              <a
                href="/donate"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-3 px-8 py-5 font-bold text-white transition-all duration-300 rounded-full shadow-2xl bg-gradient-to-r from-purple-600 to-purple-600 hover:from-purple-500 hover:to-purple-500 hover:shadow-purple-500/50 hover:scale-105"
              >
                <Lock className="w-5 h-5" />
                Support This Mission
                <ChevronRight className="w-5 h-5" />
              </a>

              <p className="mt-12 text-sm text-gray-500">
                Made with fierce love ❤️ in Africa • {new Date().getFullYear()}
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
}