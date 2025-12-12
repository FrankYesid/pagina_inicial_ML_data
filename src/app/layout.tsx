import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/lib/suppress-warnings";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ML Academy - Machine Learning e Inteligencia Artificial",
  description: "Plataforma educativa completa sobre Machine Learning e Inteligencia Artificial. Aprende conceptos fundamentales, procesos y aplicaciones prácticas.",
  keywords: ["Machine Learning", "Inteligencia Artificial", "IA", "ML", "Educación", "Talentotech", "Python", "Data Science"],
  authors: [{ name: "ML Academy Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ML Academy - Machine Learning e Inteligencia Artificial",
    description: "Plataforma educativa completa sobre Machine Learning e Inteligencia Artificial",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ML Academy - Machine Learning e Inteligencia Artificial",
    description: "Plataforma educativa completa sobre Machine Learning e Inteligencia Artificial",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Suppress extension warnings in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args[0]?.toString() || '';
      
      if (message.includes('data-new-gr-c-s-check-loaded') || 
          message.includes('data-gr-ext-installed') ||
          message.includes('Grammarly') ||
          message.includes('extension') ||
          message.includes('chrome-extension') ||
          message.includes('moz-extension')) {
        return;
      }
      
      originalConsoleError.apply(console, args);
    };
    
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      const message = args[0]?.toString() || '';
      
      if (message.includes('data-new-gr-c-s-check-loaded') || 
          message.includes('data-gr-ext-installed') ||
          message.includes('Grammarly') ||
          message.includes('extension') ||
          message.includes('chrome-extension') ||
          message.includes('moz-extension')) {
        return;
      }
      
      originalConsoleWarn.apply(console, args);
    };
  }

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning={true}
      >
        <div id="root">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
