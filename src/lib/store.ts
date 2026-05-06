import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  badge?: 'new' | 'sale';
  description?: string;
  rating?: number;
  reviews?: number;
  sizes?: string[];
  colors?: string[];
  stock?: number;
  featured?: boolean;
  details?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  wishlist: string[];
  addItem: (product: Product, size?: string, color?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleWishlist: (id: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      wishlist: [],
      addItem: (product, size, color) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
        );
        if (existingIndex > -1) {
          const updated = [...items];
          updated[existingIndex].quantity += 1;
          set({ items: updated, isOpen: true });
        } else {
          set({ items: [...items, { ...product, quantity: 1, selectedSize: size, selectedColor: color }], isOpen: true });
        }
      },
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, quantity } : item) }));
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleWishlist: (id) => {
        const wishlist = get().wishlist;
        if (wishlist.includes(id)) {
          set({ wishlist: wishlist.filter((wid) => wid !== id) });
        } else {
          set({ wishlist: [...wishlist, id] });
        }
      },
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    { name: 'ag-store-cart' }
  )
);
