'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product, useCartStore } from '@/lib/store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, toggleWishlist, wishlist } = useCartStore();
  const [hovered, setHovered] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Image Container */}
      <div className="card-img" style={{ position: 'relative', aspectRatio: '3/4', background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
        <Link href={`/product/${product.id}`}>
          { }
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <div
            style={{ position: 'absolute', top: '1rem', left: '1rem' }}
          >
            <span className={product.badge === 'new' ? 'badge-new' : 'badge-sale'}>
              {product.badge === 'new' ? 'New' : 'Sale'}
            </span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: isWishlisted ? 'var(--accent-primary)' : 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(0,0,0,0.3)',
            color: isWishlisted ? '#FFFFFF' : 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
            backdropFilter: 'blur(4px)',
          }}
          aria-label="Add to wishlist"
        >
          <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick add overlay */}
        <div
          className="card-overlay"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0) 100%)',
            padding: '1.5rem 1rem',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <button
            onClick={() => addItem(product)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              background: 'var(--accent-primary)',
              border: 'none',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent-primary)')}
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div style={{ padding: '1rem 0.5rem' }}>
        {/* Category */}
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--accent-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          {product.category.replace('-', ' ')}
        </div>

        {/* Name */}
        <Link
          href={`/product/${product.id}`}
          style={{ textDecoration: 'none' }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  fill={i < Math.floor(product.rating!) ? 'var(--accent-primary)' : 'transparent'}
                  style={{ color: 'var(--accent-primary)' }}
                />
              ))}
            </div>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              ({product.reviews})
            </span>
          </div>
        )}

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--accent-primary)' }}>
            {product.price.toLocaleString()} EGP
          </span>
          {product.originalPrice && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through', opacity: 0.6 }}>
              {product.originalPrice.toLocaleString()} EGP
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
