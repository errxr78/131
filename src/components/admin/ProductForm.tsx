'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Upload, 
  X, 
  Check, 
  AlertCircle,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
}

export default function ProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...filesArray]);
      
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    images.forEach((image) => {
      formData.append('product_images', image);
    });

    try {
      // We will implement this server action next
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to create product');

      router.push('/admin/products');
      router.refresh();
    } catch (err: unknown) {
      setError((err as Error).message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 rounded-lg bg-white/5 text-neutral-400 hover:text-white transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>New Product</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0c0a06] border border-white/5 p-8 rounded-2xl space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Product Name</label>
              <input 
                name="name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-primary outline-none transition-colors"
                placeholder="e.g. Pharaoh Gold Bifold"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Description</label>
              <textarea 
                name="description"
                required
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-primary outline-none transition-colors resize-none"
                placeholder="Describe the royal craftsmanship..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Price (EGP)</label>
                <input 
                  name="price"
                  type="number"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-primary outline-none transition-colors"
                  placeholder="2499"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Stock Quantity</label>
                <input 
                  name="stock"
                  type="number"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-primary outline-none transition-colors"
                  placeholder="50"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0c0a06] border border-white/5 p-8 rounded-2xl">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">Product Images</label>
            
            <div className="grid grid-cols-4 gap-4 mb-4">
              {previews.map((url, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden relative border border-white/10 group">
                  { }
                  <img src={url} className="w-full h-full object-cover" alt="" />
                  <button 
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              
              <label className="aspect-square rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors text-neutral-500 hover:text-accent-primary">
                <Upload size={24} className="mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Upload</span>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <p className="text-[10px] text-neutral-600">Max size 2MB per image. High-quality JPGS recommended.</p>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#0c0a06] border border-white/5 p-8 rounded-2xl space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Category</label>
              <select 
                name="categoryId"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-accent-primary outline-none transition-colors appearance-none"
              >
                <option value="" className="bg-[#0c0a06]">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="bg-[#0c0a06]">{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <input type="checkbox" name="isFeatured" id="featured" className="w-4 h-4 accent-accent-primary" />
              <label htmlFor="featured" className="text-xs font-bold uppercase tracking-widest cursor-pointer">Featured Product</label>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400">
              <AlertCircle size={18} />
              <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-accent-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-accent-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
            {loading ? 'Creating...' : 'Publish Product'}
          </button>
        </div>
      </div>
    </form>
  );
}
