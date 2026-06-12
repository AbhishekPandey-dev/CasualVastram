"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, Heart, User } from "lucide-react";
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
 * Handles responsive layout sizing, mobile menu overlays, slide-down search bar toggles,
 * and live cart/wishlist Zustand store indicators.
 */
export default function Navbar() {
  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
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

  return (
    <header className="relative w-full bg-snow-white text-jet-black border-b border-border-color z-50">
      {/* Main Navbar Container */}
      <div className="w-full px-4 md:px-6 h-[56px] flex items-center justify-between">
        
        {/* Left: Desktop Navigation Links */}
        <nav className="hidden md:flex flex-1 items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-inter text-[12px] font-medium tracking-[0.1em] uppercase text-graphite-gray hover:text-jet-black transition-colors duration-250 relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-jet-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]" />
            </Link>
          ))}
        </nav>

        {/* Left: Mobile Menu Toggle Button */}
        <div className="md:hidden flex flex-1 items-center">
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsSearchOpen(false); // Close search when opening menu
            }}
            className="p-1 text-jet-black hover:text-graphite-gray transition-colors cursor-pointer rounded-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Center: Brand Logo SVG (Black variant on Snow White bg) */}
        <div className="flex flex-1 justify-center items-center">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src="/assets/casual-vastram-logo-black.svg"
              alt="Casual Vastram Logo"
              className="h-[22px] md:h-[26px] w-auto select-none"
            />
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-1 justify-end items-center gap-3 md:gap-4">
          {/* Search Button */}
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setIsMobileMenuOpen(false); // Close mobile menu when opening search
            }}
            className={cn(
              "p-1.5 text-jet-black hover:text-graphite-gray transition-colors cursor-pointer rounded-none",
              isSearchOpen ? "text-graphite-gray" : ""
            )}
            aria-label="Search"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>

          {/* User/Account Button */}
          <Link
            href="/account"
            className="hidden md:flex p-1.5 text-jet-black hover:text-graphite-gray transition-colors cursor-pointer rounded-none"
            aria-label="Account"
          >
            <User size={18} strokeWidth={1.5} />
          </Link>

          {/* Wishlist Button */}
          <Link
            href="/wishlist"
            className="p-1.5 text-jet-black hover:text-graphite-gray transition-colors cursor-pointer relative rounded-none flex items-center justify-center"
            aria-label="Wishlist"
          >
            <Heart size={18} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-jet-black text-snow-white text-[9px] font-bold font-inter flex items-center justify-center border border-border-color rounded-none select-none">
                {wishlistCount}
              </span>
            )}
          </Link>
          
          {/* Shopping Bag Button */}
          <Link
            href="/cart"
            className="p-1.5 text-jet-black hover:text-graphite-gray transition-colors cursor-pointer relative rounded-none flex items-center justify-center"
            aria-label="Shopping bag"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-jet-black text-snow-white text-[9px] font-bold font-inter flex items-center justify-center border border-border-color rounded-none select-none">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Slide-Down Search Overlay Drawer */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-[56px] left-0 w-full bg-snow-white border-b border-border-color z-40"
          >
            <div className="w-full px-4 md:px-6 py-6 flex items-center gap-4">
              <div className="relative flex-1">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="SEARCH STREETWEAR..."
                  className="w-full bg-snow-white text-jet-black placeholder-graphite-gray border border-border-color rounded-none px-4 py-3 text-sm font-inter uppercase tracking-[0.06em] focus:outline focus:outline-2 focus:outline-jet-black focus:outline-offset-2 focus:border-jet-black transition-all"
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-3 border border-border-color text-jet-black hover:text-graphite-gray hover:border-jet-black transition-colors cursor-pointer rounded-none flex items-center justify-center"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-[56px] left-0 w-full bg-snow-white border-t border-border-color md:hidden overflow-y-auto max-h-[calc(100vh-56px)] z-40"
          >
            <div className="flex flex-col p-6 gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-inter text-[14px] font-semibold tracking-[0.12em] uppercase text-jet-black hover:text-graphite-gray transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Account Link in Mobile Menu with User Icon */}
              <Link
                href="/account"
                className="font-inter text-[14px] font-semibold tracking-[0.12em] uppercase text-jet-black hover:text-graphite-gray transition-colors flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} strokeWidth={1.5} />
                <span>Account</span>
              </Link>
              
              <div className="pt-6 border-t border-border-color/10 flex flex-col gap-4 text-graphite-gray text-xs font-inter uppercase tracking-[0.08em]">
                <Link
                  href="/wishlist"
                  className="hover:text-jet-black transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Wishlist
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Named export for compatibility
export { Navbar as MarionHeader };
