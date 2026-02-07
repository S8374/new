// app/bets/page.tsx
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MyBetsPage() {
  return (
    <div className="min-h-screen bg-[#1E1D2A] pb-20">
      {/* Header */}
      <div className="relative h-16 flex items-center px-4 border-b border-gray-800">
        <Link href="/income" className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40 mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-white flex-1 text-center">My bets</h1>
      </div>

      {/* Filters */}
      <div className="max-w-md mx-auto px-4 pt-6">
        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <select className="w-full bg-[#252334] border border-gray-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option>All</option>
              <option>Today</option>
            </select>
          </div>
          <div className="flex-1">
            <select className="w-full bg-[#252334] border border-gray-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option>Toady</option>
              <option>This Week</option>
            </select>
          </div>
        </div>

        {/* Stats Row */}
        <div className="bg-[#252334] rounded-xl p-4 mb-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { label: "0 Bets", value: "0" },
              { label: "Profit", value: "0" },
              { label: "Bet Amount", value: "0" },
              { label: "Valid Bets", value: "0" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-gray-400 text-xs mb-1">{item.label}</div>
                <div className="text-white font-bold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <div className="relative w-24 h-24 mb-6">
            {/* Paper plane */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-yellow-400 mx-auto" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {/* Gift box */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gray-800 rounded-t-lg"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-700 rounded"></div>
          </div>
          <p className="text-sm">No bets yet</p>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  );
}