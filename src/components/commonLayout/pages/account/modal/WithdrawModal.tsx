// components/modals/WithdrawModal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft,
  FileText,
  Wallet,
  Lock,
  Phone,
  Globe,
  Copy,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const [huioneName, setHuioneName] = useState("");
  const [phoneArea, setPhoneArea] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-t-2xl overflow-hidden bg-[#1E1D2A] border-t-4 border-gray-800"
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-white">Withdraw</h2>
          <button className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40">
            <FileText className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab("USDT")}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "USDT"
                ? "text-white border-b-2 border-yellow-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            USDT
          </button>
          <button
            onClick={() => setActiveTab("HUIONE2")}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "HUIONE2"
                ? "text-white border-b-2 border-yellow-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            HUIONE2
          </button>
        </div>

        {/* Balance Card */}
        <div className="p-4 bg-gradient-to-r from-gray-900/50 to-black/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">USDT</span>
            </div>
            <span className="text-green-400 font-bold">Usable: 0</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 space-y-4">
          {activeTab === "USDT" && (
            <>
              {/* Your wallet address */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 text-sm">Your wallet address</span>
                  <button className="text-yellow-400 text-xs font-semibold">bind address</button>
                </div>
                <div className="relative">
                  <select
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full bg-[#252334] border border-gray-700 rounded-lg py-3 pl-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none"
                  >
                    <option>Please enter/select address</option>
                    <option>0x...abc123</option>
                    <option>TR...xyz789</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Withdraw amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 text-sm">Withdraw amount</span>
                  <span className="text-gray-400 text-sm">Lefted bet amount 0</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Minimum withdraw amount: 10"
                    className="w-full bg-[#252334] border border-gray-700 rounded-lg py-3 pl-3 pr-20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button className="absolute inset-y-0 right-0 px-3 py-3 bg-gray-800 text-yellow-400 text-sm font-bold rounded-r-lg">
                    All
                  </button>
                </div>
              </div>

              {/* Withdraw password */}
              <div>
                <div className="text-gray-300 text-sm mb-2">Withdraw password</div>
                <button className="text-blue-400 text-sm font-semibold">Set withdraw Password</button>
              </div>
            </>
          )}

          {activeTab === "HUIONE2" && (
            <>
              {/* HUIONE account name */}
              <div>
                <div className="text-gray-300 text-sm mb-2">HUIONE account name</div>
                <input
                  type="text"
                  value={huioneName}
                  onChange={(e) => setHuioneName(e.target.value)}
                  placeholder="Please enter huione name (e.g.)"
                  className="w-full bg-[#252334] border border-gray-700 rounded-lg py-3 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Phone area code */}
              <div>
                <div className="text-gray-300 text-sm mb-2">Your phone area code</div>
                <input
                  type="text"
                  value={phoneArea}
                  onChange={(e) => setPhoneArea(e.target.value)}
                  placeholder="Please enter your phone area code (Such as)"
                  className="w-full bg-[#252334] border border-gray-700 rounded-lg py-3 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Phone number */}
              <div>
                <div className="text-gray-300 text-sm mb-2">Your phone number</div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Please enter your phone number (Such as)"
                  className="w-full bg-[#252334] border border-gray-700 rounded-lg py-3 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Withdraw amount (same as USDT) */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 text-sm">Withdraw amount</span>
                  <span className="text-gray-400 text-sm">Lefted bet amount 0</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Minimum withdraw amount: 10"
                    className="w-full bg-[#252334] border border-gray-700 rounded-lg py-3 pl-3 pr-20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button className="absolute inset-y-0 right-0 px-3 py-3 bg-gray-800 text-yellow-400 text-sm font-bold rounded-r-lg">
                    All
                  </button>
                </div>
              </div>

              {/* Withdraw password */}
              <div>
                <div className="text-gray-300 text-sm mb-2">Withdraw password</div>
                <button className="text-blue-400 text-sm font-semibold">Set withdraw Password</button>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg">
            Withdraw Money
          </button>

          {/* Footer Hint */}
          <div className="pt-3 text-center">
            <p className="text-gray-400 text-xs">
              首次提现或提现不到账？{" "}
              <span className="text-blue-400 hover:underline cursor-pointer">Customer Service&gt;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}