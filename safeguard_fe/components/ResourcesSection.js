'use client';

import { useState } from 'react';
import  {motion, AnimatePresence} from 'framer-motion';
import { Phone, Globe, MapPin, Heart, Shield, Sparkles, AlertCircle } from 'lucide-react';

export default function ResourcesSection() {
  const [selectedCountry, setSelectedCountry] = useState('KE');
  const [loading, setLoading] = useState(false);

 const countries = [
    { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
    { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
    { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
  ];

  const resources = {
    KE: [
      {
        name: 'Gender Violence Recovery Centre',
        phone: '+254703034000',
        website: 'https://gvrc.or.ke/',
        description: 'Medical and psychological support for GBV survivors.',
        category: 'medical',
      },
      {
        name: 'FIDA Kenya',
        phone: '+254202711535',
        website: 'https://fidakenya.org',
        description: 'Legal aid and support for women.',
        category: 'legal',
      },
      {
        name: 'Childline Kenya',
        phone: '116',
        website: 'https://childlinekenya.co.ke',
        description: 'National helpline for children affected by violence and abuse.',
        category: 'emergency',
      },
      {
        name: 'CREAW Kenya',
        phone: '0800720186',
        website: 'https://creawkenya.org',
        description: 'Rights-based organization supporting survivors of GBV.',
        category: 'support',
      },
    ],

    NG: [
      {
        name: 'Women at Risk International Foundation (WARIF)',
        phone: '+23480092100009',
        website: 'https://warifng.org',
        description: 'GBV prevention, rape crisis, and response services.',
        category: 'support',
      },
      {
        name: 'Mirabel Centre',
        phone: '+23408155770000',
        website: 'https://mirabelcentre.org',
        description: 'Sexual assault referral centre offering free medical and counseling support.',
        category: 'medical',
      },
      {
        name: 'National GBV Hotline (Nigeria)',
        phone: '08172702242',
        website: '',
        description: '24/7 national helpline for reporting GBV cases.',
        category: 'emergency',
      },
    ],

    ZA: [
      {
        name: 'GBV Command Centre',
        phone: '0800428428',
        website: '',
        description: '24/7 emergency support and counseling for GBV survivors.',
        category: 'emergency',
      },
      {
        name: 'TEARS Foundation South Africa',
        phone: '0800083277',
        website: 'https://tears.co.za',
        description: 'Support for survivors of rape and sexual abuse.',
        category: 'support',
      },
      {
        name: 'People Opposing Women Abuse (POWA)',
        phone: '0115916803',
        website: 'https://powa.co.za',
        description: 'Shelter, legal, and counseling services for abused women.',
        category: 'legal',
      },
    ],

    UG: [
      {
        name: 'Uganda Child Helpline',
        phone: '116',
        website: 'https://mglsd.go.ug',
        description: 'National toll-free helpline for child and women protection.',
        category: 'emergency',
      },
      {
        name: 'Uganda Women’s Network (UWONET)',
        phone: '+256759330000',
        website: 'https://uwonet.or.ug',
        description: 'Advocacy and support services for women survivors.',
        category: 'support',
      },
    ],

    TZ: [
      {
        name: 'Tanzania National GBV Helpline',
        phone: '116',
        website: '',
        description: 'Child and gender-based violence hotline.',
        category: 'emergency',
      },
      {
        name: 'Tanzania Gender Networking Programme',
        phone: '+255754784050',
        website: 'https://tgnp.or.tz',
        description: 'Support and advocacy for women and girls experiencing violence.',
        category: 'support',
      },
    ],

    GH: [
      {
        name: 'Ghana Domestic Violence & Victim Support Unit (DOVVSU)',
        phone: '+233302777395',
        website: '',
        description: 'Police-led support for victims of domestic and sexual violence.',
        category: 'emergency',
      },
      {
        name: 'ARK Foundation Ghana',
        phone: '+233243777773 ',
        website: 'https://arkfoundationghana.org',
        description: 'Shelter, legal, and counseling services for survivors.',
        category: 'support',
      },
    ],

    RW: [
      {
        name: 'Isange One Stop Center',
        phone: '116',
        website: 'https://npprwanda.gov.rw',
        description: 'Free medical, legal, and psychosocial support for GBV victims.',
        category: 'medical',
      },
    ],

    ET: [
      {
        name: 'Ethiopian Women Lawyers Association',
        phone: '+251-11-467-1750',
        website: 'https://ewlaethiopia.org',
        description: 'Legal assistance and advocacy for women survivors.',
        category: 'legal',
      },
      {
        name: 'Addis Ababa Women’s Shelter',
        phone: '+251-11-552-5995',
        website: '',
        description: 'Shelter and support services for abused women.',
        category: 'support',
      },
    ],

    ZM: [
      {
        name: 'Yamala Crisis Line Zambia',
        phone: '116',
        website: '',
        description: 'GBV hotline for women, girls, and children.',
        category: 'emergency',
      },
      {
        name: 'Women and Law in Southern Africa (WLSA Zambia)',
        phone: '+260-211-255-539',
        website: 'https://wlsazambia.org',
        description: 'Legal services and protection programs for women survivors.',
        category: 'legal',
      },
    ],

    ZW: [
      {
        name: 'Musasa Project',
        phone: '+263-24-279-303/4',
        website: 'https://musasa.co.zw',
        description: 'Counseling, shelters, and protection services for GBV survivors.',
        category: 'support',
      },
      {
        name: 'Zimbabwe National GBV Hotline',
        phone: '0808 00 33 333',
        website: '',
        description: '24/7 hotline for victims of gender-based violence.',
        category: 'emergency',
      },
    ],
  };

  // pick array for current country
  const countryResources = resources[selectedCountry] || [];
const getCategoryColor = (category) => {
    switch (category) {
      case 'emergency': return 'from-red-200 to-purple-600';
      case 'medical': return 'from-emerald-500 to-teal-600';
      case 'legal': return 'from-blue-500 to-indigo-600';
      case 'support': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section className="relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <Shield className="w-10 h-10 text-purple-400" />
          <h2 className="text-4xl font-bold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-purple-400">
            You&apos;re Not Alone
          </h2>
          <Heart className="w-10 h-10 text-purple-400 animate-pulse" />
        </div>
        <p className="max-w-3xl mx-auto text-xl text-gray-300">
          Confidential, free, 24/7 support services across Africa because safety is a human right.
        </p>
      </motion.div>

      {/* Country Selector - Futuristic Dropdown */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto mb-12"
      >
        <div className="relative group">
          <div className="absolute transition duration-500 -inset-1 bg-gradient-to-r from-purple-600 to-purple-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-90" />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="relative w-full px-8 py-6 text-lg font-medium text-white transition-all border appearance-none cursor-pointer bg-black/40 backdrop-blur-xl border-white/20 rounded-2xl hover:border-purple-400/50 focus:outline-none focus:ring-4 focus:ring-purple-500/30"
          >
            {countries.map((c) => (
                
              <option key={c.code} value={c.code} className="bg-gray-900">
                {c.flag} {c.name}
              </option>
              
              
            ))}
          </select>
          <Sparkles className="absolute w-6 h-6 text-purple-400 -translate-y-1/2 pointer-events-none right-6 top-1/2" />
        </div>
      </motion.div>


      {/* Resources Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCountry}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid gap-4 mx-auto md:grid-cols-2 lg:grid-cols-4 max-w-7xl"
        >
          {countryResources.length > 0 ? (
            countryResources.map((resource, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="relative group"
              >
                {/* Glow Background */}
                <div className="absolute transition duration-700 opacity-0 -inset-1 bg-gradient-to-br from-purple-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:opacity-100" />
                
                {/* Card */}
                <div className="relative h-full p-8 overflow-hidden border bg-white/10 backdrop-blur-2xl border-white/20 rounded-3xl">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl" />
                  
                  <div className="relative z-10">
                    <h3 className="mb-3 text-2xl font-bold text-white">
                      {resource.name}
                    </h3>
                    <p className="mb-6 leading-relaxed text-gray-300">
                      {resource.description}
                    </p>

                    {/* Category Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryColor(resource.category)} text-white text-sm font-semibold mb-6`}>
                      <AlertCircle className="w-4 h-4" />
                      {resource.category === 'emergency' ? '24/7 Emergency' :
                       resource.category === 'medical' ? 'Medical Help' :
                       resource.category === 'legal' ? 'Legal Aid' : 'Counseling & Shelter'}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                      {resource.phone && (
                        <a
                          href={`tel:${resource.phone}`}
                          className="flex items-center justify-center w-full gap-3 px-4 py-3 font-bold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 rounded-2xl hover:shadow-emerald-500/50"
                        >
                          <Phone className="w-5 h-5" />
                          <span className='md:hidden'>Call Now</span>{resource.phone}
                        </a>
                      )}

                      {resource.website && (
                        <a
                          href={resource.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full gap-3 px-4 py-3 font-medium text-white transition-all border bg-white/10 hover:bg-white/20 border-white/30 rounded-2xl"
                        >
                          <Globe className="w-5 h-5" />
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center col-span-full"
            >
              <Heart className="w-20 h-20 mx-auto mb-6 text-gray-600 opacity-50" />
              <p className="text-2xl text-gray-400">
                Resources coming soon for this country
              </p>
              <p className="mt-4 text-gray-500">
                We&apos;re actively expanding our network of trusted partners across Africa.
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
