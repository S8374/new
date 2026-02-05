"use client";

import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

// Partner logo data (replace with real image paths or SVGs)
const PARTNERS = [
  { id: "evolution", name: "Evolution Gaming", src: "/logos/evolution.svg" },
  { id: "good-fortune", name: "Good Fortune Gaming", src: "/logos/good-fortune.svg" },
  { id: "pg", name: "PG SOFT", src: "/logos/pg.svg" },
  { id: "pragmatic", name: "Pragmatic Play", src: "/logos/pragmatic.svg" },
  { id: "playtech", name: "Playtech", src: "/logos/playtech.svg" },
  { id: "netent", name: "NetEnt", src: "/logos/netent.svg" },
];

// Fallback if images not ready — use text or simple icons
const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center w-32 h-12 bg-gray-700 rounded-lg border border-gray-600">
    <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">{name}</span>
  </div>
);

export default function PartnerMarquee() {
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch (client-only render)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-gray-800 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-center text-white font-semibold mb-4">Partners and Industry Associations</h3>
        
        <Marquee
          gradient={false}
          speed={60} // adjust speed (lower = slower)
          pauseOnHover
          className="overflow-hidden"
        >
          <div className="flex items-center gap-8 min-w-max">
            {PARTNERS.map((partner) => (
              <div key={partner.id} className="flex-shrink-0">
                {/* Use real image if available */}
                <div className="w-32 h-12 flex items-center justify-center">
                  <LogoPlaceholder name={partner.name} />
                </div>
              </div>
            ))}
            
            {/* Duplicate for seamless loop */}
            {PARTNERS.map((partner) => (
              <div key={`dup-${partner.id}`} className="flex-shrink-0">
                <div className="w-32 h-12 flex items-center justify-center">
                  <LogoPlaceholder name={partner.name} />
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}