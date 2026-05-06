'use client';

import { getProductsByCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

export default function CategoryPageClient({ category, heading, sub }: { category: string; heading: string; sub: string }) {
  const products = getProductsByCategory(category);

  return (
    <div style={{ paddingTop: '120px' }}>
      <section style={{ padding: '4rem 2rem 3rem', textAlign: 'center', borderBottom: '1px solid rgba(201,168,76,0.15)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-subtitle">{sub}</p>
          <h1 className="section-title">{heading}</h1>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--sand-dark)', marginTop: '1rem' }}>
            {products.length} piece{products.length !== 1 ? 's' : ''} crafted for you
          </p>
        </motion.div>
      </section>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
