'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Star, Check, ChevronDown, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Product, useCartStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

interface Props {
  product: Product;
  related: Product[];
}

const reviewsData = [
  { name: 'Salma R.', rating: 5, date: 'March 2025', comment: 'Absolutely stunning craftsmanship. The leather quality is exceptional.' },
  { name: 'Ahmed K.', rating: 5, date: 'February 2025', comment: 'The hieroglyphic details are intricate and beautiful. Worth every pound.' },
  { name: 'Mariam G.', rating: 4, date: 'January 2025', comment: 'Superb quality, very fast shipping. Packaging itself feels luxurious.' },
];

export default function ProductDetailClient({ product, related }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');

  const { addItem, toggleWishlist, wishlist } = useCartStore();
  const isWishlisted = wishlist.includes(product.id);
  const images = product.images ?? [product.image];
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div style={{ paddingTop: '120px', maxWidth: '1400px', margin: '0 auto', padding: '120px 2rem 0' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--sand-dark)', textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.3s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--sand-dark)')}
        >Home</Link>
        <span style={{ color: 'var(--accent-dark)' }}>›</span>
        <Link href="/shop" style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--sand-dark)', textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.3s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--sand-dark)')}
        >Shop</Link>
        <span style={{ color: 'var(--accent-dark)' }}>›</span>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>{product.name}</span>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
        {/* Images */}
        <div>
          {/* Main image */}
          <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--bg-tertiary)', marginBottom: '1rem' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={images[selectedImage]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </AnimatePresence>
            {product.badge && (
              <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                <span className={product.badge === 'new' ? 'badge-new' : 'badge-sale'}>
                  {product.badge === 'new' ? 'New' : `Save ${savings.toLocaleString()} EGP`}
                </span>
              </div>
            )}
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  style={{ width: '80px', height: '80px', overflow: 'hidden', border: `2px solid ${i === selectedImage ? 'var(--accent-primary)' : 'transparent'}`, padding: 0, cursor: 'pointer', flexShrink: 0, transition: 'border-color 0.3s' }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            {product.category.replace('-', ' ')}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--sand)', marginBottom: '1rem', lineHeight: 1.2 }}>
            {product.name}
          </h1>

          {/* Rating */}
          {product.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating!) ? 'var(--accent-primary)' : 'transparent'} style={{ color: 'var(--accent-primary)' }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--sand-dark)' }}>{product.rating} ({product.reviews} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: 'var(--accent-primary)' }}>
              {product.price.toLocaleString()} EGP
            </span>
            {product.originalPrice && (
              <>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--sand-dark)', textDecoration: 'line-through', opacity: 0.6 }}>
                  {product.originalPrice.toLocaleString()} EGP
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--ruby)', background: 'rgba(139,26,26,0.15)', padding: '2px 8px', border: '1px solid rgba(139,26,26,0.3)' }}>
                  Save {savings.toLocaleString()} EGP
                </span>
              </>
            )}
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--sand-dark)', lineHeight: 1.8, marginBottom: '2rem', borderTop: '1px solid rgba(212,160,23,0.1)', paddingTop: '1.5rem' }}>
            {product.description}
          </p>

          {/* Color selector */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--sand)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Color: <span style={{ color: 'var(--accent-primary)' }}>{selectedColor}</span>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {product.colors.map((color) => (
                  <button key={color} onClick={() => setSelectedColor(color)}
                    style={{ padding: '0.4rem 1rem', border: `1px solid ${selectedColor === color ? 'var(--accent-primary)' : 'rgba(212,160,23,0.25)'}`, background: selectedColor === color ? 'rgba(212,160,23,0.1)' : 'transparent', color: selectedColor === color ? 'var(--accent-primary)' : 'var(--sand)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s', textTransform: 'uppercase' }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--sand)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Size: <span style={{ color: 'var(--accent-primary)' }}>{selectedSize}</span>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    style={{ padding: '0.4rem 0.9rem', border: `1px solid ${selectedSize === size ? 'var(--accent-primary)' : 'rgba(212,160,23,0.25)'}`, background: selectedSize === size ? 'rgba(212,160,23,0.1)' : 'transparent', color: selectedSize === size ? 'var(--accent-primary)' : 'var(--sand)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to cart */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(212,160,23,0.3)' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: '0.7rem 1rem', fontSize: '1.1rem' }}>−</button>
              <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--sand)', padding: '0 1rem', fontSize: '0.85rem', borderLeft: '1px solid rgba(212,160,23,0.2)', borderRight: '1px solid rgba(212,160,23,0.2)', minWidth: '50px', textAlign: 'center' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: '0.7rem 1rem', fontSize: '1.1rem' }}>+</button>
            </div>
            <button onClick={handleAddToCart} className="btn-primary" style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                {added ? <><Check size={16} /> Added to Cart</> : <><ShoppingBag size={16} /> Add to Cart</>}
              </span>
            </button>
            <button onClick={() => toggleWishlist(product.id)}
              style={{ background: isWishlisted ? 'rgba(212,160,23,0.1)' : 'transparent', border: `1px solid ${isWishlisted ? 'var(--accent-primary)' : 'rgba(212,160,23,0.3)'}`, color: isWishlisted ? 'var(--accent-primary)' : 'var(--sand)', cursor: 'pointer', padding: '0.7rem', display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}
              aria-label="Wishlist"
            >
              <Heart size={18} fill={isWishlisted ? 'var(--accent-primary)' : 'none'} />
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1.5rem 0', borderTop: '1px solid rgba(212,160,23,0.1)', borderBottom: '1px solid rgba(212,160,23,0.1)', marginBottom: '2rem' }}>
            {[
              { icon: '🚚', text: 'Free shipping over 2,000 EGP' },
              { icon: '↩️', text: '30-day returns' },
              { icon: '🔒', text: 'Secure checkout' },
              { icon: '✦', text: 'Authenticity guaranteed' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{icon}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--sand-dark)' }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div>
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(212,160,23,0.15)', marginBottom: '1.5rem' }}>
              {(['details', 'care', 'shipping'] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  style={{ padding: '0.75rem 1.5rem', border: 'none', borderBottom: `2px solid ${activeTab === tab ? 'var(--accent-primary)' : 'transparent'}`, background: 'none', color: activeTab === tab ? 'var(--accent-primary)' : 'var(--sand-dark)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'capitalize', cursor: 'pointer', transition: 'all 0.3s', marginBottom: '-1px' }}
                >
                  {tab === 'details' ? 'Details' : tab === 'care' ? 'Care' : 'Shipping'}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                {activeTab === 'details' && product.details && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', listStyle: 'none' }}>
                    {product.details.map((d) => (
                      <li key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--sand-dark)' }}>
                        <span style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }}>◆</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'care' && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', listStyle: 'none' }}>
                    {['Store in the dust bag when not in use', 'Condition with leather cream every 3 months', 'Avoid direct sunlight and moisture', 'Wipe clean with a dry cloth only', 'Stuff with tissue paper to maintain shape'].map((c) => (
                      <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--sand-dark)' }}>
                        <span style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }}>◆</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { label: 'Standard Delivery', info: '3–5 business days · 80 EGP (Free over 2,000 EGP)' },
                      { label: 'Express Delivery', info: '1–2 business days · 150 EGP' },
                      { label: 'Returns', info: '30-day return window. Item must be unused and in original packaging.' },
                    ].map(({ label, info }) => (
                      <div key={label} style={{ padding: '1rem', border: '1px solid rgba(212,160,23,0.15)', background: 'rgba(28,24,16,0.4)' }}>
                        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{label}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--sand-dark)' }}>{info}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section style={{ marginBottom: '5rem', padding: '3rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--sand)', marginBottom: '2rem' }}>
          Customer Reviews
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {reviewsData.map((r) => (
            <div key={r.name} style={{ padding: '1.5rem', border: '1px solid rgba(212,160,23,0.1)' }}>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '0.75rem' }}>
                {[...Array(r.rating)].map((_, i) => <Star key={i} size={12} fill="var(--accent-primary)" style={{ color: 'var(--accent-primary)' }} />)}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--sand)', fontStyle: 'italic', marginBottom: '1rem', lineHeight: 1.8 }}>
                &ldquo;{r.comment}&rdquo;
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--accent-muted)', textTransform: 'uppercase' }}>{r.name}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--sand-dark)', opacity: 0.6 }}>{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--sand)', marginBottom: '2rem', textAlign: 'center' }}>
            You May Also Like
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
