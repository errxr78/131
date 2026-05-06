import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: {
    default: 'AG Store — Egyptian Heritage Leather Goods',
    template: '%s | AG Store',
  },
  description:
    'Discover AG Store — premium Egyptian-heritage leather wallets, bags, and belts crafted with ancient artisan traditions. Shop wallets, bags, belts and new arrivals.',
  keywords: [
    'AG Store', 'Egyptian leather goods', 'luxury wallets', 'premium bags', 'Egyptian belts',
    'pharaoh leather', 'heritage accessories', 'Egyptian fashion', 'أجي ستور', 'محفظة جلد',
  ],
  openGraph: {
    title: 'AG Store — Egyptian Heritage Leather Goods',
    description: 'Premium leather goods rooted in Ancient Egyptian heritage.',
    type: 'website',
    locale: 'en_EG',
    siteName: 'AG Store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AG Store — Egyptian Heritage Leather Goods',
    description: 'Premium leather goods rooted in Ancient Egyptian heritage.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://agstore.eg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Montserrat:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'AG Store',
              description: 'Premium Egyptian Heritage Leather Goods',
              url: 'https://agstore.eg',
              sameAs: ['https://instagram.com/agstore', 'https://facebook.com/agstore'],
              potentialAction: { '@type': 'SearchAction', target: 'https://agstore.eg/shop?q={search_term_string}', 'query-input': 'required name=search_term_string' },
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        <CartDrawer />
        <main style={{ minHeight: '100vh', overflowX: 'hidden' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
