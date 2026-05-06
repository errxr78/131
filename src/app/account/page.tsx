'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, Package, Heart, LogOut, Settings, ChevronRight, Star } from 'lucide-react';

type Tab = 'overview' | 'orders' | 'wishlist' | 'settings';

const mockOrders = [
  { id: 'AG-20250301', date: 'March 1, 2025', items: ['Pharaoh Bifold Wallet', 'Eye of Horus Belt'], total: 2048, status: 'Delivered' },
  { id: 'AG-20250115', date: 'January 15, 2025', items: ['Anubis Leather Tote'], total: 3499, status: 'Delivered' },
  { id: 'AG-20241205', date: 'December 5, 2024', items: ['Nile Cardholder', 'Ankh Canvas Belt'], total: 1098, status: 'Delivered' },
];

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isLoggedIn) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '420px', padding: '3rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="section-subtitle">{isRegistering ? 'Create Account' : 'Welcome Back'}</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-primary)' }}>
              {isRegistering ? 'Join the Inner Circle' : 'Your Royal Account'}
            </h1>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(0,0,0,0.12)', padding: '2.5rem' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, var(--accent-dark), var(--accent-primary), var(--accent-dark))' }} />
            {isRegistering && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Full Name</label>
                <input className="input-egyptian" placeholder="Your full name" />
              </div>
            )}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Email Address</label>
              <input className="input-egyptian" type="email" value={loginForm.email} onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))} placeholder="your@email.com" />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Password</label>
              <input className="input-egyptian" type="password" value={loginForm.password} onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))} placeholder="••••••••" />
            </div>
            {!isRegistering && (
              <div style={{ textAlign: 'right', marginBottom: '1.5rem', marginTop: '-0.75rem' }}>
                <button style={{ background: 'none', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--accent-muted)', cursor: 'pointer', textDecoration: 'underline' }}>Forgot password?</button>
              </div>
            )}
            <button onClick={() => setIsLoggedIn(true)} className="btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
              <span>{isRegistering ? 'Create Account' : 'Sign In'}</span>
            </button>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button onClick={() => setIsRegistering(!isRegistering)} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textDecoration: 'underline' }}>
                {isRegistering ? 'Sign in' : 'Register'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div style={{ paddingTop: '120px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '3rem', alignItems: 'start' }} className="account-grid">
          {/* Sidebar */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(0,0,0,0.12)', padding: '2rem', position: 'sticky', top: '120px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-dark), var(--accent-primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <User size={28} style={{ color: 'var(--text-primary)' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', letterSpacing: '0.1em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>Royal Member</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--accent-muted)' }}>member@agstore.eg</p>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '2rem' }}>
              {tabs.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setTab(id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: 'none', background: tab === id ? 'rgba(0,0,0,0.08)' : 'transparent', borderLeft: `2px solid ${tab === id ? 'var(--accent-primary)' : 'transparent'}`, color: tab === id ? 'var(--accent-primary)' : 'var(--text-muted)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s', textAlign: 'left', width: '100%' }}
                >
                  <Icon size={15} />
                  {label}
                  {tab === id && <ChevronRight size={12} style={{ marginLeft: 'auto' }} />}
                </button>
              ))}
            </nav>
            <button onClick={() => setIsLoggedIn(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: 'none', background: 'transparent', color: '#666', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'color 0.3s', width: '100%' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#cc4444')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
            >
              <LogOut size={15} /> Sign Out
            </button>
          </div>

          {/* Main content */}
          <div>
            {tab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Welcome back, Royal Member</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                  {[{ label: 'Total Orders', value: '3' }, { label: 'Total Spent', value: '6,645 EGP' }, { label: 'Wishlist', value: '4 Items' }, { label: 'Loyalty Points', value: '665 pts' }].map(({ label, value }) => (
                    <div key={label} style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid rgba(0,0,0,0.1)', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{value}</div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</div>
                    </div>
                  ))}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Recent Orders</h3>
                {mockOrders.slice(0, 2).map((order) => (
                  <div key={order.id} style={{ padding: '1.25rem', border: '1px solid rgba(0,0,0,0.08)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{order.id}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{order.date} · {order.items.join(', ')}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'inline-block', padding: '0.2rem 0.75rem', background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.3)', fontFamily: 'var(--font-heading)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>{order.status}</span>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>{order.total.toLocaleString()} EGP</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            {tab === 'orders' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Order History</h2>
                {mockOrders.map((order) => (
                  <div key={order.id} style={{ padding: '1.5rem', border: '1px solid rgba(0,0,0,0.08)', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>{order.id}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{order.date}</p>
                      </div>
                      <span style={{ display: 'inline-block', padding: '0.3rem 1rem', background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.3)', fontFamily: 'var(--font-heading)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>{order.status}</span>
                    </div>
                    {order.items.map((item) => (
                      <p key={item} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-primary)', padding: '0.4rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>◆ {item}</p>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                      <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}>Total</span>
                      <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-primary)' }}>{order.total.toLocaleString()} EGP</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            {tab === 'wishlist' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Your Wishlist</h2>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', marginBottom: '2rem' }}>Items you have saved will appear here. Explore the collection and save your favorites.</p>
                <Link href="/shop" className="btn-primary"><span>Browse Collection</span></Link>
              </motion.div>
            )}
            {tab === 'settings' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Account Settings</h2>
                {[['First Name', 'Royal'], ['Last Name', 'Member'], ['Email', 'member@agstore.eg'], ['Phone', '+20 10 0000 0000']].map(([label, defaultVal]) => (
                  <div key={label as string} style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label}</label>
                    <input className="input-egyptian" defaultValue={defaultVal as string} />
                  </div>
                ))}
                <button className="btn-primary" style={{ marginTop: '1rem' }}><span>Save Changes</span></button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) { .account-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
