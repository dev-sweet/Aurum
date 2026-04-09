'use client'
import { collections } from "@/data/products";
import { cn } from "@/lib/utils";
import { useCartStore, useUIStore, useWishlistStore } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Navigation Component
export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
    const { openSearch, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
    const { items: cartItems, toggleCart, getTotalItems } = useCartStore();
    const { items: wishlistItems } = useWishlistStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Collections', href: '/#collections' },
        { name: 'Lookbook', href: '/#lookbook' },
        { name: 'Atelier', href: '/#atelier' },
        { name: 'About', href: '/about' }
    ];

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 h-[60px] transition-all duration-500',
                    isScrolled ? 'glass border-b border-[rgba(201,168,76,0.15)]' : 'bg-transparent'
                )}
            >
                <div className="max-w-[1800px] mx-auto h-full px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="font-display text-2xl tracking-[0.2em] text-[#C9A84C] font-medium">
                        AURUM
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-12">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative mega-menu-trigger"
                                onMouseEnter={() => link.name === 'Collections' && setIsCollectionsOpen(true)}
                                onMouseLeave={() => link.name === 'Collections' && setIsCollectionsOpen(false)}
                            >
                                <Link
                                    href={link.href}
                                    className="label-uppercase text-[#F5F0E8] hover:text-[#C9A84C] transition-colors duration-300 gold-underline"
                                >
                                    {link.name}
                                </Link>

                                {/* Mega Menu for Collections */}
                                {link.name === 'Collections' && (
                                    <div className="mega-menu absolute top-full left-1/2 -translate-x-1/2 pt-4">
                                        <div className="bg-[#111111] border border-[rgba(201,168,76,0.2)] p-8 grid grid-cols-4 gap-6 min-w-[800px]">
                                            {collections.map((collection) => (

                                                <Link
                                                    key={collection.id}
                                                    href={`#collection-${collection.slug}`}
                                                    className={`group block rounded-sm overflow-hidden`}
                                                >
                                                    -<div className="aspect-[4/5] bg-[#161616] mb-3 overflow-hidden">
                                                        <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] group-hover:scale-105 transition-transform duration-700">
                                                            <Image className='w-full h-full' src={collection.image} alt={collection.name} width={500} height={500} />
                                                        </div>
                                                    </div>
                                                    <p className="label-uppercase text-[#C9A84C] text-xs mb-1">{collection.category}</p>
                                                    <p className="text-[#F5F0E8] font-display text-lg">{collection.name}</p>

                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-6">
                        <button onClick={openSearch} className="text-[#F5F0E8] hover:text-[#C9A84C] transition-colors duration-300">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link href="#wishlist" className="relative text-[#F5F0E8] hover:text-[#C9A84C] transition-colors duration-300">
                            <Heart className="w-5 h-5" />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#C9A84C] text-[#0A0A0A] text-xs flex items-center justify-center rounded-full">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>
                        <button onClick={toggleCart} className="relative text-[#F5F0E8] hover:text-[#C9A84C] transition-colors duration-300">
                            <ShoppingBag className="w-5 h-5" />
                            {getTotalItems() > 0 && (
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#C9A84C] text-[#0A0A0A] text-xs flex items-center justify-center rounded-full">
                                    {getTotalItems()}
                                </span>
                            )}
                        </button>
                        <button className="hidden lg:block text-[#F5F0E8] hover:text-[#C9A84C] transition-colors duration-300">
                            <User className="w-5 h-5" />
                        </button>
                        <button onClick={toggleMobileMenu} className="lg:hidden text-[#F5F0E8]">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-[#0A0A0A]"
                    >
                        <div className="h-[60px] flex items-center justify-between px-6">
                            <span className="font-display text-2xl tracking-[0.2em] text-[#C9A84C] font-medium">AURUM</span>
                            <button onClick={closeMobileMenu} className="text-[#F5F0E8]">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)] gap-8">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={closeMobileMenu}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="font-display text-3xl text-[#F5F0E8] hover:text-[#C9A84C] transition-colors"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}