'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

type Step = 'information' | 'shipping' | 'payment';
const steps: Step[] = ['information', 'shipping', 'payment'];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>('information');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', governorate: '', zip: '',
    shippingMethod: 'standard',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
    promoCode: '',
  });

  const { items, getTotalPrice, clearCart } = useCartStore();
  const total = getTotalPrice();
  const shipping = form.shippingMethod === 'express' ? 150 : total >= 2000 ? 0 : 80;
  const grandTotal = total + shipping;

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', maxWidth: '500px', padding: '3rem 2rem' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,0,0,0.1)', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}
          >
            <Check size={36} style={{ color: 'var(--accent-primary)' }} />
          </motion.div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Order Confirmed!</h1>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Thank you for your order. You will receive a confirmation email at <strong style={{ color: 'var(--accent-primary)' }}>{form.email}</strong> shortly. Your pharaoh pieces are being prepared.
          </p>
          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid rgba(0,0,0,0.12)', marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Order Total</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)' }}>{grandTotal.toLocaleString()} EGP</p>
          </div>
          <Link href="/shop" className="btn-primary"><span>Continue Shopping</span></Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.15em', textDecoration: 'none' }} className="text-accent-gradient">AG STORE</Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            {steps.map((step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: currentStep === step ? 'var(--accent-primary)' : steps.indexOf(currentStep) > i ? 'var(--accent-dark)' : 'rgba(0,0,0,0.12)', border: `1px solid ${steps.indexOf(currentStep) >= i ? 'var(--accent-primary)' : 'rgba(0,0,0,0.12)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s' }}>
                    {steps.indexOf(currentStep) > i ? <Check size={14} style={{ color: 'var(--accent-light)' }} /> : <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: steps.indexOf(currentStep) >= i ? 'var(--text-primary)' : 'var(--text-muted)' }}>{i + 1}</span>}
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'capitalize', color: currentStep === step ? 'var(--accent-primary)' : 'var(--text-muted)' }}>{step}</span>
                </div>
                {i < steps.length - 1 && <div style={{ width: '40px', height: '1px', background: steps.indexOf(currentStep) > i ? 'var(--accent-primary)' : 'rgba(0,0,0,0.12)', transition: 'background 0.4s' }} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '3rem', alignItems: 'start' }} className="checkout-grid">
          {/* Form */}
          <div>
            <AnimatePresence mode="wait">
              {currentStep === 'information' && (
                <motion.form key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  onSubmit={(e) => { e.preventDefault(); setCurrentStep('shipping'); }}
                >
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Contact Information</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    {[['firstName', 'First Name'], ['lastName', 'Last Name']].map(([k, label]) => (
                      <div key={k}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label}</label>
                        <input required className="input-egyptian" value={(form as any)[k]} onChange={(e) => update(k, e.target.value)} placeholder={label} />
                      </div>
                    ))}
                  </div>
                  {[['email', 'Email Address', 'email'], ['phone', 'Phone Number', 'tel']].map(([k, label, type]) => (
                    <div key={k} style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label}</label>
                      <input required className="input-egyptian" type={type} value={(form as any)[k]} onChange={(e) => update(k, e.target.value)} placeholder={label} />
                    </div>
                  ))}
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-primary)', margin: '2rem 0 1.5rem' }}>Shipping Address</h2>
                  {[['address', 'Street Address'], ['city', 'City'], ['governorate', 'Governorate'], ['zip', 'Postal Code']].map(([k, label]) => (
                    <div key={k} style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label}</label>
                      <input required className="input-egyptian" value={(form as any)[k]} onChange={(e) => update(k, e.target.value)} placeholder={label} />
                    </div>
                  ))}
                  <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                    <span>Continue to Shipping</span>
                  </button>
                </motion.form>
              )}

              {currentStep === 'shipping' && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Shipping Method</h2>
                  {[
                    { value: 'standard', label: 'Standard Delivery', time: '3–5 business days', price: total >= 2000 ? 'FREE' : '80 EGP' },
                    { value: 'express', label: 'Express Delivery', time: '1–2 business days', price: '150 EGP' },
                  ].map((opt) => (
                    <div key={opt.value} onClick={() => update('shippingMethod', opt.value)}
                      style={{ padding: '1.25rem', border: `1px solid ${form.shippingMethod === opt.value ? 'var(--accent-primary)' : 'rgba(0,0,0,0.12)'}`, background: form.shippingMethod === opt.value ? 'rgba(0,0,0,0.05)' : 'transparent', cursor: 'pointer', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${form.shippingMethod === opt.value ? 'var(--accent-primary)' : 'rgba(0,0,0,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {form.shippingMethod === opt.value && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }} />}
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>{opt.label}</p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{opt.time}</p>
                        </div>
                      </div>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: opt.value === 'standard' && total >= 2000 ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{opt.price}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button onClick={() => setCurrentStep('information')} className="btn-outline" style={{ flex: 1 }}><span>← Back</span></button>
                    <button onClick={() => setCurrentStep('payment')} className="btn-primary" style={{ flex: 2 }}><span>Continue to Payment</span></button>
                  </div>
                </motion.div>
              )}

              {currentStep === 'payment' && (
                <motion.form key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handlePlaceOrder}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Payment Details</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)' }}>
                    <Lock size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Your payment information is encrypted and secure</span>
                  </div>
                  {[['cardName', 'Name on Card', 'text'], ['cardNumber', 'Card Number', 'text']].map(([k, label, type]) => (
                    <div key={k} style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label}</label>
                      <input required className="input-egyptian" type={type} value={(form as any)[k]} onChange={(e) => update(k, e.target.value)} placeholder={label} />
                    </div>
                  ))}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    {[['expiry', 'MM / YY'], ['cvv', 'CVV']].map(([k, placeholder]) => (
                      <div key={k}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{k === 'expiry' ? 'Expiry' : 'CVV'}</label>
                        <input required className="input-egyptian" value={(form as any)[k]} onChange={(e) => update(k, e.target.value)} placeholder={placeholder} maxLength={k === 'cvv' ? 3 : 7} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={() => setCurrentStep('shipping')} className="btn-outline" style={{ flex: 1 }}><span>← Back</span></button>
                    <button type="submit" className="btn-primary" style={{ flex: 2 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Lock size={14} /> Place Order · {grandTotal.toLocaleString()} EGP</span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary sidebar */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(0,0,0,0.12)', padding: '2rem', position: 'sticky', top: '120px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img src={item.image} alt={item.name} style={{ width: '52px', height: '52px', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', background: 'var(--accent-primary)', color: 'var(--text-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '0.6rem', fontWeight: 700 }}>{item.quantity}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.05em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>{item.name}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: 'var(--accent-primary)', flexShrink: 0 }}>{(item.price * item.quantity).toLocaleString()} EGP</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Subtotal</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: 'var(--text-primary)' }}>{total.toLocaleString()} EGP</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Shipping</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: shipping === 0 ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{shipping === 0 ? 'FREE' : `${shipping} EGP`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--accent-primary)' }}>{grandTotal.toLocaleString()} EGP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 900px) { .checkout-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
