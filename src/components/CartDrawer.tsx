'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const total = getTotalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 200,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '480px',
              background: 'var(--bg-primary)',
              borderLeft: '1px solid rgba(0,0,0,0.12)',
              zIndex: 201,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '1.75rem 1.5rem',
                borderBottom: '1px solid rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Your Treasury
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  Shopping Cart
                </div>
              </div>
              <button
                onClick={closeCart}
                style={{ background: 'none', border: '1px solid rgba(0,0,0,0.3)', color: 'var(--accent-primary)', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-primary)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-primary)'; }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <ShoppingBag size={48} style={{ color: 'var(--accent-dark)', margin: '0 auto 1rem' }} />
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Your cart is empty
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Discover our curated collection of heritage pieces.
                  </p>
                  <Link href="/shop" className="btn-primary" onClick={closeCart}>
                    <span>Explore Collection</span>
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        padding: '1rem',
                        background: 'transparent',
                        border: '1px solid rgba(0,0,0,0.08)',
                      }}
                    >
                      {/* Image */}
                      <div style={{ width: '80px', height: '80px', flexShrink: 0, overflow: 'hidden', background: '#5A4F41' }}>
                        { }
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                          {item.name}
                        </div>
                        {(item.selectedSize || item.selectedColor) && (
                          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                            {item.selectedSize && `Size: ${item.selectedSize}`}
                            {item.selectedSize && item.selectedColor && ' · '}
                            {item.selectedColor && `Color: ${item.selectedColor}`}
                          </div>
                        )}
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
                          {item.price.toLocaleString()} EGP
                        </div>

                        {/* Qty + Remove */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.3)' }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: '4px 8px', display: 'flex', alignItems: 'center' }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', color: 'var(--text-primary)', padding: '0 0.75rem', borderLeft: '1px solid rgba(0,0,0,0.12)', borderRight: '1px solid rgba(0,0,0,0.12)' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: '4px 8px', display: 'flex', alignItems: 'center' }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', transition: 'color 0.3s', display: 'flex', alignItems: 'center' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#cc4444')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: '1.5rem',
                  borderTop: '1px solid rgba(0,0,0,0.12)',
                  flexShrink: 0,
                  background: 'transparent',
                }}
              >
                {/* Order summary */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Subtotal</span>
                    <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '0.85rem' }}>{total.toLocaleString()} EGP</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Shipping</span>
                    <span style={{ fontFamily: 'var(--font-heading)', color: total >= 2000 ? 'var(--accent-primary)' : 'var(--text-primary)', fontSize: '0.85rem' }}>
                      {total >= 2000 ? 'FREE' : '80 EGP'}
                    </span>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.12)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Total</span>
                    <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-primary)', fontSize: '1rem' }}>
                      {(total < 2000 ? total + 80 : total).toLocaleString()} EGP
                    </span>
                  </div>
                </div>
                <Link href="/checkout" className="btn-primary" style={{ width: '100%', display: 'flex', marginBottom: '0.75rem' }} onClick={closeCart}>
                  <span>Proceed to Checkout</span>
                </Link>
                <Link href="/cart" className="btn-outline" style={{ width: '100%', display: 'flex' }} onClick={closeCart}>
                  <span>View Full Cart</span>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
