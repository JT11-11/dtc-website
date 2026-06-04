"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useOverlay } from "@/lib/overlay-context";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/work" },
  { label: "Database", href: "/work/database" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation9() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isOverlayOpen } = useOverlay();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isOverlayOpen) return null;

  const navClassName = isHomepage
    ? scrolled
      ? "rounded-2xl bg-black border border-neutral-800/80 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.4)] py-2 px-4"
      : "rounded-2xl glass-nav py-2 px-4"
    : scrolled
      ? "rounded-2xl bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)] py-2 px-4"
      : "rounded-none bg-transparent border border-transparent py-3 px-0";

  const logoClassName = isHomepage
    ? scrolled
      ? "flex items-center gap-2.5 text-white font-semibold shrink-0"
      : "flex items-center gap-2.5 text-white font-semibold shrink-0 drop-shadow-sm"
    : "flex items-center gap-2.5 text-neutral-900 dark:text-white font-semibold shrink-0";

  const activeUnderline = "underline underline-offset-[6px] decoration-2 decoration-[var(--un-blue)]";

  const linkClassName = (isActive: boolean) => {
    if (isHomepage) {
      return scrolled
        ? isActive
          ? `text-sm font-medium transition-colors text-white ${activeUnderline}`
          : "text-sm font-medium transition-colors text-neutral-400 hover:text-white"
        : isActive
          ? `text-sm font-medium transition-colors text-white drop-shadow-sm ${activeUnderline}`
          : "text-sm font-medium transition-colors text-white/75 hover:text-white drop-shadow-sm";
    }
    return isActive
      ? `text-sm font-medium transition-colors text-foreground ${activeUnderline}`
      : "text-sm font-medium transition-colors text-muted-foreground hover:text-foreground";
  };

  // Brand CTA - Discord, always Sky Blue (reads on both the black hero and light pages).
  const ctaClassName =
    "hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-[var(--sky-blue)] text-[#08323d] text-sm font-semibold hover:brightness-105 transition";

  const menuButtonClassName = isHomepage
    ? scrolled
      ? "md:hidden grid place-items-center h-9 w-9 rounded-lg border border-neutral-700 text-white"
      : "md:hidden grid place-items-center h-9 w-9 rounded-lg border border-white/25 text-white"
    : "md:hidden grid place-items-center h-9 w-9 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white";

  const mobileMenuClassName = isHomepage
    ? scrolled
      ? "md:hidden mt-2 rounded-2xl border border-neutral-800 bg-neutral-950/95 backdrop-blur-xl p-4 flex flex-col gap-1 shadow-lg"
      : "md:hidden mt-2 rounded-2xl glass-nav p-4 flex flex-col gap-1"
    : "md:hidden mt-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl p-4 flex flex-col gap-1 shadow-lg";

  const mobileLinkClassName = (isActive: boolean) => {
    if (isHomepage) {
      return scrolled
        ? isActive
          ? "text-sm py-2.5 px-2 rounded-lg transition-colors font-semibold text-white bg-neutral-800"
          : "text-sm py-2.5 px-2 rounded-lg transition-colors text-neutral-300 hover:bg-neutral-900"
        : isActive
          ? "text-sm py-2.5 px-2 rounded-lg transition-colors font-semibold text-white bg-white/15"
          : "text-sm py-2.5 px-2 rounded-lg transition-colors text-white/80 hover:bg-white/10 hover:text-white";
    }
    return isActive
      ? "text-sm py-2.5 px-2 rounded-lg transition-colors font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
      : "text-sm py-2.5 px-2 rounded-lg transition-colors text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900";
  };

  const mobileCtaClassName =
    "mt-1 text-center w-full px-4 py-2.5 rounded-full bg-[var(--sky-blue)] text-[#08323d] text-sm font-semibold";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.nav
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex items-center justify-between transition-all duration-300 ease-out ${navClassName}`}
        >
          {/* Logo - emblem placeholder (swap for real gold-ring emblem asset) + wordmark */}
          <a href="/" className={logoClassName} aria-label="DTC Youth Policy Lab home">
            <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black ring-2 ring-[var(--sun-gold)]">
              <span className="block h-3 w-3 rounded-full bg-[var(--un-blue)]" />
              <span className="absolute inset-[3px] rounded-full ring-1 ring-white/20" />
            </span>
            <span className="tracking-tight text-sm sm:text-base">DTC Youth Policy Lab</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={linkClassName(pathname === link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-2">
            <a
              href="https://discord.gg/dtcpolicylab"
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClassName}
            >
              Discord
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className={menuButtonClassName}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={mobileMenuClassName}
            >
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={mobileLinkClassName(pathname === l.href)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://discord.gg/dtcpolicylab"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={mobileCtaClassName}
              >
                Discord
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
