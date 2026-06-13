import Link from 'next/link';
import Image from 'next/image';

/**
 * Award-level premium footer for Casual Vastram.
 * Inspired by Acne Studios, Fear of God, COS — radical restraint,
 * confident whitespace, typography as the sole design element.
 */
export default function Footer() {
  return (
    <footer
      className="bg-jet-black text-snow-white w-full mt-auto"
      role="contentinfo"
    >
      {/* ─── Main Content ─── */}
      <div className="w-full border-t border-graphite-gray">
        <div className="max-w-[var(--max-width-site)] mx-auto px-6 pt-20 pb-20">

          {/* Top Row: Logo + Nav Grid */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-16 lg:gap-0">

            {/* Left: Brand Identity */}
            <div className="flex flex-col lg:max-w-[340px]">
              <div className="relative w-[200px] md:w-[240px] h-[26px] md:h-[30px] mb-8">
                <Image
                  src="/assets/casual-vastram-logo-white.svg"
                  alt="Casual Vastram"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <p className="font-inter text-[13px] leading-[1.7] text-graphite-gray">
                Premium oversized streetwear for the
                <br className="hidden sm:inline" />
                {' '}creatively restless.
              </p>
            </div>

            {/* Right: Navigation Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-16 lg:gap-x-20 gap-y-12">
              {/* Shop */}
              <nav aria-label="Shop links">
                <h3 className="font-inter text-[11px] text-graphite-gray uppercase tracking-[0.15em] mb-6">
                  Shop
                </h3>
                <ul className="flex flex-col gap-[14px]">
                  <li>
                    <Link href="/shop" className="font-inter text-[13px] text-snow-white hover:text-graphite-gray transition-colors">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/tshirts" className="font-inter text-[13px] text-snow-white hover:text-graphite-gray transition-colors">
                      T-Shirts
                    </Link>
                  </li>
                  <li>
                    <Link href="/hoodies" className="font-inter text-[13px] text-snow-white hover:text-graphite-gray transition-colors">
                      Hoodies
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Info */}
              <nav aria-label="Info links">
                <h3 className="font-inter text-[11px] text-graphite-gray uppercase tracking-[0.15em] mb-6">
                  Info
                </h3>
                <ul className="flex flex-col gap-[14px]">
                  <li>
                    <Link href="/about" className="font-inter text-[13px] text-snow-white hover:text-graphite-gray transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="font-inter text-[13px] text-snow-white hover:text-graphite-gray transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="font-inter text-[13px] text-snow-white hover:text-graphite-gray transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Legal */}
              <nav aria-label="Legal links" className="col-span-2 sm:col-span-1">
                <h3 className="font-inter text-[11px] text-graphite-gray uppercase tracking-[0.15em] mb-6">
                  Legal
                </h3>
                <ul className="flex flex-col gap-[14px]">
                  <li>
                    <Link href="/privacy-policy" className="font-inter text-[13px] text-snow-white hover:text-graphite-gray transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-of-service" className="font-inter text-[13px] text-snow-white hover:text-graphite-gray transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Newsletter Row — separated by breathing space */}
          <div className="mt-20 pt-10 border-t border-graphite-gray">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="md:max-w-[320px]">
                <h3 className="font-syne text-[15px] font-semibold uppercase tracking-[0.08em] mb-3 text-snow-white">
                  Newsletter
                </h3>
                <p className="font-inter text-[12px] leading-[1.6] text-graphite-gray">
                  New drops and exclusive access. No noise.
                </p>
              </div>
              <form className="flex w-full md:max-w-[380px]">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent border border-graphite-gray text-snow-white placeholder:text-graphite-gray px-4 py-3 font-inter text-[12px] tracking-[0.05em] rounded-none focus:outline-none focus:border-snow-white transition-colors"
                  required
                  aria-label="Email address for newsletter"
                  suppressHydrationWarning
                />
                <button
                  type="submit"
                  className="bg-snow-white text-jet-black font-inter text-[11px] font-medium uppercase tracking-[0.1em] px-6 py-3 rounded-none hover:bg-graphite-gray hover:text-snow-white transition-colors duration-200 cursor-pointer -ml-px"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="w-full border-t border-graphite-gray">
        <div className="max-w-[var(--max-width-site)] mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-inter text-[10px] text-graphite-gray tracking-[0.1em]">
            © {new Date().getFullYear()} Casual Vastram. All rights reserved.
          </span>
          <div className="flex gap-6 font-inter text-[10px] tracking-[0.1em]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-graphite-gray hover:text-snow-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-graphite-gray hover:text-snow-white transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
