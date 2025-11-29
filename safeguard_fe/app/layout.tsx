import type { Metadata } from "next";
import { Jost} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '700'], 
  variable: '--font-jost', 
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SafeguardAI - Digital Abuse Protection for Women & Girls",
  description: "AI-powered tool to detect and prevent digital abuse against women and girls across Africa. Real-time analysis, safety resources, and support for online harassment.",
  keywords: "digital safety, online harassment, GBV, women protection, cyberbullying, AI safety, Africa, gender-based violence",
  authors: [{ name: "SafeguardAI Team" }],
  creator: "SafeguardAI",
  publisher: "SafeguardAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://safeguardai-murex.vercel.app/'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: "SafeguardAI - Building Safer Digital Spaces",
    description: "AI-powered protection against digital abuse for women and girls across Africa",
    url: 'https://safeguardai-murex.vercel.app/',
    siteName: 'SafeguardAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SafeguardAI - Digital Abuse Protection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SafeguardAI - Digital Abuse Protection",
    description: "AI-powered tool to detect and prevent digital abuse against women and girls",
    images: ['/twitter-image.png'],
    creator: '@safeguard_ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification tokens here
    // google: 'your-google-verification-token',
    // yandex: 'your-yandex-verification-token',
    // yahoo: 'your-yahoo-verification-token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.className} antialiased`}
      >
        <ThemeProvider>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
