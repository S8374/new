// app/deposit/page.tsx
"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  FileText, 
  Wallet, 
  Copy, 
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
              {/* <QRCode 
                value={walletAddress} 
                size={160} 
                bgColor="#ffffff" 
                fgColor="#000000" 
                level="M"
              /> */}
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