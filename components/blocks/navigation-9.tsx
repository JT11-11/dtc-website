"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Home, Users, Briefcase, Handshake, Mail, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useOverlay } from "@/lib/overlay-context";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About Us", href: "/about", icon: Users },
  { label: "Our Work", href: "/work", icon: Briefcase },
  { label: "Partners", href: "/partners", icon: Handshake },
  { label: "Contact", href: "/contact", icon: Mail },
];

export default function Navigation9() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isOverlayOpen } = useOverlay();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (isOverlayOpen) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 pointer-events-none">
      <div className="w-full max-w-5xl pointer-events-auto relative">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-black text-white rounded-full border border-neutral-800/70 shadow-none"
        >
          <div className="flex items-center justify-between h-14 sm:h-[60px] px-4 sm:px-6 lg:px-8 gap-3">
            {/* Logo & Brand */}
            <a
              href="/"
              className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity min-w-0"
              aria-label="DTC Youth Policy Lab home"
            >
              <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden border border-neutral-700 bg-black shrink-0">
                <Image
                  src="/images/brand/youth-policy-lab-emblem.png"
                  alt="DTC Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-sans font-bold text-sm sm:text-[15px] tracking-tight text-white truncate hidden sm:block">
                DTC Youth Policy Lab
              </span>
            </a>

            {/* Desktop Navigation — icons with hover tooltips */}
            <div className="hidden md:flex items-center gap-1 sm:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="relative flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full group transition-colors"
                  >
                    <Icon
                      className={`h-[18px] w-[18px] sm:h-5 sm:w-5 transition-all duration-200 ${
                        isActive
                          ? "text-white scale-110"
                          : "text-neutral-400 group-hover:text-white group-hover:scale-110"
                      }`}
                    />
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-4 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="absolute top-full mt-2 px-2.5 py-1.5 bg-white text-black text-[11px] font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 scale-95 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 z-50">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Right: Discord CTA & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href="https://discord.gg/EGg4jpP4Sk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white hover:bg-neutral-100 text-black text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Image
                  src="/logo/Discord-Symbol-Black.png"
                  alt="Discord logo"
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 object-contain"
                />
                <span>Discord</span>
              </a>

              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden grid place-items-center h-8 w-8 rounded-full border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Mobile dropdown — separate card below the pill */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-2xl border border-neutral-800/70 bg-black px-3 py-3 flex flex-col gap-1 shadow-none md:hidden"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 text-sm font-medium py-2.5 px-3 rounded-xl transition-colors ${
                      isActive
                        ? "text-white bg-neutral-900 font-semibold"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-900/50"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
