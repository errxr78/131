'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  const shipping = total >= 2000 ? 0 : 80;

  return (
    <div style={{ paddingTop: '120px', minHeight: '70vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-subtitle">Your Selection</p>
          <h1 className="section-title">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <ShoppingBag size={64} style={{ color: 'var(--accent-dark)', margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Your cart is empty</h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', marginBottom: '2rem' }}>Begin your journey through the royal collection.</p>
            <Link href="/shop" className="btn-primary"><span>Explore Collection</span></Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '3rem', alignItems: 'start' }} className="cart-grid">
            {/* Items */}
            <div>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.12)' }}>
                {items.map((item, i) => (
                  <motion.div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '1.5rem', padding: '1.5rem 0', borderBottom: '1px solid rgba(0,0,0,0.08)', alignItems: 'start' }}
                  >
                    <Link href={`/product/${item.id}`}>
                      <img src={item.image} alt={item.name} style={{ width: '100px', height: '120px', objectFit: 'cover', display: 'block' }} />
                    </Link>
                    <div>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--accent-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{item.category.replace('-', ' ')}</p>
                      <Link href={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', letterSpacing: '0.05em', color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{item.name}</h3>
                      </Link>
                      {item.selectedColor && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Color: {item.selectedColor}</p>}
                      {item.selectedSize && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Size: {item.selectedSize}</p>}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.3)', width: 'fit-content' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center' }}><Minus size={12} /></button>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', color: 'var(--text-primary)', padding: '0 0.75rem', borderLeft: '1px solid rgba(0,0,0,0.12)', borderRight: '1px solid rgba(0,0,0,0.12)' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center' }}><Plus size={12} /></button>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-primary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>{(item.price * item.quantity).toLocaleString()} EGP</p>
                      <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#cc4444')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-muted)', textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent-muted)')}
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Summary */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(0,0,0,0.12)', padding: '2rem', position: 'sticky', top: '120px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Order Summary</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{total.toLocaleString()} EGP</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}>Shipping</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: shipping === 0 ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{shipping === 0 ? 'FREE' : `${shipping} EGP`}</span>
                </div>
                {total < 2000 && (
                  <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--accent-muted)' }}>
                      Add {(2000 - total).toLocaleString()} EGP more for free shipping
                    </p>
                    <div style={{ marginTop: '0.5rem', height: '3px', background: 'rgba(0,0,0,0.1)', borderRadius: '2px' }}>
                      <div style={{ height: '100%', width: `${Math.min((total / 2000) * 100, 100)}%`, background: 'var(--accent-primary)', borderRadius: '2px', transition: 'width 0.5s' }} />
                    </div>
                  </div>
                )}
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.12)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--accent-primary)' }}>{(total + shipping).toLocaleString()} EGP</span>
                </div>
              </div>
              <Link href="/checkout" className="btn-primary" style={{ width: '100%', display: 'flex', marginBottom: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Proceed to Checkout <ArrowRight size={14} /></span>
              </Link>
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', opacity: 0.6 }}>
                  🔒 Secure Encrypted Checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @media (max-width: 768px) { .cart-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
