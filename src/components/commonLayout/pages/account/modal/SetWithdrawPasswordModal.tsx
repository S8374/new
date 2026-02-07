// components/modals/SetWithdrawPasswordModal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Lock, 
  Eye, 
  EyeOff,
  ChevronLeft,
} from "lucide-react";

interface SetWithdrawPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SetWithdrawPasswordModal({ isOpen, onClose }: SetWithdrawPasswordModalProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
          <h2 className="text-xl font-bold text-white">Set withdraw password</h2>
        </div>

        {/* Form */}
        <form className="p-5 space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your withdrawal password"
              className="w-full pl-10 pr-10 py-3 bg-[#252334] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            >
              {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm your withdrawal password"
              className="w-full pl-10 pr-10 py-3 bg-[#252334] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            >
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            提交
          </button>
        </form>
      </div>
    </div>
  );
}