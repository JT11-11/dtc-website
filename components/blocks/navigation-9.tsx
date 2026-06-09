"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Home, Users, Briefcase, Database, Handshake, Mail, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useOverlay } from "@/lib/overlay-context";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About Us", href: "/about", icon: Users },
  { label: "Our Work", href: "/work", icon: Briefcase },
  { label: "Database", href: "/work/database", icon: Database },
  { label: "Partners", href: "/partners", icon: Handshake },
  { label: "Contact", href: "/contact", icon: Mail },
];

export default function Navigation9() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [open, setOpen] = useState(false);
  const { isOverlayOpen } = useOverlay();

  if (isOverlayOpen) return null;

  const navClassName = isHomepage
    ? "w-full bg-black/80 backdrop-blur-md border-b border-neutral-900"
    : "w-full bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80";

  const discordLogoSrc = isHomepage
    ? "/logo/Discord-Symbol-Blurple.png"
    : "/logo/Discord-Symbol-Black.png";

  const ctaClassName = isHomepage
    ? "hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-transparent hover:bg-white/5 border border-white/10 text-white text-sm font-medium transition-all"
    : "hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-transparent hover:bg-black/5 border border-black/10 text-neutral-900 dark:text-white dark:border-white/10 dark:hover:bg-white/5 text-sm font-medium transition-all";

  const menuButtonClassName = isHomepage
    ? "md:hidden grid place-items-center h-9 w-9 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-all"
    : "md:hidden grid place-items-center h-9 w-9 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all";

  const mobileMenuClassName = isHomepage
    ? "absolute top-full left-0 right-0 w-full border-b border-neutral-900 bg-black/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-1 shadow-lg md:hidden"
    : "absolute top-full left-0 right-0 w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-1 shadow-lg md:hidden";

  const mobileLinkClassName = (isActive: boolean) => {
    if (isHomepage) {
      return isActive
        ? "text-sm py-2.5 px-2 rounded-lg transition-colors font-semibold text-white bg-neutral-900"
        : "text-sm py-2.5 px-2 rounded-lg transition-colors text-white/45 hover:bg-neutral-900 hover:text-white/95";
    }
    return isActive
      ? "text-sm py-2.5 px-2 rounded-lg transition-colors font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-900"
      : "text-sm py-2.5 px-2 rounded-lg transition-colors text-neutral-900/45 dark:text-white/45 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900/95 dark:hover:text-white/95";
  };

  const mobileCtaClassName = isHomepage
    ? "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-transparent hover:bg-white/5 border border-white/10 text-white text-sm font-medium transition-all"
    : "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-transparent hover:bg-black/5 border border-black/10 text-neutral-900 dark:text-white dark:border-white/10 dark:hover:bg-white/5 text-sm font-medium transition-all";

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`relative w-full transition-all duration-300 ease-out ${navClassName}`}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16 relative">
          {/* Left: Fully Rounded Emblem Logo */}
          <a href="/" className="flex items-center shrink-0" aria-label="DTC Youth Policy Lab home">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm bg-black flex items-center justify-center hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/brand/youth-policy-lab-emblem.png"
                alt="DTC Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </a>

          {/* Center: Desktop Navigation Icons (Perfectly Centered like Facebook) */}
          <div className="hidden md:flex items-center h-full absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative flex items-center justify-center h-16 px-6 lg:px-8 group transition-all"
                >
                  <Icon
                    className={`h-[22px] w-[22px] transition-all duration-200 ${
                      isActive
                        ? "text-[var(--un-blue)] scale-110"
                        : isHomepage
                        ? "text-white/45 group-hover:text-white/95 group-hover:scale-110"
                        : "text-neutral-900/45 dark:text-white/45 group-hover:text-neutral-900/95 dark:group-hover:text-white/95 group-hover:scale-110"
                    }`}
                  />
                  
                  {/* Thin active underline - Option B (classic trusted pattern) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--un-blue)] rounded-t-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Tooltip (text tip out) */}
                  <div className="absolute top-full mt-1 px-2.5 py-1.5 bg-neutral-900 text-white dark:bg-white dark:text-black text-[11px] font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 scale-95 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 z-50 border border-neutral-800 dark:border-neutral-200">
                    {link.label}
                  </div>
                </a>
              );
            })}
          </div>

          {/* Right: Discord CTA & Mobile Menu Trigger */}
          <div className="flex items-center gap-2">
            <a
              href="https://discord.gg/dtcpolicylab"
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClassName}
            >
              <Image
                src={discordLogoSrc}
                alt="Discord logo"
                width={16}
                height={16}
                className={`h-4 w-4 object-contain ${!isHomepage ? "dark:invert" : ""}`}
              />
              <span>Discord</span>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className={menuButtonClassName}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

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
              {navLinks.map((l) => {
                const Icon = l.icon;
                const isActive = pathname === l.href;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`${mobileLinkClassName(isActive)} flex items-center gap-3`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{l.label}</span>
                  </a>
                );
              })}
              <a
                href="https://discord.gg/dtcpolicylab"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={mobileCtaClassName}
              >
                <Image
                  src={discordLogoSrc}
                  alt="Discord logo"
                  width={16}
                  height={16}
                  className={`h-4 w-4 object-contain ${!isHomepage ? "dark:invert" : ""}`}
                />
                <span>Discord</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
