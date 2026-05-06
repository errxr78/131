'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { HeroSection } from '@/components/ui/feature-carousel';
import { PulseFitHero } from '@/components/ui/pulse-fit-hero';

const categories = [
  { id: 'wallets', name: 'Wallets', desc: 'Slim & structured', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80', href: '/shop/wallets' },
  { id: 'bags', name: 'Bags', desc: 'Day to evening', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80', href: '/shop/bags' },
  { id: 'belts', name: 'Belts', desc: 'Heritage buckles', img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80', href: '/shop/belts' },
  { id: 'new-arrivals', name: 'New Arrivals', desc: 'Fresh from the vault', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80', href: '/shop/new-arrivals' },
];

const testimonials = [
  { name: 'Layla Hassan', title: 'Architect, Cairo', text: 'The Pharaoh Bifold is stunning. You can feel the craftsmanship in every stitch. I\'ve never received so many compliments on an accessory.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { name: 'Omar Khalil', title: 'Creative Director, Dubai', text: 'AG Store perfectly bridges ancient Egyptian heritage with modern luxury. The Anubis Tote is my daily companion and conversation starter.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { name: 'Nour El-Din', title: 'Entrepreneur, Alexandria', text: 'Finally, a brand that honors our roots without being kitschy. The leather quality is unparalleled. Ordered three belts already.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
];

const instagramPosts = [
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
  'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80',
  'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&q=80',
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
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
          ],
          text: "Join over 10,000+ patrons",
        }}
        programs={[
          {
            image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
            category: "ESSENTIALS",
            title: "Heritage Wallets",
            onClick: () => window.location.href = '/shop/wallets',
          },
          {
            image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
            category: "MODERN",
            title: "Artisan Bags",
            onClick: () => window.location.href = '/shop/bags',
          },
          {
            image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
            category: "CLASSIC",
            title: "Signature Belts",
            onClick: () => window.location.href = '/shop/belts',
          },
          {
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
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
            src: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80',
            alt: 'Premium Leather Bag',
          },
          {
            src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80',
            alt: 'Patron wearing our accessories',
          },
          {
            src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=900&q=80',
            alt: 'Heritage Buckle Belt',
          },
          {
            src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
            alt: 'Patron with our leather goods',
          },
          {
            src: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=900&q=80',
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
