"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const byPrefixAndName = {
  fab: {
    instagram: faInstagram,
    linkedin: faLinkedin,
    "x-twitter": faXTwitter,
  },
};

const socialLinks = [
  { 
    label: "Instagram", 
    href: "https://instagram.com/dtcpolicylab", 
    icon: byPrefixAndName.fab["instagram"],
    type: "font-awesome" as const
  },
  { 
    label: "LinkedIn", 
    href: "https://linkedin.com/company/dtcpolicylab", 
    icon: byPrefixAndName.fab["linkedin"],
    type: "font-awesome" as const
  },
  { 
    label: "Twitter/X", 
    href: "https://twitter.com/dtcpolicylab", 
    icon: byPrefixAndName.fab["x-twitter"],
    type: "font-awesome" as const
  },
  { 
    label: "Substack", 
    href: "https://dtcpolicylab.substack.com", 
    imageSrc: "/logo/substack.png", 
    type: "image" as const
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/work" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export function FooterDtc() {
  return (
    <footer id="contact" className="lg:sticky lg:bottom-0 lg:z-0 bg-foreground text-background">
      <div className="px-6 sm:px-12 lg:px-24 pt-24 lg:pt-32 pb-16 lg:pb-24 text-center sm:text-left max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto">
        <a
          href="mailto:hello@dtcpolicylab.org"
          className="text-2xl sm:text-5xl lg:text-7xl font-bold tracking-tight hover:opacity-80 transition-opacity break-all sm:break-normal"
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
            <span className="text-4xl font-bold tracking-tight">DTC Youth Policy Lab</span>
            <p className="mt-4 text-background/60 text-2xl lg:text-4xl font-bold">Teen voices in the policy room.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-16 lg:gap-24">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-6">Location</h4>
              <div className="mb-5">
                <p className="font-medium mb-1">Singapore</p>
                <p className="text-background/60 text-sm">Est. 2026</p>
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
                <li><span className="text-background">Social Media Restrictions</span></li>
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
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center justify-center h-10 w-10 rounded-full border border-background/10 bg-transparent text-background hover:border-background/40 hover:scale-110 transition-all duration-200 group"
                      aria-label={link.label}
                    >
                      {link.type === "font-awesome" ? (
                        <FontAwesomeIcon 
                          icon={link.icon} 
                          style={{ color: "rgb(251, 251, 251)" }} 
                          className="h-4 w-4"
                        />
                      ) : (
                        <div className="relative h-4 w-4">
                          <Image
                            src={link.imageSrc}
                            alt="Substack logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 px-2 py-1 bg-background text-foreground text-[10px] font-semibold rounded shadow-md opacity-0 scale-95 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap z-50 border border-background/10">
                        {link.label}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-24 py-6 max-w-360 2xl:max-w-450 3xl:max-w-550 mx-auto border-t border-background/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-6 w-6 rounded-full overflow-hidden bg-black flex items-center justify-center border border-background/10">
              <Image
                src="/images/brand/youth-policy-lab-emblem.png"
                alt="DTC Logo"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-background/40">
              © 2026 DTC Youth Policy Lab
            </p>
          </div>

          <p className="text-sm text-background/40">
            Created by the DTC Team
          </p>
        </div>
      </div>
    </footer>
  );
}
