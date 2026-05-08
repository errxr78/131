'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Grid2X2, LayoutList } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'wallets', label: 'Wallets' },
  { id: 'bags', label: 'Bags' },
  { id: 'belts', label: 'Belts' },
  { id: 'new-arrivals', label: 'New Arrivals' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(4);

  const filtered = products
    .filter((p) => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortBy === 'newest') return (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div style={{ paddingTop: '120px' }}>
      {/* Header */}
      <section style={{ padding: '4rem 2rem 2rem', textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <p className="section-subtitle">Curated Selection</p>
        <h1 className="section-title">The Collection</h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', marginTop: '1rem', fontSize: '1.05rem' }}>
          {filtered.length} piece{filtered.length !== 1 ? 's' : ''} of Egyptian heritage
        </p>
      </section>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Filters bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          {/* Category tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '0.5rem 1.25rem',
                  border: '1px solid',
                  borderColor: activeCategory === cat.id ? 'var(--accent-primary)' : 'rgba(0,0,0,0.15)',
                  background: activeCategory === cat.id ? 'var(--accent-primary)' : 'transparent',
                  color: activeCategory === cat.id ? 'var(--text-primary)' : 'var(--text-primary)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontWeight: 700,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(0,0,0,0.3)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[4, 3].map((cols) => (
                <button
                  key={cols}
                  onClick={() => setGridCols(cols)}
                  style={{ background: gridCols === cols ? 'var(--accent-primary)' : 'transparent', border: '1px solid rgba(0,0,0,0.3)', color: gridCols === cols ? 'var(--text-primary)' : 'var(--accent-muted)', padding: '0.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {cols === 4 ? <Grid2X2 size={14} /> : <LayoutList size={14} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${gridCols === 4 ? '240px' : '300px'}, 1fr))`,
            gap: '1.5rem',
          }}
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--text-muted)' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
