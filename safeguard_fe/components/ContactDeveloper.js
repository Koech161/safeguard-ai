'use client';

import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

export default function ContactDeveloper() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email anytime',
      value: 'koechabel161@gmail.com',
      link: 'mailto:koechabel161@gmail.com',
      color: 'bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-400',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon - Fri, 9am - 5pm EAT',
      value: '+254 748 512 459',
      link: 'tel:+254748512459',
      color: 'bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-400',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Quick chat support',
      value: '+254 748 512 459',
      link: 'https://wa.me/254748512459',
      color: 'bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-400',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Contact the Developer
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
            Have questions, feedback, or need technical support? We&apos;d love to hear from you. 
            Get in touch through any of the channels below.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${method.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {method.title}
                      </h3>
                      <p className="mb-3 text-gray-600 dark:text-gray-400">
                        {method.description}
                      </p>
                      <p className="mb-4 font-mono text-sm text-gray-700 dark:text-gray-300">
                        {method.value}
                      </p>
                      <a
                        href={method.link}
                        target={method.link.startsWith('http') ? '_blank' : '_self'}
                        rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className={`inline-flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors ${method.buttonColor}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>Contact via {method.title}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="p-6 mt-8 bg-purple-50 dark:bg-purple-900 rounded-xl">
            <div className="flex items-center mb-3 space-x-3">
              <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                Based in Kenya
              </h3>
            </div>
            <p className="text-purple-700 dark:text-purple-300">
              Serving users across Africa with dedicated support for digital safety 
              and gender-based violence prevention. We&apos;re committed to making digital 
              spaces safer for women and girls.
            </p>
          </div>

          {/* Response Time Info */}
          <div className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Response Time:</strong> We typically respond within 2-4 hours during business days (9am - 5pm EAT).
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "What kind of support do you provide?",
                answer: "Technical support for the platform, feature requests, bug reports, and general inquiries about digital safety."
              },
              {
                question: "Do you provide emergency support?",
                answer: "For immediate danger, please contact local emergency services. We provide technical and guidance support for digital safety issues."
              },
              {
                question: "Can I suggest new features?",
                answer: "Absolutely! We welcome all suggestions to improve SafeguardAI and better serve our community."
              },
              {
                question: "Is my information secure?",
                answer: "Yes, we take privacy seriously. All communications are confidential and we don't store personal data unnecessarily."
              },
              {
                question: "What are your support hours?",
                answer: "We're available Monday to Friday, 9:00 AM to 5:00 PM East Africa Time (EAT)."
              },
              {
                question: "Do you provide training or workshops?",
                answer: "Yes, we offer digital safety workshops and training sessions. Contact us to discuss your needs."
              }
            ].map((faq, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}