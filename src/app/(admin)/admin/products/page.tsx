import React from 'react';
import { prisma } from '@/lib/prisma';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      {/* ─── HEADER ─────────────────────────────────────────────────── */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-display)' }}>Products</h2>
          <p className="text-xs text-neutral-500 uppercase tracking-widest mt-2">Manage your inventory and collection</p>
        </div>
        <Link href="/admin/products/new" className="bg-accent-primary text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-lg shadow-accent-primary/20">
          <Plus size={16} />
          Add New Product
        </Link>
      </div>

      {/* ─── FILTERS & SEARCH ───────────────────────────────────────── */}
      <div className="flex gap-4">
        <div className="flex-1 bg-[#0c0a06] border border-white/5 rounded-xl px-4 flex items-center gap-3">
          <Search size={18} className="text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="bg-transparent border-none outline-none py-3 text-sm w-full text-white placeholder:text-neutral-600"
          />
        </div>
        <button className="bg-[#0c0a06] border border-white/5 p-3 rounded-xl text-neutral-400 hover:text-white transition-colors">
          <Filter size={18} />
        </button>
      </div>

      {/* ─── TABLE ──────────────────────────────────────────────────── */}
      <div className="bg-[#0c0a06] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
              <th className="px-8 py-5">Product</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">Price</th>
              <th className="px-6 py-5">Stock</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <img src={product.images[0]} className="w-12 h-12 rounded-lg object-cover border border-white/10" alt="" />
                    <div>
                      <p className="text-sm font-bold">{product.name}</p>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-tighter">ID: {product.id.slice(-8)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">{product.category.name}</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-bold">EGP {product.price.toLocaleString()}</span>
                </td>
                <td className="px-6 py-5">
                  <span className={`text-sm font-bold ${product.stock < 10 ? 'text-red-400' : 'text-white'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                    product.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-neutral-500 hover:text-white transition-colors"><Eye size={16} /></button>
                    <button className="p-2 text-neutral-500 hover:text-white transition-colors"><Edit size={16} /></button>
                    <button className="p-2 text-neutral-500 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
