'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/store';

const navLinks = [
  {
    label: 'Shop',
    href: '#',
    mega: true,
    children: [
      { label: 'All Products', href: '/shop', icon: '◈' },
      { label: 'New Arrivals', href: '/shop/new-arrivals', icon: '✦' },
      { label: 'Wallets', href: '/shop/wallets', icon: '◆' },
      { label: 'Bags', href: '/shop/bags', icon: '◇' },
      { label: 'Belts', href: '/shop/belts', icon: '▪' },
    ],
  },
  { label: 'New Arrivals', href: '/shop/new-arrivals' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  // Force dark text style always, since the new hero is light/white
  const useDarkStyle = true;

  const { getTotalItems, openCart } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── Promotional Banner ── */}
      <div
        className="promo-banner"
        style={{
          background: 'var(--text-primary)',
          color: '#FFFFFF',
          padding: '0.6rem 0',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 700,
          position: 'relative',
          zIndex: 60,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          style={{
            display: 'inline-flex',
            gap: '4rem',
            paddingLeft: '100%',
          }}
        >
          <span className="promo-item">Free Shipping Over 2,000 EGP</span>
          <span className="promo-divider">·</span>
          <span className="promo-item">Code <strong>PHARAOH10</strong> for 10% Off</span>
          <span className="promo-divider">·</span>
          <span className="promo-item ar" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.7rem' }}>شحن مجاني فوق ٢٠٠٠ ج · كود PHARAOH10 خصم ١٠٪</span>
          {/* Duplicate for seamless loop */}
          <span className="promo-item">Free Shipping Over 2,000 EGP</span>
          <span className="promo-divider">·</span>
          <span className="promo-item">Code <strong>PHARAOH10</strong> for 10% Off</span>
          <span className="promo-divider">·</span>
          <span className="promo-item ar" style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.7rem' }}>شحن مجاني فوق ٢٠٠٠ ج · كود PHARAOH10 خصم ١٠٪</span>
        </motion.div>
      </div>

      {/* ── Main Navbar ── */}
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: useDarkStyle ? 'var(--bg-tertiary)' : 'transparent',
          backdropFilter: useDarkStyle ? 'blur(20px)' : 'blur(0px)',
          borderBottomColor: useDarkStyle ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0)',
          top: scrolled ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? 48 : 34),
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: '1px solid transparent',
        }}
        className="nav-container"
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'clamp(60px, 10vh, 80px)',
            padding: '0 1.5rem',
          }}
        >
          {/* ── Mobile Menu Toggle (Left) ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', color: useDarkStyle ? 'var(--text-primary)' : 'var(--sand)', cursor: 'pointer', padding: '4px' }}
            className="mobile-only"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* ── Left Nav Links (Desktop) ── */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden-mobile">
            {navLinks.slice(0, 2).map((link) => (
              <div
                key={link.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => link.mega && setActiveMenu(link.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: useDarkStyle ? 'var(--text-primary)' : 'var(--sand)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = useDarkStyle ? 'var(--accent-light)' : '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = useDarkStyle ? 'var(--text-primary)' : 'var(--sand)')}
                >
                  {link.label}
                  {link.mega && <ChevronDown size={12} />}
                </Link>

                <AnimatePresence>
                  {link.mega && activeMenu === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '-2rem',
                        marginTop: '1rem',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(20px)',
                        padding: '1.5rem',
                        minWidth: '220px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                      }}
                    >
                      {link.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.6rem 0',
                            borderBottom: '1px solid rgba(0,0,0,0.1)',
                            textDecoration: 'none',
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = useDarkStyle ? 'var(--accent-light)' : '#FFFFFF')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                          onClick={() => setActiveMenu(null)}
                        >
                          <span style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}>{child.icon}</span>
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* ── Logo (Center) ── */}
          <Link
            href="/"
            className="navbar-logo"
            style={{
              textDecoration: 'none',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.9rem, 4vw, 1.4rem)',
                fontWeight: 900,
                letterSpacing: '0.15em',
                color: useDarkStyle ? 'var(--text-primary)' : '#FFFFFF',
                lineHeight: 1,
                transition: 'color 0.4s ease-out',
              }}
            >
              AG STORE
            </div>
            <div
              className="logo-subtitle"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.45rem',
                letterSpacing: '0.4em',
                color: useDarkStyle ? 'var(--accent-muted)' : 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}
            >
              Heritage · Craft · Prestige
            </div>
          </Link>

          {/* ── Right Nav (Icons) ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="hidden-mobile">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: useDarkStyle ? 'var(--text-primary)' : 'var(--sand)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = useDarkStyle ? 'var(--accent-light)' : '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = useDarkStyle ? 'var(--text-primary)' : 'var(--sand)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                style={{ background: 'none', border: 'none', color: useDarkStyle ? 'var(--text-primary)' : 'var(--sand)', cursor: 'pointer', padding: '4px', transition: 'color 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = useDarkStyle ? 'var(--accent-light)' : '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = useDarkStyle ? 'var(--text-primary)' : 'var(--sand)')}
                aria-label="Search"
                className="hidden-mobile"
              >
                <Search size={18} />
              </button>

              <Link
                href="/account"
                style={{ color: useDarkStyle ? 'var(--text-primary)' : 'var(--sand)', transition: 'color 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = useDarkStyle ? 'var(--accent-light)' : '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = useDarkStyle ? 'var(--text-primary)' : 'var(--sand)')}
                aria-label="Account"
                className="hidden-mobile"
              >
                <User size={18} />
              </Link>

              <button
                onClick={openCart}
                style={{ background: 'none', border: 'none', color: useDarkStyle ? 'var(--text-primary)' : 'var(--sand)', cursor: 'pointer', padding: '4px', position: 'relative', transition: 'color 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = useDarkStyle ? 'var(--accent-light)' : '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = useDarkStyle ? 'var(--text-primary)' : 'var(--sand)')}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {mounted && totalItems > 0 && (
                  <span className="cart-badge" style={{ fontSize: '0.6rem', width: '14px', height: '14px' }}>{totalItems}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                overflow: 'hidden',
                borderTop: '1px solid var(--border-light)',
                background: 'var(--bg-tertiary)',
                padding: '0 2rem',
              }}
            >
              <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem 0' }}>
                <input
                  className="input-egyptian"
                  type="text"
                  placeholder="Search products — wallets, bags, belts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '85vw',
              maxWidth: '360px',
              background: 'var(--bg-tertiary)',
              borderLeft: '1px solid var(--border-light)',
              zIndex: 100,
              padding: '6rem 2rem 2rem',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--accent-primary)', marginBottom: '2rem', letterSpacing: '0.1em' }}>
              AG STORE
            </div>
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--border-light)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.6rem 1rem',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-muted)',
                      textDecoration: 'none',
                    }}
                  >
                    {child.icon} {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="/account" className="btn-outline" style={{ textAlign: 'center' }} onClick={() => setMobileOpen(false)}>
                <span>My Account</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99 }}
        />
      )}

      <style jsx>{`
        .promo-banner {
          display: flex;
          align-items: center;
        }
        .promo-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        @media (max-width: 600px) {
          .promo-banner { padding: 0.4rem 0; }
        }
        @media (max-width: 900px) { 
          .hidden-mobile { display: none !important; }
          .navbar-logo { position: static !important; transform: none !important; margin: 0 auto; }
        }
        @media (min-width: 901px) { .mobile-only { display: none !important; } }
      `}</style>
    </>
  );
}
