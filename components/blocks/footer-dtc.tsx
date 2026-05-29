"use client";

import Link from "next/link";

const socialLinks = [
  { label: "Instagram", href: "#", aria: "DTC Policy Lab on Instagram" },
  { label: "LinkedIn", href: "#", aria: "DTC Policy Lab on LinkedIn" },
  { label: "Twitter/X", href: "#", aria: "DTC Policy Lab on Twitter/X" },
  { label: "Substack", href: "#", aria: "DTC Policy Lab on Substack" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export function FooterDtc() {
  return (
    <footer id="contact" className="lg:sticky lg:bottom-0 lg:z-0 bg-foreground text-background">
      <div className="px-6 sm:px-12 lg:px-24 pt-24 lg:pt-32 pb-16 lg:pb-24 text-center sm:text-left max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <a
          href="mailto:hello@dtcpolicylab.org"
          className="text-2xl sm:text-5xl lg:text-7xl font-medium tracking-tight hover:opacity-80 transition-opacity break-all sm:break-normal"
        >
          hello@dtcpolicylab.org
        </a>

        <div className="mt-10">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full bg-background text-foreground hover:bg-background/90 transition-colors ring-1 ring-background/30"
          >
            Join the Lab
          </Link>
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-24 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <div className="border-t border-background/10" />
      </div>

      <div className="px-6 sm:px-12 lg:px-24 py-16 lg:py-24 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          <div className="pb-8 lg:pb-0 border-b lg:border-b-0 border-background/10">
            <span className="text-4xl font-medium tracking-tight">DTC Policy Lab</span>
            <p className="mt-4 text-background/60 text-2xl lg:text-4xl">Teen voices in the policy room.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-16 lg:gap-24">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-6">Location</h4>
              <div className="mb-5">
                <p className="font-medium mb-1">Singapore</p>
                <p className="text-background/60 text-sm">Est. 2022</p>
              </div>
              <div>
                <p className="font-medium mb-1">Global Network</p>
                <p className="text-background/60 text-sm">
                  Fully Remote
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-6">Focus Areas</h4>
              <ul className="space-y-4">
                <li><span className="text-background">Digital Rights</span></li>
                <li><span className="text-background">Youth Privacy</span></li>
                <li><span className="text-background">Platform Governance</span></li>
                <li><span className="text-background">AI Governance</span></li>
                <li><span className="text-background">Global Monitoring</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-6">Navigation</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-background hover:text-background/60 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-6">Social</h4>
              <ul className="space-y-4">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      aria-label={link.aria}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-background hover:text-background/60 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-24 py-6 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto border-t border-background/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-background/60 hover:text-background transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-sm text-background/40">
            © 2026 DTC Policy Lab
          </p>

          <p className="text-sm text-background/40">
            Created by the DTC Team
          </p>
        </div>
      </div>
    </footer>
  );
}
