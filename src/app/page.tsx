'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, ChevronLeft, ChevronRight,
  Plus, Minus, Star, ArrowRight, Play, ExternalLink, Instagram, Linkedin,
  ArrowUp, Check, Sparkles, Clock, Award, Shield, Truck, Mail, Phone, MapPin,
  Sun, Moon, ZoomIn, Share2, Gift, Package, Diamond,
  MoveDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { products, collections, reviews, membershipTiers, deliveryMethods, editorialStories, materials } from '@/data/products';
import { useCartStore, useWishlistStore, useUIStore, useFilterStore } from '@/store';
import { Product } from '@/types';
import Link from 'next/link';

// Custom Cursor Component
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const animateFollower = () => {
      setFollowerPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15
      }));
    };

    const animationFrame = requestAnimationFrame(animateFollower);
    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div className="w-2 h-2 bg-[#C9A84C] rounded-full" />
      </div>
      <div
        className="fixed pointer-events-none z-[9998] mix-blend-difference"
        style={{
          left: followerPosition.x - (isHovering ? 24 : 16),
          top: followerPosition.y - (isHovering ? 24 : 16),
          opacity: isVisible ? 0.5 : 0,
          transition: 'all 0.3s ease'
        }}
      >
        <div
          className="w-8 h-8 border border-[#C9A84C] rounded-full"
          style={{
            width: isHovering ? '48px' : '32px',
            height: isHovering ? '48px' : '32px'
          }}
        />
      </div>
    </>
  );
}

// Film Grain Overlay
function FilmGrain() {
  return <div className="film-grain" />;
}

// Toast Notification
function Toast({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 50, x: '-50%' }}
      className="fixed bottom-8 left-1/2 z-[9999] px-6 py-4 bg-[#161616] border border-[rgba(201,168,76,0.3)] rounded-sm shadow-2xl"
    >
      <div className="flex items-center gap-3">
        {type === 'success' ? (
          <Check className="w-5 h-5 text-[#C9A84C]" />
        ) : (
          <X className="w-5 h-5 text-red-500" />
        )}
        <span className="text-[#F5F0E8] text-sm tracking-wide">{message}</span>
      </div>
    </motion.div>
  );
}

// Search Overlay
function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-[#0A0A0A]/98 glass"
          onClick={closeSearch}
        >
          <div className="max-w-3xl mx-auto pt-32 px-6" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-[#8A8075]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pieces..."
                className="w-full bg-transparent border-b border-[rgba(201,168,76,0.3)] py-4 pl-10 text-2xl text-[#F5F0E8] placeholder-[#8A8075] focus:outline-none focus:border-[#C9A84C] font-display"
                autoFocus
              />
              <button onClick={closeSearch} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8A8075] hover:text-[#F5F0E8]">
                <X className="w-6 h-6" />
              </button>
            </div>

            {query && (
              <div className="mt-12 space-y-4">
                <p className="label-uppercase text-[#8A8075] mb-6">Results</p>
                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 5).map((product) => (
                    <a
                      key={product.id}
                      href={`#product-${product.id}`}
                      onClick={closeSearch}
                      className="flex items-center gap-6 py-4 border-b border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.3)] transition-colors group"
                    >
                      <div className="w-16 h-20 bg-[#161616]" />
                      <div className="flex-1">
                        <p className="text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">{product.name}</p>
                        <p className="text-sm text-[#8A8075] label-uppercase">{product.category}</p>
                      </div>
                      <p className="text-[#C9A84C]">${product.price.toLocaleString()}</p>
                    </a>
                  ))
                ) : (
                  <p className="text-[#8A8075]">No pieces found.</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section id="hero" className="relative bg-[url('/collections/obsidian.jpg')] bg-cover bg-center h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[#000000]/80">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C9A84C]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="label-uppercase text-[#C9A84C] mb-8 tracking-[0.5em]"
        >
          Autumn / Winter Collection 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-[clamp(3rem,12vw,8rem)] leading-[0.9] mb-4 text-[#F5F0E8] font-light"
        >
          THE ART OF
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-display text-[clamp(3rem,12vw,8rem)] font-bold leading-[0.9] mb-8 text-[#C9A84C] italic font-light"
        >
          DISTINCTION
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-white mb-12 tracking-wide"
        >
          Limited to 200 Pieces Worldwide
        </motion.p>

        <motion.a
          href="#collections"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="btn-luxury"
        >
          <span>Explore Collection</span>
        </motion.a>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-16 left-0 right-0 overflow-hidden">
        <div className="md:hidden lg:block sm:block xl:block 2xl:block animate-ticker whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="inline-block label-uppercase text-[#C9A84C] text-sm tracking-[0.4em] mx-8">
              NEW ARRIVAL · LIMITED EDITION · HANDCRAFTED · AURUM · SS2025 · EXCLUSIVE ·
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label-uppercase text-[#8A8075] text-xs tracking-[0.3em]">Scroll</span>
        <MoveDown className='text-[#C9A84C] animate-scroll-indicator' />
      </motion.div>
    </section>
  );
}

// Brand Statement Section
function BrandStatement() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <hr className="hr-gold max-w-xs mx-auto mb-12" />
          <blockquote className="font-display text-3xl md:text-5xl text-[#F5F0E8] italic font-light leading-relaxed">
            "We do not make products. We make heirlooms."
          </blockquote>
          <hr className="hr-gold max-w-xs mx-auto mt-12" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] relative overflow-hidden group bg-[#161616]"
          >
            <Image
              src="/products/watch-1.jpg"
              alt="AURUM Atelier"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="label-uppercase text-[#C9A84C] text-xs">Atelier</p>
              <p className="font-display text-2xl text-[#F5F0E8] mt-1">Switzerland</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="font-display text-3xl text-[#F5F0E8]">The AURUM Philosophy</h3>
            <p className="text-[#8A8075] leading-relaxed">
              Founded on the principle that true luxury is timeless, we create objects meant to outlast their owners.
              Each piece in our collection undergoes hundreds of hours of meticulous craftsmanship,
              ensuring that what leaves our atelier is nothing less than perfection.
            </p>
            <p className="text-[#8A8075] leading-relaxed">
              We source only the rarest materials—Swiss movements, Italian leathers, Japanese silks—and
              transform them through the hands of master artisans who have dedicated their lives to their craft.
            </p>
            <a href="#about" className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#E8C97A] transition-colors group">
              <span className="label-uppercase text-xs tracking-[0.3em]">Our Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Featured Collections
function FeaturedCollections() {
  return (
    <section id="collections" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-16"
        >
          <h2 className="font-display text-3xl text-[#F5F0E8]">The Collections</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(201,168,76,0.3)] to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <motion.a
              key={collection.id}
              href={`#collection-${collection.slug}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden bg-[#161616]"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="label-uppercase text-[#C9A84C] text-xs mb-2">{collection.category}</p>
                <h3 className="font-display text-2xl text-[#F5F0E8] mb-2">{collection.name}</h3>
                <p className="text-[#8A8075] text-sm mb-4">{collection.itemCount} Pieces</p>
                <div className="flex items-center gap-2 text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="label-uppercase text-xs">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Editor's Choice Product
function EditorChoice() {
  const editorProduct = products.find(p => p.isEditorChoice) || products[0];
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  if (!editorProduct) return null;

  return (
    <section className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 aspect-[4/3] relative overflow-hidden group bg-[#161616]"
          >
            <Image
              src={editorProduct.thumbnail}
              alt={editorProduct.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 to-transparent" />
            {editorProduct.isLimited && (
              <span className="absolute top-6 left-6 label-uppercase text-xs text-[#C9A84C] bg-[#0A0A0A]/80 px-3 py-1 border border-[rgba(201,168,76,0.3)]">
                Limited Edition
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <p className="label-uppercase text-[#C9A84C] tracking-[0.4em]">Editor's Choice</p>
            <h3 className="font-display text-4xl md:text-5xl text-[#F5F0E8]">{editorProduct.name}</h3>
            <p className="text-[#C9A84C] text-2xl font-display">${editorProduct.price.toLocaleString()}</p>
            <p className="text-[#8A8075] leading-relaxed">{editorProduct.shortDescription}</p>

            <div className="flex flex-wrap gap-3">
              {editorProduct.materials.slice(0, 3).map((material) => (
                <span key={material} className="label-uppercase text-xs text-[#8A8075] border border-[rgba(201,168,76,0.2)] px-3 py-1">
                  {material}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => {
                  addItem(editorProduct);
                  openCart();
                  showToast('Added to cart');
                }}
                className="btn-luxury flex-1"
              >
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => {
                  toggleItem(editorProduct);
                  showToast(isInWishlist(editorProduct.id) ? 'Removed from wishlist' : 'Added to wishlist');
                }}
                className={cn(
                  "w-12 h-12 border flex items-center justify-center transition-colors",
                  isInWishlist(editorProduct.id)
                    ? "border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A]"
                    : "border-[rgba(201,168,76,0.3)] text-[#F5F0E8] hover:border-[#C9A84C] hover:text-[#C9A84C]"
                )}
              >
                <Heart className={cn("w-5 h-5", isInWishlist(editorProduct.id) && "fill-current")} />
              </button>
            </div>

            <p className="text-[#8A8075] text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              Only {editorProduct.stock} Remaining
            </p>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </section>
  );
}

// Product Card Component
function ProductCard({ product, index }: { product: Product; index: number }) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const { openQuickView } = useUIStore();
  const [isHovered, setIsHovered] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-[#161616] overflow-hidden mb-4">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-1000"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="label-uppercase text-xs text-[#0A0A0A] bg-[#C9A84C] px-3 py-1">New</span>
          )}
          {product.isLimited && !product.isNew && (
            <span className="label-uppercase text-xs text-[#C9A84C] border border-[rgba(201,168,76,0.5)] bg-[#0A0A0A]/80 px-3 py-1">Limited</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product);
            showToast(isInWishlist(product.id) ? 'Removed from wishlist' : 'Saved to wishlist');
          }}
          className={cn(
            "absolute top-4 right-4 w-10 h-10 flex items-center justify-center transition-all duration-300 z-10 bg-[#0A0A0A]/50 backdrop-blur-sm",
            isInWishlist(product.id)
              ? "text-[#C9A84C]"
              : "text-[#F5F0E8] opacity-0 group-hover:opacity-100"
          )}
        >
          <Heart className={cn("w-5 h-5", isInWishlist(product.id) && "fill-current text-[#C9A84C]")} />
        </button>

        {/* Quick View & Add to Cart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-4 left-4 right-4 space-y-2 z-10"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product);
            }}
            className="w-full btn-luxury text-xs py-3"
          >
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
              showToast('Added to cart');
            }}
            className="w-full bg-[#C9A84C] text-[#0A0A0A] py-3 text-xs label-uppercase hover:bg-[#E8C97A] transition-colors"
          >
            Add to Cart
          </button>
        </motion.div>
      </div>

      <div className="space-y-2">
        <p className="label-uppercase text-[#8A8075] text-xs">{product.category}</p>
        <h4 className="font-display text-lg text-[#F5F0E8]">{product.name}</h4>
        <div className="flex items-center gap-2">
          <p className="text-[#C9A84C]">${product.price.toLocaleString()}</p>
          {product.originalPrice && (
            <p className="text-[#8A8075] line-through text-sm">${product.originalPrice.toLocaleString()}</p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}

// Product Grid Section
function ProductGrid() {
  const { category, priceRange, materials: selectedMaterials, inStockOnly, sortBy, setCategory, setPriceRange, toggleMaterial, setInStockOnly, setSortBy, resetFilters } = useFilterStore();
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'watches', 'clothing', 'accessories', 'home', 'leather'];
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name', label: 'Name' }
  ];

  const filteredProducts = products.filter(p => {
    if (category !== 'all' && p.category !== category) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (selectedMaterials.length > 0 && !p.materials.some(m => selectedMaterials.includes(m.toLowerCase()))) return false;
    if (inStockOnly && p.stock <= 0) return false;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest': return a.isNew ? -1 : 1;
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  return (
    <section id="shop" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl text-[#F5F0E8] mb-2">All Pieces</h2>
            <p className="text-[#8A8075]">{filteredProducts.length} Items</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-[#F5F0E8] label-uppercase text-xs"
            >
              <span>Filters</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-2 text-sm focus:outline-none focus:border-[#C9A84C]"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-[#0A0A0A]">{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-5 gap-8">
          {/* Filters Sidebar */}
          <div className={cn(
            "lg:block space-y-8",
            showFilters ? "block" : "hidden"
          )}>
            <div>
              <h4 className="label-uppercase text-[#F5F0E8] text-xs mb-4">Category</h4>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "block w-full text-left py-2 text-sm transition-colors",
                      category === cat ? "text-[#C9A84C]" : "text-[#8A8075] hover:text-[#F5F0E8]"
                    )}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="label-uppercase text-[#F5F0E8] text-xs mb-4">Price Range</h4>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-24 bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]"
                />
                <span className="text-[#8A8075]">—</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-24 bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-3 py-2 text-sm focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
            </div>

            <div>
              <h4 className="label-uppercase text-[#F5F0E8] text-xs mb-4">Materials</h4>
              <div className="flex flex-wrap gap-2">
                {materials.map(mat => (
                  <button
                    key={mat.id}
                    onClick={() => toggleMaterial(mat.name.toLowerCase())}
                    className={cn(
                      "px-3 py-1 text-xs border transition-colors",
                      selectedMaterials.includes(mat.name.toLowerCase())
                        ? "border-[#C9A84C] text-[#C9A84C] bg-[rgba(201,168,76,0.1)]"
                        : "border-[rgba(201,168,76,0.2)] text-[#8A8075] hover:border-[rgba(201,168,76,0.5)]"
                    )}
                  >
                    {mat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#C9A84C]"
                />
                <span className="text-sm text-[#F5F0E8]">In Stock Only</span>
              </label>
            </div>

            <button
              onClick={resetFilters}
              className="text-[#C9A84C] text-sm hover:text-[#E8C97A] transition-colors"
            >
              Reset Filters
            </button>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Quick View Modal
function QuickViewModal() {
  const { selectedProduct, isQuickViewOpen, closeQuickView } = useUIStore();
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  if (!selectedProduct) return null;

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-[#0A0A0A]/95"
          onClick={closeQuickView}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#111111] border border-[rgba(201,168,76,0.2)] max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              {/* Images */}
              <div className="bg-[#161616] relative">
                <div className="aspect-square relative">
                  <Image
                    src={selectedProduct.thumbnail}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex gap-2 p-4">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={cn(
                        "w-16 h-16 bg-[#111111] border transition-colors overflow-hidden relative",
                        selectedImage === i ? "border-[#C9A84C]" : "border-transparent"
                      )}
                    >
                      <Image
                        src={selectedProduct.thumbnail}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-8 space-y-6">
                <button onClick={closeQuickView} className="absolute top-4 right-4 text-[#8A8075] hover:text-[#F5F0E8]">
                  <X className="w-6 h-6" />
                </button>

                <div>
                  <p className="label-uppercase text-[#C9A84C] text-xs mb-2">{selectedProduct.category}</p>
                  <h3 className="font-display text-3xl text-[#F5F0E8]">{selectedProduct.name}</h3>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4", i < Math.floor(selectedProduct.rating) ? "text-[#C9A84C] fill-current" : "text-[#8A8075]")} />
                    ))}
                  </div>
                  <span className="text-[#8A8075] text-sm">({selectedProduct.reviewCount} Reviews)</span>
                </div>

                <p className="text-[#C9A84C] text-2xl font-display">${selectedProduct.price.toLocaleString()}</p>
                <p className="text-[#8A8075]">{selectedProduct.shortDescription}</p>

                <div className="flex flex-wrap gap-2">
                  {selectedProduct.materials.map(m => (
                    <span key={m} className="text-xs text-[#8A8075] border border-[rgba(201,168,76,0.2)] px-3 py-1">{m}</span>
                  ))}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-[#F5F0E8] text-sm">Quantity</span>
                  <div className="flex items-center border border-[rgba(201,168,76,0.3)]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-[#F5F0E8] hover:text-[#C9A84C]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-[#F5F0E8]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-[#F5F0E8] hover:text-[#C9A84C]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      addItem(selectedProduct, quantity);
                      closeQuickView();
                      openCart();
                      showToast('Added to cart');
                    }}
                    className="btn-luxury flex-1"
                  >
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => {
                      toggleItem(selectedProduct);
                      showToast(isInWishlist(selectedProduct.id) ? 'Removed from wishlist' : 'Added to wishlist');
                    }}
                    className={cn(
                      "w-12 h-12 border flex items-center justify-center transition-colors",
                      isInWishlist(selectedProduct.id)
                        ? "border-[#C9A84C] text-[#C9A84C]"
                        : "border-[rgba(201,168,76,0.3)] text-[#F5F0E8] hover:border-[#C9A84C]"
                    )}
                  >
                    <Heart className={cn("w-5 h-5", isInWishlist(selectedProduct.id) && "fill-current")} />
                  </button>
                </div>

                <p className="text-[#8A8075] text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                  {selectedProduct.stock} in stock
                </p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Cart Drawer
function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const { openCheckout } = useUIStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[#0A0A0A]/80"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[71] w-full max-w-md bg-[#111111] border-l border-[rgba(201,168,76,0.2)]"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[rgba(201,168,76,0.1)]">
                <h3 className="font-display text-xl text-[#F5F0E8]">Your Selection ({items.length})</h3>
                <button onClick={closeCart} className="text-[#8A8075] hover:text-[#F5F0E8]">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-[#8A8075] mx-auto mb-4" />
                    <p className="text-[#8A8075]">Your selection is empty</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-20 h-24 bg-[#161616]" />
                      <div className="flex-1">
                        <h4 className="text-[#F5F0E8] mb-1">{item.product.name}</h4>
                        <p className="text-[#C9A84C] text-sm">${item.product.price.toLocaleString()}</p>

                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border border-[rgba(201,168,76,0.3)]">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#F5F0E8] hover:text-[#C9A84C]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-[#F5F0E8] text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#F5F0E8] hover:text-[#C9A84C]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-[#8A8075] hover:text-red-500 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-[rgba(201,168,76,0.1)]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#8A8075]">Subtotal</span>
                    <span className="text-[#C9A84C] text-xl font-display">${getTotalPrice().toLocaleString()}</span>
                  </div>
                  <p className="text-[#8A8075] text-sm mb-6">Complimentary shipping on all orders</p>
                  <button
                    onClick={() => {
                      closeCart();
                      openCheckout();
                    }}
                    className="btn-luxury w-full"
                  >
                    <span>Proceed to Checkout</span>
                  </button>
                  <button onClick={closeCart} className="w-full text-center text-[#8A8075] text-sm mt-4 hover:text-[#F5F0E8]">
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Checkout Modal
function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, checkoutStep, setCheckoutStep } = useUIStore();
  const { items, getTotalPrice } = useCartStore();
  const [deliveryMethod, setDeliveryMethod] = useState('d1');

  const steps = [
    { id: 1, name: 'Shipping' },
    { id: 2, name: 'Delivery' },
    { id: 3, name: 'Payment' }
  ];

  const selectedDelivery = deliveryMethods.find(d => d.id === deliveryMethod);
  const totalPrice = getTotalPrice() + (selectedDelivery?.price || 0);

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-[#0A0A0A]/98 overflow-y-auto"
        >
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <span className="font-display text-2xl text-[#C9A84C] tracking-[0.2em]">AURUM</span>
              <button onClick={closeCheckout} className="text-[#8A8075] hover:text-[#F5F0E8]">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                    checkoutStep > step.id ? "bg-[#C9A84C] text-[#0A0A0A]" :
                      checkoutStep === step.id ? "border-2 border-[#C9A84C] text-[#C9A84C]" :
                        "border border-[rgba(201,168,76,0.3)] text-[#8A8075]"
                  )}>
                    {checkoutStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className={cn(
                    "ml-2 text-sm",
                    checkoutStep === step.id ? "text-[#F5F0E8]" : "text-[#8A8075]"
                  )}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="w-12 h-[1px] bg-[rgba(201,168,76,0.2)] mx-4" />
                  )}
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                {checkoutStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="font-display text-2xl text-[#F5F0E8] mb-6">Contact & Shipping</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[#8A8075] text-sm mb-2">Email</label>
                        <input type="email" className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-3 focus:outline-none focus:border-[#C9A84C]" placeholder="your@email.com" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#8A8075] text-sm mb-2">First Name</label>
                          <input type="text" className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-3 focus:outline-none focus:border-[#C9A84C]" />
                        </div>
                        <div>
                          <label className="block text-[#8A8075] text-sm mb-2">Last Name</label>
                          <input type="text" className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-3 focus:outline-none focus:border-[#C9A84C]" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#8A8075] text-sm mb-2">Address</label>
                        <input type="text" className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-3 focus:outline-none focus:border-[#C9A84C]" />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[#8A8075] text-sm mb-2">City</label>
                          <input type="text" className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-3 focus:outline-none focus:border-[#C9A84C]" />
                        </div>
                        <div>
                          <label className="block text-[#8A8075] text-sm mb-2">State</label>
                          <input type="text" className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-3 focus:outline-none focus:border-[#C9A84C]" />
                        </div>
                        <div>
                          <label className="block text-[#8A8075] text-sm mb-2">ZIP</label>
                          <input type="text" className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-3 focus:outline-none focus:border-[#C9A84C]" />
                        </div>
                      </div>
                    </div>

                    <button onClick={() => setCheckoutStep(2)} className="btn-luxury w-full mt-8">
                      <span>Continue to Delivery</span>
                    </button>
                  </div>
                )}

                {checkoutStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="font-display text-2xl text-[#F5F0E8] mb-6">Delivery Method</h3>

                    <div className="space-y-4">
                      {deliveryMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setDeliveryMethod(method.id)}
                          className={cn(
                            "w-full p-6 border text-left transition-colors",
                            deliveryMethod === method.id
                              ? "border-[#C9A84C] bg-[rgba(201,168,76,0.05)]"
                              : "border-[rgba(201,168,76,0.2)] hover:border-[rgba(201,168,76,0.4)]"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[#F5F0E8] mb-1">{method.name}</p>
                              <p className="text-[#8A8075] text-sm">{method.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[#C9A84C]">{method.price === 0 ? 'Complimentary' : `$${method.price}`}</p>
                              <p className="text-[#8A8075] text-sm">{method.estimatedDays}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button onClick={() => setCheckoutStep(1)} className="btn-luxury flex-1 border-[rgba(201,168,76,0.3)] hover:border-[#C9A84C]">
                        <span>Back</span>
                      </button>
                      <button onClick={() => setCheckoutStep(3)} className="btn-luxury flex-1">
                        <span>Continue to Payment</span>
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="font-display text-2xl text-[#F5F0E8] mb-6">Payment</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[#8A8075] text-sm mb-2">Card Number</label>
                        <input type="text" className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-3 focus:outline-none focus:border-[#C9A84C]" placeholder="•••• •••• •••• ••••" />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <label className="block text-[#8A8075] text-sm mb-2">Expiry Date</label>
                          <input type="text" className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-3 focus:outline-none focus:border-[#C9A84C]" placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="block text-[#8A8075] text-sm mb-2">CVV</label>
                          <input type="text" className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-3 focus:outline-none focus:border-[#C9A84C]" placeholder="•••" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#8A8075] text-sm mb-2">Name on Card</label>
                        <input type="text" className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-3 focus:outline-none focus:border-[#C9A84C]" />
                      </div>
                    </div>

                    <p className="text-[#8A8075] text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Secure 256-bit SSL encryption
                    </p>

                    <div className="flex gap-4 mt-8">
                      <button onClick={() => setCheckoutStep(2)} className="btn-luxury flex-1 border-[rgba(201,168,76,0.3)] hover:border-[#C9A84C]">
                        <span>Back</span>
                      </button>
                      <button onClick={() => {
                        setCheckoutStep(4);
                      }} className="btn-luxury-filled flex-1">
                        <span>Place Order</span>
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === 4 && (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 rounded-full border-2 border-[#C9A84C] flex items-center justify-center mx-auto mb-8"
                    >
                      <Check className="w-10 h-10 text-[#C9A84C]" />
                    </motion.div>
                    <h3 className="font-display text-3xl text-[#F5F0E8] mb-4">Thank You</h3>
                    <p className="text-[#8A8075] mb-2">Order #AUR-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    <p className="text-[#8A8075]">You will receive a confirmation email shortly.</p>
                    <button onClick={closeCheckout} className="btn-luxury mt-8">
                      <span>Continue Shopping</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-[#111111] border border-[rgba(201,168,76,0.2)] p-6 sticky top-8">
                  <h4 className="text-[#F5F0E8] mb-6">Order Summary</h4>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4">
                        <div className="w-16 h-20 bg-[#161616]" />
                        <div className="flex-1">
                          <p className="text-[#F5F0E8] text-sm">{item.product.name}</p>
                          <p className="text-[#8A8075] text-xs">Qty: {item.quantity}</p>
                          <p className="text-[#C9A84C] text-sm">${(item.product.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="border-[rgba(201,168,76,0.1)] mb-4" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#8A8075]">Subtotal</span>
                      <span className="text-[#F5F0E8]">${getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8A8075]">Shipping</span>
                      <span className="text-[#F5F0E8]">{selectedDelivery?.price === 0 ? 'Complimentary' : `$${selectedDelivery?.price}`}</span>
                    </div>
                  </div>

                  <hr className="border-[rgba(201,168,76,0.1)] my-4" />

                  <div className="flex justify-between">
                    <span className="text-[#F5F0E8]">Total</span>
                    <span className="text-[#C9A84C] text-xl font-display">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Lookbook Section
function LookbookSection() {
  return (
    <section id="lookbook" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-4">Editorial</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E8]">The Lookbook</h2>
        </motion.div>

        {/* Hero Editorial */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[16/9] mb-12 overflow-hidden group bg-[#161616]"
        >
          <Image
            src="/products/coat-1.jpg"
            alt="The Obsidian Winter"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
            sizes="(max-width: 1200px) 100vw, 1800px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="label-uppercase text-[#C9A84C] text-xs mb-2">Winter 2025</p>
            <h3 className="font-display text-3xl md:text-4xl text-[#F5F0E8] mb-2">The Obsidian Winter — A Study in Restraint</h3>
            <p className="text-[#8A8075] max-w-xl">Exploring the intersection of darkness and light through the lens of our Autumn/Winter collection.</p>
          </div>
        </motion.div>

        {/* Editorial Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {editorialStories.map((story, index) => (
            <motion.a
              key={story.id}
              href={`#editorial-${story.slug}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/5] bg-[#161616] overflow-hidden"
            >
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[#8A8075] text-sm mb-2">{story.date}</p>
                <h4 className="font-display text-xl text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">{story.title}</h4>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Atelier Section
function AtelierSection() {
  const processSteps = [
    { title: 'Design', description: 'Every piece begins as a sketch in our Geneva atelier.' },
    { title: 'Material Selection', description: 'Only the world\'s finest raw materials are selected.' },
    { title: 'Artisan Craftsmanship', description: '50+ hours of hand finishing per piece.' },
    { title: 'Quality Control', description: '100-point inspection protocol.' },
    { title: 'Delivery', description: 'White-glove, worldwide delivery.' }
  ];

  return (
    <section id="atelier" className="py-24 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-4">Craftsmanship</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E8] mb-4">Made by Hand. Made to Last.</h2>
          <p className="text-[#8A8075] max-w-2xl mx-auto">
            Each AURUM piece undergoes a rigorous journey from concept to creation,
            ensuring every detail meets our exacting standards.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent hidden lg:block" />

          <div className="grid lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-4 h-4 rounded-full bg-[#C9A84C] mx-auto mb-6 relative z-10 hidden lg:block" />
                <h4 className="font-display text-xl text-[#F5F0E8] mb-2">{step.title}</h4>
                <p className="text-[#8A8075] text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Materials Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="font-display text-2xl text-[#F5F0E8] text-center mb-12">Our Materials</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: '18k Gold', icon: '✦' },
              { name: 'Platinum', icon: '◈' },
              { name: 'Alligator', icon: '▬' },
              { name: 'Cashmere', icon: '○' }
            ].map((material, index) => (
              <div key={material.name} className="bg-[#0A0A0A] border border-[rgba(201,168,76,0.1)] p-6 text-center group hover:border-[rgba(201,168,76,0.3)] transition-colors">
                <span className="text-3xl text-[#C9A84C] block mb-4">{material.icon}</span>
                <p className="text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors">{material.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#contact" className="btn-luxury">
            <span>Commission a Piece</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const milestones = [
    { year: '2010', event: 'AURUM founded in Geneva' },
    { year: '2014', event: 'First flagship boutique opens' },
    { year: '2018', event: 'Introduction of The Obsidian Series' },
    { year: '2022', event: 'Carbon-neutral certification' },
    { year: '2025', event: 'Global expansion continues' }
  ];

  return (
    <section id="about" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        {/* Hero Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E8] mb-6">Our Story</h2>
          <p className="text-[#8A8075] max-w-3xl mx-auto leading-relaxed">
            AURUM was born from a singular vision: to create objects that transcend time.
            Founded in Geneva in 2010, we have remained steadfast in our commitment to
            exceptional craftsmanship, rare materials, and timeless design. Each piece
            that leaves our atelier is not merely a product—it is a legacy.
          </p>
        </motion.div>

        {/* Founder's Letter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
        >
          <div className="aspect-[4/5] relative overflow-hidden bg-[#161616]">
            <Image
              src="/products/desk-1.jpg"
              alt="Founder"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <p className="label-uppercase text-[#C9A84C] tracking-[0.3em]">A Letter from the Founder</p>
            <p className="text-[#8A8075] leading-relaxed">
              "When I founded AURUM, I made a promise: that we would never compromise on quality,
              never chase trends, and never forget that our clients trust us to create pieces
              worthy of becoming family heirlooms. Fifteen years later, that promise remains
              the foundation of everything we do."
            </p>
            <p className="text-[#F5F0E8] font-display italic text-xl">— Alexandre Durand</p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h3 className="font-display text-2xl text-[#F5F0E8] text-center mb-12">Our Journey</h3>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#C9A84C] via-[rgba(201,168,76,0.3)] to-transparent hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={cn(
                  "flex items-center gap-8",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}>
                  <div className={cn(
                    "flex-1 text-right",
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}>
                    <p className="font-display text-2xl text-[#C9A84C]">{milestone.year}</p>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[#C9A84C] relative z-10" />
                  <div className="flex-1">
                    <p className="text-[#F5F0E8]">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Press */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="label-uppercase text-[#8A8075] tracking-[0.3em] mb-8">As Seen In</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {['VOGUE', 'FT', 'WSJ', 'FORBES', 'GQ'].map((publication) => (
              <span key={publication} className="font-display text-2xl text-[#F5F0E8]">{publication}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Membership Section
function MembershipSection() {
  return (
    <section id="membership" className="py-24 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-4">Exclusive Access</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E8] mb-4">The Inner Circle</h2>
          <p className="text-[#8A8075] max-w-2xl mx-auto">
            Join a community of discerning collectors and gain access to exclusive privileges,
            early releases, and bespoke services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative p-8 border transition-all duration-500 hover:scale-[1.02]",
                tier.tier === 'black'
                  ? "bg-gradient-to-b from-[#1a1a1a] to-[#0A0A0A] border-[#C9A84C]"
                  : "bg-[#0A0A0A] border-[rgba(201,168,76,0.2)] hover:border-[rgba(201,168,76,0.5)]"
              )}
            >
              {tier.tier === 'black' && (
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
              )}

              <p className="label-uppercase text-[#C9A84C] text-xs mb-2">{tier.name}</p>
              <p className="text-[#F5F0E8] font-display text-2xl mb-1">{tier.priceText}</p>
              <p className="text-[#8A8075] text-sm mb-6">{tier.description}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                    <span className="text-[#8A8075]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={cn(
                "w-full py-3 text-sm label-uppercase transition-colors",
                tier.tier === 'black'
                  ? "bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#E8C97A]"
                  : "border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] hover:border-[#C9A84C] hover:text-[#C9A84C]"
              )}>
                {tier.isInvitationOnly ? 'Invitation Only' : 'Apply Now'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter & Contact Section
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <section id="contact" className="pb-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-4">Stay Connected</p>
            <h3 className="font-display text-3xl text-[#F5F0E8] mb-4">Join the Inner Circle</h3>
            <p className="text-[#8A8075] mb-8">
              Receive early access to new collections, exclusive invitations, and insights into our craft.
            </p>

            {isSubmitted ? (
              <div className="flex items-center gap-3 text-[#C9A84C]">
                <Check className="w-5 h-5" />
                <span>Thank you for joining</span>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="flex md:flex-row flex-col gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent border border-[rgba(201,168,76,0.3)] text-[#F5F0E8] px-4 py-3 focus:outline-none focus:border-[#C9A84C]"
                  required
                />
                <button type="submit" className="btn-luxury">
                  <span>Request Access</span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-4">Contact</p>
            <h3 className="font-display text-3xl text-[#F5F0E8] mb-8">Private Consultations</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C9A84C] mt-1" />
                <div>
                  <p className="text-[#F5F0E8]">12 Place Vendôme</p>
                  <p className="text-[#8A8075]">Paris, 75001 France</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#C9A84C] mt-1" />
                <div>
                  <p className="text-[#F5F0E8]">concierge@aurum.com</p>
                  <p className="text-[#8A8075]">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#C9A84C] mt-1" />
                <div>
                  <p className="text-[#F5F0E8]">+33 1 42 86 00 00</p>
                  <p className="text-[#8A8075]">Private Line</p>
                </div>
              </div>
            </div>

            <Link href="/appointment" className="btn-luxury mt-8">
              <span>Book a Consultation</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


// Cookie Consent
function CookieConsent() {
  const { cookieConsent, acceptCookies } = useUIStore();

  if (cookieConsent) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-[90] bg-[#111111] border-t border-[rgba(201,168,76,0.2)] p-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[#8A8075] text-sm text-center md:text-left">
          We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
        </p>
        <button onClick={acceptCookies} className="btn-luxury whitespace-nowrap">
          <span>Accept</span>
        </button>
      </div>
    </motion.div>
  );
}

// Back to Top Button
function BackToTop() {
  const { showBackToTop, setShowBackToTop } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setShowBackToTop]);

  return (
    <AnimatePresence>
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#111111] border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Reviews Section
function ReviewsSection() {
  return (
    <section className="py-24 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-4">Testimonials</p>
          <h2 className="font-display text-4xl text-[#F5F0E8]">What Our Collectors Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0A0A0A] border border-[rgba(201,168,76,0.1)] p-8"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < review.rating ? "text-[#C9A84C] fill-current" : "text-[#8A8075]")} />
                ))}
              </div>
              <p className="text-[#F5F0E8] font-display text-lg mb-4">{review.title}</p>
              <p className="text-[#8A8075] text-sm leading-relaxed mb-6">{review.content}</p>
              <div className="flex items-center justify-between">
                <p className="text-[#F5F0E8] text-sm">{review.author}</p>
                {review.verified && (
                  <span className="text-[#C9A84C] text-xs label-uppercase">Verified</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Products Carousel
function FeaturedProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const featuredProducts = products.filter(p => p.isNew || p.isLimited)
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({ left: scrollAmount * index, behavior: 'smooth' });
    }
    setCurrentIndex(index);
  };

  return (
    <section className="py-24 px-6 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-2">Curated Selection</p>
            <h2 className="font-display text-3xl text-[#F5F0E8]">Exceptional Pieces</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
              className="w-12 h-12 border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#F5F0E8] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToIndex(Math.min(products.length - 1, currentIndex + 1))}
              className="w-12 h-12 border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#F5F0E8] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-[300px] md:w-[400px] snap-start"
            >
              <div className="group relative aspect-[3/4] bg-[#161616] overflow-hidden mb-4">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {product.isNew && (
                  <span className="absolute top-4 left-4 label-uppercase text-xs text-[#0A0A0A] bg-[#C9A84C] px-3 py-1">New</span>
                )}
                {product.isLimited && !product.isNew && (
                  <span className="absolute top-4 left-4 label-uppercase text-xs text-[#C9A84C] border border-[rgba(201,168,76,0.5)] px-3 py-1">Limited</span>
                )}
              </div>

              <div className="space-y-2">
                <p className="label-uppercase text-[#8A8075] text-xs">{product.category}</p>
                <h4 className="font-display text-xl text-[#F5F0E8]">{product.name}</h4>
                <p className="text-[#C9A84C] text-lg">${product.price.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentIndex === index ? "bg-[#C9A84C] w-8" : "bg-[rgba(201,168,76,0.3)]"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    { icon: Package, title: 'White-Glove Delivery', description: 'Complimentary worldwide shipping with dedicated handling' },
    { icon: Gift, title: 'Gift Packaging', description: 'Signature presentation boxes for every piece' },
    { icon: Shield, title: 'Lifetime Guarantee', description: 'Comprehensive coverage for craftsmanship' },
    { icon: Diamond, title: 'Bespoke Services', description: 'Custom commissions for discerning collectors' }
  ];

  return (
    <section className="py-24 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-4">Services</p>
          <h2 className="font-display text-4xl text-[#F5F0E8]">The AURUM Experience</h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0A] transition-colors">
                <service.icon className="w-7 h-7" />
              </div>
              <h4 className="font-display text-xl text-[#F5F0E8] mb-2">{service.title}</h4>
              <p className="text-[#8A8075] text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Image Zoom Modal
function ImageZoomModal({ src, alt, isOpen, onClose }: { src: string; alt: string; isOpen: boolean; onClose: () => void }) {
  const [scale, setScale] = useState(1);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8A8075] hover:text-[#F5F0E8] z-10"
        >
          <X className="w-8 h-8" />
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-5xl max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={1600}
            className="object-contain max-h-[90vh]"
            style={{ transform: `scale(${scale})`, transition: 'transform 0.3s ease' }}
          />
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => setScale(Math.max(1, scale - 0.5))}
            className="w-10 h-10 border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#F5F0E8] hover:border-[#C9A84C]"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-[#8A8075] text-sm">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale(Math.min(3, scale + 0.5))}
            className="w-10 h-10 border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#F5F0E8] hover:border-[#C9A84C]"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Collection Detail Sections
function CollectionDetailSection() {
  const obsidianProducts = products.filter(p => p.collection === 'The Obsidian Series');
  const maisonProducts = products.filter(p => p.collection === 'La Maison Capsule');
  const homeProducts = products.filter(p => p.collection === 'Aurum Home Objects');
  const archiveProducts = products.filter(p => p.collection === 'The Archive');

  return (
    <>
      {/* The Obsidian Series */}
      <section id="collection-obsidian-series" className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-4">Watches</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E8] mb-6">The Obsidian Series</h2>
            <p className="text-[#8A8075] max-w-2xl leading-relaxed">
              Timepieces that transcend time. Each watch in this collection represents the pinnacle of horological achievement,
              crafted with Swiss precision and finished by master artisans in our Geneva atelier.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {obsidianProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* La Maison Capsule */}
      <section id="collection-maison-capsule" className="py-24 px-6 bg-[#111111]">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-4">Clothing</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E8] mb-6">La Maison Capsule</h2>
            <p className="text-[#8A8075] max-w-2xl leading-relaxed">
              Exceptional garments for exceptional moments. Limited production, unlimited refinement.
              Each piece is crafted from the finest materials sourced from the world's most prestigious mills.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {maisonProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Aurum Home Objects */}
      <section id="collection-home-objects" className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-4">Lifestyle</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E8] mb-6">Aurum Home Objects</h2>
            <p className="text-[#8A8075] max-w-2xl leading-relaxed">
              Objects that transform spaces into sanctuaries. Each piece is designed for those who appreciate
              the art of living, combining functionality with unparalleled aesthetics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* The Archive */}
      <section id="collection-archive" className="py-24 px-6 bg-[#111111]">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-4">Rare Pieces</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E8] mb-6">The Archive</h2>
            <p className="text-[#8A8075] max-w-2xl leading-relaxed">
              Limited editions, discontinued styles, and one-of-a-kind pieces. Once gone, they are gone forever.
              Each Archive piece comes with a certificate of authenticity and provenance documentation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {archiveProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Client Services Section
function ClientServicesSection() {
  return (
    <section id="client-services" className="pt-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="label-uppercase text-[#C9A84C] tracking-[0.4em] mb-4">Support</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#F5F0E8] mb-6">Client Services</h2>
          <p className="text-[#8A8075] max-w-2xl mx-auto">
            Our dedicated client services team is available to assist you with any inquiries.
            Experience the AURUM standard of personalized care.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function AurumPage() {
  return (
    <main className="relative bg-[#0A0A0A] min-h-screen custom-cursor">
      <CustomCursor />
      <FilmGrain />

      {/* <Navigation /> */}
      <SearchOverlay />
      <QuickViewModal />
      <CartDrawer />
      <CheckoutModal />

      <HeroSection />
      <BrandStatement />
      <FeaturedCollections />
      <FeaturedProductsCarousel />
      <EditorChoice />
      <ServicesSection />
      <ProductGrid />

      {/* Collection Detail Sections */}
      <CollectionDetailSection />

      <ReviewsSection />
      <LookbookSection />
      <AtelierSection />
      <AboutSection />
      <MembershipSection />

      {/* Client Services */}
      <ClientServicesSection />

      <NewsletterSection />
      <CookieConsent />
      <BackToTop />
    </main>
  );
}
