"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchIcon, ShoppingBagIcon, MenuIcon, XIcon, HeartIcon, UserIcon } from "@animateicons/react/lucide";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

/**
 * Structure defining a Navigation Link item.
 */
interface NavLink {
  label: string;
  href: string;
}

/**
 * Array of main navigation link objects.
 * Edit this list to update links globally in both Desktop and Mobile menus.
 */
const NAV_LINKS: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Tshirt", href: "/tshirt" },
  { label: "Hoodie", href: "/hoodie" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * The brand-aligned Navbar navigation shell for Casual Vastram.
 * Redesigned for Awwward-level Luxury Minimal aesthetic.
 */
export default function Navbar() {
  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Live Zustand stores data integration
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.length;

  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems.length;

  /**
   * Action trigger: Auto-focus the search text field when
   * the search bar overlay is toggled open by the user.
   */
  React.useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Scroll detection for frosted glass effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isScrolled || isMobileMenuOpen || isSearchOpen 
          ? "bg-snow-white/90 backdrop-blur-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] py-2" 
          : "bg-snow-white py-5"
      )}
    >
      {/* Main Navbar Container */}
      <div className="w-full px-6 md:px-10 flex items-center justify-between">
        
        {/* Left: Desktop Navigation Links */}
        <nav className="hidden lg:flex flex-1 items-center gap-8 group/nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative px-1 py-2 font-inter text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap transition-opacity duration-300 hover:!opacity-100 group-hover/nav:opacity-40"
            >
              <span className="relative flex overflow-hidden">
                <span className="block text-graphite-gray transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  {link.label}
                </span>
                <span className="absolute top-full block text-jet-black transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full" aria-hidden="true">
                  {link.label}
                </span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Left: Mobile Menu Toggle Button */}
        <div className="lg:hidden flex flex-1 items-center">
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsSearchOpen(false); // Close search when opening menu
            }}
            className="p-2 -ml-2 text-jet-black hover:text-graphite-gray transition-all cursor-pointer rounded-full hover:bg-black/5 active:scale-95"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        {/* Center: Brand Logo SVG */}
        <div className="flex flex-1 justify-center items-center">
          <Link href="/" className="flex items-center group">
            <Image
              src="/assets/casual-vastram-logo-black.svg"
              alt="Casual Vastram Logo"
              width={200}
              height={34}
              className="h-[24px] md:h-[28px] w-auto select-none transition-opacity duration-300 group-hover:opacity-60"
              priority
            />
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-1 justify-end items-center gap-1 md:gap-2">
          {/* Search Button */}
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setIsMobileMenuOpen(false); // Close mobile menu when opening search
            }}
            className={cn(
              "p-2 text-jet-black hover:text-graphite-gray transition-all cursor-pointer rounded-full hover:bg-black/5 active:scale-95",
              isSearchOpen ? "text-graphite-gray bg-black/5" : ""
            )}
            aria-label="Search"
          >
            <SearchIcon size={18} />
          </button>

          {/* User/Account Button */}
          <Link
            href="/account"
            className="hidden md:flex p-2 text-jet-black hover:text-graphite-gray transition-all cursor-pointer rounded-full hover:bg-black/5 active:scale-95"
            aria-label="Account"
          >
            <UserIcon size={18} />
          </Link>

          {/* Wishlist Button */}
          <Link
            href="/wishlist"
            className="p-2 text-jet-black hover:text-graphite-gray transition-all cursor-pointer relative rounded-full hover:bg-black/5 active:scale-95 flex items-center justify-center"
            aria-label="Wishlist"
          >
            <HeartIcon size={18} />
            {wishlistCount > 0 && (
              <span className="absolute 1 top-0 right-0 min-w-[16px] h-[16px] bg-jet-black text-snow-white text-[9px] font-bold font-inter flex items-center justify-center rounded-full select-none">
                {wishlistCount}
              </span>
            )}
          </Link>
          
          {/* Shopping Bag Button */}
          <Link
            href="/cart"
            className="p-2 text-jet-black hover:text-graphite-gray transition-all cursor-pointer relative rounded-full hover:bg-black/5 active:scale-95 flex items-center justify-center"
            aria-label="Shopping bag"
          >
            <ShoppingBagIcon size={18} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-0 right-0 min-w-[16px] h-[16px] bg-jet-black text-snow-white text-[9px] font-bold font-inter flex items-center justify-center rounded-full select-none"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>

      {/* Slide-Down Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full left-0 w-full bg-snow-white/95 backdrop-blur-md overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)]"
          >
            <div className="w-full max-w-4xl mx-auto px-6 py-10 flex items-center gap-6">
              <div className="relative flex-1 group">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="SEARCH COLLECTION..."
                  className="w-full bg-transparent text-jet-black placeholder-graphite-gray/40 border-b-2 border-black/10 px-0 py-4 text-xl sm:text-2xl font-syne font-bold uppercase tracking-[0.04em] focus:outline-none focus:border-jet-black transition-colors"
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-3 text-jet-black hover:text-graphite-gray transition-transform hover:rotate-90 duration-300 rounded-full"
                aria-label="Close search"
              >
                <XIcon size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full h-[calc(100vh-60px)] bg-snow-white/95 backdrop-blur-2xl z-40 md:hidden flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col p-8 pt-12 gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    href={link.href}
                    className="font-syne text-3xl font-bold uppercase tracking-tight text-jet-black hover:text-graphite-gray transition-colors inline-block relative overflow-hidden group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-jet-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="p-8 pb-12 flex flex-col gap-6"
            >
              <Link
                href="/account"
                className="font-inter text-[12px] font-semibold tracking-[0.15em] uppercase text-graphite-gray hover:text-jet-black transition-colors flex items-center gap-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <UserIcon size={18} />
                <span>My Account</span>
              </Link>
              
              <Link
                href="/wishlist"
                className="font-inter text-[12px] font-semibold tracking-[0.15em] uppercase text-graphite-gray hover:text-jet-black transition-colors flex items-center gap-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HeartIcon size={18} />
                <span>Wishlist</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Named export for compatibility
export { Navbar as MarionHeader };
