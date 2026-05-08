import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  Box
} from 'lucide-react';

const SidebarLink = ({ href, icon: Icon, label, active = false }: { href: string; icon: React.ElementType; label: string; active?: boolean }) => (
  <Link 
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' 
        : 'text-neutral-400 hover:text-white hover:bg-white/5'
    }`}
    style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
  >
    <Icon size={18} />
    <span>{label}</span>
    {active && <ChevronRight size={14} className="ml-auto" />}
  </Link>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0804] text-white">
      {/* ─── SIDEBAR ─────────────────────────────────────────────────── */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-6 fixed inset-y-0 left-0 bg-[#0c0a06] z-50">
        <div className="mb-12 px-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-primary flex items-center justify-center font-bold text-xl shadow-lg shadow-accent-primary/30">
            AG
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-display)' }}>
              AG Store
            </h1>
            <p className="text-[10px] text-neutral-500 uppercase tracking-tighter">Admin Control</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarLink href="/admin" icon={LayoutDashboard} label="Overview" active />
          <SidebarLink href="/admin/products" icon={Package} label="Products" />
          <SidebarLink href="/admin/categories" icon={Box} label="Categories" />
          <SidebarLink href="/admin/orders" icon={ShoppingCart} label="Orders" />
          <SidebarLink href="/admin/customers" icon={Users} label="Customers" />
          <SidebarLink href="/admin/settings" icon={Settings} label="Settings" />
        </nav>

        <div className="mt-auto border-t border-white/5 pt-6">
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:text-red-400 transition-colors w-full uppercase tracking-widest text-[10px] font-bold">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ────────────────────────────────────────────── */}
      <main className="flex-1 ml-72">
        {/* Top Header */}
        <header className="h-20 border-bottom border-white/5 flex items-center justify-between px-10 sticky top-0 bg-[#0a0804]/80 backdrop-blur-md z-40">
          <h2 className="text-lg font-medium" style={{ fontFamily: 'var(--font-display)' }}>Dashboard Overview</h2>
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <p className="text-xs font-bold uppercase tracking-widest">Amr Galal</p>
              <p className="text-[10px] text-accent-primary uppercase font-bold">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-accent-primary/30 overflow-hidden">
              <img src="/images/product-1.jpg" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
