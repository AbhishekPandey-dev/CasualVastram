import Link from 'next/link';
import Image from 'next/image';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "T-Shirts", href: "/tshirts" },
      { label: "Hoodies", href: "/hoodies" },
    ],
  },
  {
    title: "Info",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

interface SocialLink {
  label: string;
  href: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter", href: "https://twitter.com" },
];

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
        <div className="max-w-[var(--max-width-site)] mx-auto px-5 sm:px-6 pt-12 pb-12 lg:pt-20 lg:pb-20">

          {/* Top Row: Logo + Nav Grid */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10 lg:gap-8">

            {/* Left: Brand Identity */}
            <div className="flex flex-col w-full lg:max-w-[420px]">
              <div className="relative w-[200px] sm:w-[320px] lg:w-[400px] h-[26px] sm:h-[40px] lg:h-[50px] mb-5 lg:mb-8">
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

            {/* Right: Navigation Columns — always 3-col for compact mobile */}
            <div className="grid grid-cols-3 gap-y-8 gap-x-6 sm:gap-x-16 lg:gap-x-20 w-full lg:max-w-[600px]">
              {FOOTER_COLUMNS.map((column) => (
                <nav key={column.title} aria-label={`${column.title} links`}>
                  <h3 className="font-inter text-[11px] text-graphite-gray uppercase tracking-[0.15em] mb-3 lg:mb-6 font-semibold">
                    {column.title}
                  </h3>
                  <ul className="flex flex-col gap-[4px] lg:gap-[6px]">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="font-inter text-[13px] sm:text-[14px] text-snow-white hover:text-graphite-gray transition-colors py-1.5 sm:py-2 block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          {/* Newsletter Row */}
          <div className="mt-10 pt-8 lg:mt-20 lg:pt-10 border-t border-graphite-gray">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
              <div className="md:max-w-[320px]">
                <h3 className="font-syne text-[14px] lg:text-[15px] font-semibold uppercase tracking-[0.08em] mb-2 lg:mb-3 text-snow-white">
                  Newsletter
                </h3>
                <p className="font-inter text-[12px] leading-[1.6] text-graphite-gray">
                  New drops and exclusive access. No noise.
                </p>
              </div>
              <form className="flex w-full md:max-w-[380px] items-stretch">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent border border-graphite-gray text-snow-white placeholder:text-graphite-gray px-4 py-3 font-inter text-base md:text-[12px] tracking-[0.05em] rounded-none focus:outline-none focus:border-snow-white transition-colors"
                  required
                  aria-label="Email address for newsletter"
                  suppressHydrationWarning
                />
                <button
                  type="submit"
                  className="bg-snow-white text-jet-black font-inter text-[12px] md:text-[11px] font-medium uppercase tracking-[0.1em] px-5 sm:px-6 py-3 rounded-none hover:bg-graphite-gray hover:text-snow-white transition-colors duration-200 cursor-pointer -ml-px"
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
        <div className="max-w-[var(--max-width-site)] mx-auto px-5 sm:px-6 py-4 lg:py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span className="font-inter text-[11px] md:text-[10px] text-graphite-gray tracking-[0.1em]">
            © {new Date().getFullYear()} Casual Vastram. All rights reserved.
          </span>
          <div className="flex gap-5 sm:gap-6 font-inter text-[11px] md:text-[10px] tracking-[0.1em]">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-graphite-gray hover:text-snow-white transition-colors py-1 block"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
