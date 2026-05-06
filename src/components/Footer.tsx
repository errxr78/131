'use client';

import Link from 'next/link';
import { Share2, Link2, MessageCircle, Play, ArrowRight, Mail } from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  Shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'New Arrivals', href: '/shop/new-arrivals' },
    { label: 'Wallets', href: '/shop/wallets' },
    { label: 'Bags', href: '/shop/bags' },
    { label: 'Belts', href: '/shop/belts' },
  ],
  Company: [
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  Support: [
    { label: 'FAQs', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Care Instructions', href: '/care' },
    { label: 'Contact Us', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Share2, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Link2, href: 'https://facebook.com', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://twitter.com', label: 'X (Twitter)' },
  { icon: Play, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        background: 'var(--bg-tertiary)',
        borderTop: '1px solid var(--border-light)',
        paddingTop: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Egyptian ornamental top border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent, var(--accent-dark), var(--accent-primary), var(--accent-light), var(--accent-primary), var(--accent-dark), transparent)',
        }}
      />

      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(ellipse at 20% 80%, rgba(0,0,0,0.04) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 20%, rgba(0,0,0,0.03) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        {/* Top section: Logo + Newsletter */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '4rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid var(--border-light)',
            marginBottom: '4rem',
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.15em' }} className="text-accent-gradient">
                AG STORE
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.55rem', letterSpacing: '0.45em', color: 'var(--accent-muted)', textTransform: 'uppercase', marginTop: '4px' }}>
                Heritage · Craft · Prestige
              </div>
            </Link>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '340px', marginBottom: '1rem' }}>
              Born from the land of pharaohs, crafted for the modern sovereign. Each AG piece carries centuries of Egyptian artisan heritage.
            </p>
            <p className="ar" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.9, maxWidth: '340px', marginBottom: '2rem' }}>
              من أرض الفراعنة، مصنوع للسيادة الحديثة
            </p>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent-primary)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-primary)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-medium)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Join the Inner Circle
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.2 }}>
              Enter the Royal Archives
            </h3>
            <p className="ar" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.85rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>اشترك في النشرة البريدية</p>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Receive exclusive access to new arrivals, heritage stories, and private member offers.
            </p>
            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', border: '1px solid var(--accent-primary)', background: 'rgba(0,0,0,0.05)' }}>
                <span style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}>✦</span>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                  Welcome to the Inner Circle
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', border: '1.5px solid var(--border-light)', borderRight: 'none', padding: '0 1rem' }}>
                  <Mail size={16} style={{ color: 'var(--accent-muted)', marginRight: '0.75rem', flexShrink: 0 }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{
                      flex: 1,
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      padding: '0.75rem 0',
                    }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ flexShrink: 0, padding: '0 1.25rem' }}>
                  <span><ArrowRight size={16} /></span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Link columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                {heading}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="animated-link"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        transition: 'color 0.3s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            padding: '1.5rem 0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} AG Store. All rights reserved. Born in Egypt. &nbsp;|&nbsp;
            <span className="ar" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.8rem' }}> صُنع في مصر</span>
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {/* Payment icons */}
            {['VISA', 'MasterCard', 'PayPal', 'Fawry'].map((pay) => (
              <span
                key={pay}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-light)',
                  padding: '2px 6px',
                }}
              >
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
