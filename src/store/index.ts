import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem, WishlistItem, FilterState, SortOption } from '@/types';

// Cart Store
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number, variant?: { type: string; value: string }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, quantity = 1, variant) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.product.id === product.id && 
          (variant ? item.selectedVariant?.value === variant.value : !item.selectedVariant)
        );
        
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id && 
              (variant ? item.selectedVariant?.value === variant.value : !item.selectedVariant)
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity, selectedVariant: variant }] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    }),
    {
      name: 'aurum-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Wishlist Store
interface WishlistState {
  items: WishlistItem[];
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => {
        const items = get().items;
        const exists = items.find((item) => item.product.id === product.id);
        
        if (exists) {
          set({ items: items.filter((item) => item.product.id !== product.id) });
        } else {
          set({ items: [...items, { product, addedAt: new Date() }] });
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.product.id === productId);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'aurum-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// UI Store
interface UIState {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  selectedProduct: Product | null;
  isQuickViewOpen: boolean;
  activeSection: string;
  isCheckoutOpen: boolean;
  checkoutStep: number;
  cookieConsent: boolean;
  showBackToTop: boolean;
  
  // Actions
  openSearch: () => void;
  closeSearch: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setActiveSection: (section: string) => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  setCheckoutStep: (step: number) => void;
  acceptCookies: () => void;
  setShowBackToTop: (show: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isSearchOpen: false,
      isMobileMenuOpen: false,
      selectedProduct: null,
      isQuickViewOpen: false,
      activeSection: 'hero',
      isCheckoutOpen: false,
      checkoutStep: 1,
      cookieConsent: false,
      showBackToTop: false,
      
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      openQuickView: (product) => set({ selectedProduct: product, isQuickViewOpen: true }),
      closeQuickView: () => set({ isQuickViewOpen: false, selectedProduct: null }),
      setActiveSection: (section) => set({ activeSection: section }),
      openCheckout: () => set({ isCheckoutOpen: true }),
      closeCheckout: () => set({ isCheckoutOpen: false, checkoutStep: 1 }),
      setCheckoutStep: (step) => set({ checkoutStep: step }),
      acceptCookies: () => set({ cookieConsent: true }),
      setShowBackToTop: (show) => set({ showBackToTop: show }),
    }),
    {
      name: 'aurum-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cookieConsent: state.cookieConsent }),
    }
  )
);

// Filter Store
interface FilterStoreState extends FilterState {
  setCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleMaterial: (material: string) => void;
  setInStockOnly: (value: boolean) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  category: 'all',
  priceRange: [0, 25000],
  materials: [],
  inStockOnly: false,
  sortBy: 'featured'
};

export const useFilterStore = create<FilterStoreState>((set) => ({
  ...defaultFilters,
  setCategory: (category) => set({ category }),
  setPriceRange: (priceRange) => set({ priceRange }),
  toggleMaterial: (material) => 
    set((state) => ({
      materials: state.materials.includes(material)
        ? state.materials.filter((m) => m !== material)
        : [...state.materials, material]
    })),
  setInStockOnly: (inStockOnly) => set({ inStockOnly }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () => set(defaultFilters)
}));
