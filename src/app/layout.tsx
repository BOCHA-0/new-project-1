import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteSettings } from '@/lib/data';

const geistSans = { variable: '--font-geist-sans' };
const geistMono = { variable: '--font-geist-mono' };

export const metadata: Metadata = {
  title: siteSettings.seo.title,
  description: siteSettings.seo.description,
  keywords: siteSettings.seo.keywords,
  authors: [{ name: siteSettings.name }],
  openGraph: {
    title: siteSettings.seo.title,
    description: siteSettings.seo.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteSettings.seo.title,
    description: siteSettings.seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
