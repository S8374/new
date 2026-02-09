// app/deposit/page.tsx
"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  FileText, 
  Wallet, 
  ChevronRight 
} from "lucide-react";
import Link from "next/link";

export default function DepositPage() {
  const walletAddress = "TEfuvvysBmXuUmBUxZGFM1J9a6LSVHGCP";
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1E1D2A] pb-8">
      {/* Header */}
      <div className="relative h-16 flex items-center px-4 border-b border-gray-800">
        <Link href="/account" className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40 mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-white flex-1 text-center">Deposit</h1>
        <button className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40">
          <FileText className="w-5 h-5" />
        </button>
      </div>

      {/* Tab */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex justify-center">
          <span className="text-white font-medium border-b-2 border-yellow-500 pb-1">USDT</span>
        </div>
      </div>

      {/* Deposit Card */}
      <div className="max-w-md mx-auto px-4 mt-4">
        <div className="bg-[#252334] rounded-xl p-5">
          {/* USDT TRC20 Label */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="w-7 h-7 rounded bg-green-500 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-medium">USDT TRC20</span>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-5">
            <div className="bg-white p-3 rounded-lg">
                <img src="data:image/png;base64,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" alt="" />
            </div>
          </div>

          {/* Wallet Address */}
          <div className="text-center mb-4">
            <div className="text-gray-300 text-sm mb-1">Wallet Address</div>
            <div className="font-mono text-white text-sm break-all px-2">
              {walletAddress}
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyAddress}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            {copied ? "Copied!" : "Copy Address"}
          </button>
        </div>

        {/* Check if funded */}
        <div className="text-center mt-6">
          <button className="text-yellow-400 text-sm font-semibold flex items-center justify-center gap-1 hover:underline">
            Check if funded <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}