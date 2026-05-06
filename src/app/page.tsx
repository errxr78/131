'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { HeroSection } from '@/components/ui/feature-carousel';
import { PulseFitHero } from '@/components/ui/pulse-fit-hero';

const categories = [
  { id: 'wallets', name: 'Wallets', desc: 'Slim & structured', img: '/images/product-2.jpeg', href: '/shop/wallets' },
  { id: 'bags', name: 'Bags', desc: 'Day to evening', img: '/images/product-3.jpeg', href: '/shop/bags' },
  { id: 'belts', name: 'Belts', desc: 'Heritage buckles', img: '/images/product-4.jpg', href: '/shop/belts' },
  { id: 'new-arrivals', name: 'New Arrivals', desc: 'Fresh from the vault', img: '/images/product-5.jpg', href: '/shop/new-arrivals' },
];

const testimonials = [
  { name: 'Layla Hassan', title: 'Architect, Cairo', text: 'The Pharaoh Bifold is stunning. You can feel the craftsmanship in every stitch. I\'ve never received so many compliments on an accessory.', rating: 5, avatar: '/images/product-6.jpg' },
  { name: 'Omar Khalil', title: 'Creative Director, Dubai', text: 'AG Store perfectly bridges ancient Egyptian heritage with modern luxury. The Anubis Tote is my daily companion and conversation starter.', rating: 5, avatar: '/images/product-7.jpg' },
  { name: 'Nour El-Din', title: 'Entrepreneur, Alexandria', text: 'Finally, a brand that honors our roots without being kitschy. The leather quality is unparalleled. Ordered three belts already.', rating: 5, avatar: '/images/product-8.jpg' },
];

const instagramPosts = [
  '/images/product-9.jpg',
  '/images/product-1.jpg',
  '/images/product-2.jpeg',
  '/images/product-3.jpeg',
  '/images/product-4.jpg',
  '/images/product-5.jpg',
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <PulseFitHero
        title="Wear the Legacy"
        subtitle="Leather goods born from centuries of Egyptian artisan mastery. Each piece is a tribute to heritage, crafted for the modern sovereign."
        primaryAction={{
          label: "Explore Collection",
          onClick: () => window.location.href = '/shop',
        }}
        disclaimer="*Handcrafted in Cairo, Egypt"
        socialProof={{
          avatars: [
            "/images/product-6.jpg",
            "/images/product-7.jpg",
            "/images/product-8.jpg",
          ],
          text: "Join over 10,000+ patrons",
        }}
        programs={[
          {
            image: "/images/product-9.jpg",
            category: "ESSENTIALS",
            title: "Heritage Wallets",
            onClick: () => window.location.href = '/shop/wallets',
          },
          {
            image: "/images/product-1.jpg",
            category: "MODERN",
            title: "Artisan Bags",
            onClick: () => window.location.href = '/shop/bags',
          },
          {
            image: "/images/product-2.jpeg",
            category: "CLASSIC",
            title: "Signature Belts",
            onClick: () => window.location.href = '/shop/belts',
          },
          {
            image: "/images/product-3.jpeg",
            category: "EXCLUSIVE",
            title: "New Arrivals",
            onClick: () => window.location.href = '/shop/new-arrivals',
          },
        ]}
      />

      {/* ─── MARQUEE STRIP ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--accent-primary)', padding: '0.9rem 0', overflow: 'hidden' }}>
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '0 2rem', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#FFFFFF', textTransform: 'uppercase', whiteSpace: 'nowrap', fontWeight: 700 }}>
              <span>Heritage Leather</span>
              <span>✦</span>
              <span className="ar" style={{ fontFamily: 'var(--font-arabic)', letterSpacing: '0.05em' }}>جلد أصيل</span>
              <span>✦</span>
              <span>Handcrafted in Egypt</span>
              <span>✦</span>
              <span className="ar" style={{ fontFamily: 'var(--font-arabic)', letterSpacing: '0.05em' }}>صُنع في مصر</span>
              <span>✦</span>
              <span>Free Shipping Over 2000 EGP</span>
              <span>✦</span>
              <span className="ar" style={{ fontFamily: 'var(--font-arabic)', letterSpacing: '0.05em' }}>شحن مجاني فوق ٢٠٠٠ ج</span>
              <span>✦</span>
              <span>New Arrivals Weekly</span>
              <span>✦</span>
              <span className="ar" style={{ fontFamily: 'var(--font-arabic)', letterSpacing: '0.05em' }}>وصول أسبوعي</span>
              <span>✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ─── CATEGORY GRID ───────────────────────────────────────────── */}
      <section style={{ padding: 'var(--section-padding) 2rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-subtitle">Shop by Category</p>
            <h2 className="section-title">The Royal Collection</h2>
            <p className="ar" style={{ fontFamily: 'var(--font-arabic)', color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>المجموعة الملكية</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={cat.href} style={{ textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: 'var(--bg-tertiary)' }}
                  className="product-card"
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)', transition: 'transform 0.7s ease, filter 0.5s ease', position: 'absolute', inset: 0 }}
                    onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.08)'; (e.target as HTMLImageElement).style.filter = 'brightness(0.45)'; }}
                    onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; (e.target as HTMLImageElement).style.filter = 'brightness(0.6)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,4,0.9) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', right: '1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{cat.desc}</p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--sand)', marginBottom: '0.75rem' }}>{cat.name}</h3>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                      Shop Now <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ───────────────────────────────────────── */}
      <section style={{ padding: '0 2rem var(--section-padding)', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: 'var(--section-padding)' }}>
            <p className="section-subtitle">Hand-Picked for You</p>
            <h2 className="section-title">Featured Pieces</h2>
            <p className="ar" style={{ fontFamily: 'var(--font-arabic)', color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>قطع مختارة بعناية</p>
            <div className="hieroglyph-divider" style={{ maxWidth: '300px', margin: '1.5rem auto 0' }}>
              <span style={{ color: 'var(--accent-primary)', fontSize: '1rem' }}>𓂀</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/shop" className="btn-outline">
              <span>View All Products</span>
            </Link>
          </div>
        </div>
      </section>





      {/* ─── FEATURE CAROUSEL ────────────────────────────────────────────── */}
      <HeroSection
        title={
          <>
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-400">Patrons</span> Love
          </>
        }
        subtitle="Explore the pieces that have defined our legacy and captured the hearts of modern sovereigns everywhere."
        images={[
          {
            src: '/images/product-4.jpg',
            alt: 'Premium Leather Bag',
          },
          {
            src: '/images/product-5.jpg',
            alt: 'Patron wearing our accessories',
          },
          {
            src: '/images/product-6.jpg',
            alt: 'Heritage Buckle Belt',
          },
          {
            src: '/images/product-7.jpg',
            alt: 'Patron with our leather goods',
          },
          {
            src: '/images/product-8.jpg',
            alt: 'Structured Wallet',
          },
        ]}
      />

      {/* ─── INSTAGRAM GRID ──────────────────────────────────────────── */}
      <section style={{ padding: '0 0 var(--section-padding)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-subtitle">Follow the Journey</p>
          <h2 className="section-title">@AGStore</h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--sand-dark)', marginTop: '0.5rem' }}>
            Tag us with <span style={{ color: 'var(--accent-primary)' }}>#AGPharaoh</span> to be featured
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0 }}>
          {instagramPosts.map((src, i) => (
            <a key={i} href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', aspectRatio: '1', overflow: 'hidden', position: 'relative' }}
            >
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease, filter 0.4s ease', filter: 'brightness(0.8) saturate(0.7)' }}
                onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.08)'; (e.target as HTMLImageElement).style.filter = 'brightness(1) saturate(1)'; }}
                onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; (e.target as HTMLImageElement).style.filter = 'brightness(0.8) saturate(0.7)'; }}
              />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
