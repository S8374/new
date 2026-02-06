/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
// components/commonLayout/footer/PartnerMarquee.tsx
"use client";

import { useEffect, useState } from "react";

// Real logo URLs (from your example + others)
const PARTNERS = [
  { id: "evolution", name: "Evolution Gaming", src: "https://tkzc668.com/static/img/provider_evolution.8f2e3b1a.png" },
  { id: "good-fortune", name: "Good Fortune Gaming", src: "https://tkzc668.com/static/img/provider_gfg.5c9d2a3f.png" },
  { id: "pg", name: "PG SOFT", src: "https://tkzc668.com/static/img/provider_pg.140b8ae6.png" }, // ✅ your image
  { id: "pragmatic", name: "Pragmatic Play", src: "https://tkzc668.com/static/img/provider_pragmatic.7d1e4c2b.png" },
  { id: "playtech", name: "Playtech", src: "https://tkzc668.com/static/img/provider_playtech.9a3b1f0d.png" },
  { id: "netent", name: "NetEnt", src: "https://tkzc668.com/static/img/provider_netent.2e4f6a8c.png" },
  { id: "jili", name: "JILI", src: "https://tkzc668.com/static/img/provider_jili.d4f1a2e3.png" },
  { id: "cq9", name: "CQ9", src: "https://tkzc668.com/static/img/provider_cq9.6b7c8d9e.png" },
];

export default function PartnerMarquee() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-[#3B393A] py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-start text-white font-semibold mb-4">Partners and Industry Associations</h3>

        {/* Smooth CSS Marquee */}
        <div className="overflow-hidden">
          <div 
            className="flex animate-marquee whitespace-nowrap"
            style={{
              animationDuration: "25s", // slower = smoother; adjust based on #items
            }}
          >
            {/* First copy */}
            {PARTNERS.map((p) => (
              <div key={`orig-${p.id}`} className="flex-shrink-0 mx-6">
                <img
                  src={p.src}
                  alt={p.name}
                  className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Second copy for seamless loop */}
            {PARTNERS.map((p) => (
              <div key={`copy-${p.id}`} className="flex-shrink-0 mx-6">
                <img
                  src={p.src}
                  alt={p.name}
                  className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for smooth marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${PARTNERS.length * 100}px); } /* ~100px per item */
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        /* Optional: pause on hover */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}