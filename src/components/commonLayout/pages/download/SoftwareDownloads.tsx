// components/account/SoftwareDownloads.tsx
"use client";

import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Zap,
  Wallet,
  Download as DownloadIcon,
  ChevronLeft,
} from "lucide-react";

export default function SoftwareDownloads() {
   
  // VPN Recommendations
  const vpnApps = [
    {
      id: "rocket",
      name: "Rocket VPN",
      icon: Shield,
      color: "bg-blue-600"  // adjust if you have better match
    },
    {
      id: "cloudflare",
      name: "1.1.1.1 VPN",
      icon: Zap,
      color: "bg-purple-600"
    },
  ];

  // Official Recommended Wallets
  const walletApps = [
    {
      id: "imtoken",
      name: "imToken",
      icon: Wallet,
      color: "bg-blue-500"
    },
    {
      id: "token-pocket",
      name: "TOKEN POCKET",
      icon: Wallet,
      color: "bg-blue-700"
    },
    {
      id: "tronlink",
      name: "TronLink",
      icon: Zap,
      color: "bg-blue-400"
    },
    {
      id: "bitpie",
      name: "Bitpie",
      icon: Shield,
      color: "bg-indigo-600"
    },
  ];

  return (
    <div className="min-h-screen bg-[#252334] text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 h-16 flex items-center px-4 border-b border-gray-800 bg-[#252334]">
         <BackButton className="mr-3" fallback="/" />

        <h1 className="text-xl font-bold">Software Downloads</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 pt-6 space-y-8">
        {/* VPN Section */}
        <div className="bg-[#1E1D2A] rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-lg mb-5">VPN Recommendations</h2>
          <div className="grid grid-cols-2 gap-4">
            {vpnApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col bg-gray-800 rounded  justify-between items-start text-start"
              >
                <div className="p-4 w-full">
                  <div className="flex justify-start">
                    <app.icon className="w-7 h-7 text-white" />
                    <span className="text-sm font-semibold mb-3">{app.name}</span>
                  </div>

                  <button
                    className="p-1 rounded text-foreground text-sm bg-chart-4"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet Section */}
        <div className="bg-[#1E1D2A] rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-lg mb-3">Official Recommended Wallet</h2>
          <p className="text-gray-400 text-xs mb-5 leading-relaxed">
            In addition to recommended exchanges, it is also possible to transfer money through decentralized wallets
          </p>
          <div className="grid grid-cols-2 gap-4">
            {walletApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col justify-between items-start text-start"
              >
               <div className="p-4 bg-gray-800 w-full">
                 <div className="flex justify-start">
                  <app.icon className="w-7 h-7 text-white" />
                  <span className="text-sm font-semibold mb-3">{app.name}</span>
                </div>

                <button
                  className="p-1 text-sm rounded text-foreground bg-chart-4"
                >
                  Download
                </button>
               </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Extra bottom space for mobile navigation bar feel */}
      <div className="h-24"></div>
    </div>
  );
}