// components/modals/AddWalletAddressModal.tsx
"use client";

import { useState } from "react";
import { 
  Wallet,
  Plus,
  ChevronLeft,
} from "lucide-react";

interface AddWalletAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNew: () => void;
}

export default function AddWalletAddressModal({ isOpen, onClose, onAddNew }: AddWalletAddressModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-t-2xl overflow-hidden bg-[#1E1D2A] border-t-4 border-gray-800">
        {/* Header */}
        <div className="p-4 flex items-center gap-2 border-b border-gray-800">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-white">Add wallet address</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Bound wallet address:</span>
            <span className="text-yellow-400 font-bold">0</span>
          </div>

          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-blue-400 hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add new address</span>
          </button>
        </div>
      </div>
    </div>
  );
}