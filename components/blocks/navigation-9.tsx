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
  { label: "Contact", href: "/contact" },
];

export default function Navigation9() {
  const pathname = usePathname();
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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.nav
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex items-center justify-between transition-all duration-300 ease-out ${
            scrolled
              ? "rounded-2xl bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)] py-2 px-4"
              : "rounded-none bg-transparent border border-transparent py-3 px-0"
          }`}
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-semibold shrink-0"
          >
            <span className="grid place-items-center h-7 w-7 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold tracking-tighter">
              D
            </span>
            <span className="tracking-tight text-sm sm:text-base">DTC Policy Lab</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-neutral-900 dark:text-white underline underline-offset-4"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-2">
            <a
              href="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:opacity-85 transition-opacity"
            >
              Get in Touch
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid place-items-center h-9 w-9 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
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
              className="md:hidden mt-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl p-4 flex flex-col gap-1 shadow-lg"
            >
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm py-2.5 px-2 rounded-lg transition-colors ${
                    pathname === l.href
                      ? "font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 text-center w-full px-4 py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium"
              >
                Get in Touch
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
