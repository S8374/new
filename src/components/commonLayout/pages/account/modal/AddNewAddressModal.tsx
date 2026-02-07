// components/modals/AddNewAddressModal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Zap, 
  Lock, 
  Eye, 
  EyeOff,
  AlertCircle,
  ChevronLeft,
  Wallet,
} from "lucide-react";

interface AddNewAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddNewAddressModal({ isOpen, onClose }: AddNewAddressModalProps) {
  const [protocol, setProtocol] = useState("TRC-20");
  const [address, setAddress] = useState("");
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div ref={modalRef} className="w-full max-w-md rounded-t-2xl overflow-hidden bg-[#1E1D2A] border-t-4 border-gray-800">
        {/* Header */}
        <div className="p-4 flex items-center gap-2 border-b border-gray-800">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-white">Add new address</h2>
        </div>

        {/* Form */}
        <form className="p-5 space-y-5">
          {/* Select protocol */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Zap className="w-5 h-5 text-gray-400" />
            </div>
            <select
              value={protocol}
              onChange={(e) => setProtocol(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-[#252334] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none"
            >
              <option>TRC-20</option>
              <option>ERC-20</option>
              <option>BEP-20</option>
              <option>SOL</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Add address */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Wallet className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Please enter wallet address"
              className="w-full pl-10 pr-4 py-3 bg-[#252334] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Withdraw Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={withdrawPassword}
              onChange={(e) => setWithdrawPassword(e.target.value)}
              placeholder="Please enter Withdrawal Password"
              className="w-full pl-10 pr-10 py-3 bg-[#252334] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Hint */}
          <div className="flex items-start gap-2 p-3 bg-[#252334] rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300 text-sm">
              Hint: For the safety of your funds, please make sure that the address you add is the same as the selected protocol.
            </p>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}