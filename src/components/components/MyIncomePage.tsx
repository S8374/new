// app/income/page.tsx
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MyIncomePage() {
  return (
    <div className="min-h-screen bg-[#1E1D2A] pb-20">
      {/* Header */}
      <div className="relative h-16 flex items-center px-4 border-b border-gray-800">
        <Link href="/account" className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40 mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-white flex-1 text-center">My Income</h1>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 pt-6">
        {/* Cashback rewards */}
        <div className="bg-[#252334] rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-white">Cashback rewards</span>
            <span="text-yellow-400 text-sm">up to 1.2% &gt;</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">T</span>
              </div>
              <span className="text-white font-bold">0</span>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity">
              Claim
            </button>
          </div>
        </div>

        {/* Stats Rows */}
        <div className="bg-[#252334] rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <span className="text-gray-300">All bets</span>
            <div className="flex items-center gap-2">
              <span className="text-white">0</span>
              <Link href="/bets" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-300">Valid bets</span>
            <div className="flex items-center gap-2">
              <span className="text-white">0</span>
              <Link href="/bets" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Cashback settlement */}
        <div className="bg-[#252334] rounded-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-white">Cashback settlement</span>
            <span className="text-yellow-400 text-sm">Details &gt;</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Yesterday", value: "0" },
              { label: "Today", value: "0" },
              { label: "Total", value: "0" },
            ].map((item) => (
              <div key={item.label} className="bg-[#1E1D2A] rounded-lg p-3 text-center">
                <div className="text-gray-400 text-xs mb-1">{item.label}</div>
                <div className="text-white font-bold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  );
}