// components/modals/SetEmailModal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Lock, 
  Mail, 
  Key, 
  AlertCircle,
  ChevronLeft,
} from "lucide-react";

interface SetEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SetEmailModal({ isOpen, onClose }: SetEmailModalProps) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
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

  const handleSendCode = () => {
    alert("Verification code sent to: " + email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted:\nPassword: ${password}\nEmail: ${email}\nCode: ${code}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-t-2xl overflow-hidden bg-[#1E1D2A] border-t-4 border-gray-800"
      >
        {/* Header */}
        <div className="p-4 flex items-center gap-2 border-b border-gray-800">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-white">Set email</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Login Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Please enter log in password"
              className="w-full pl-10 pr-4 py-3 bg-[#252334] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter email"
              className="w-full pl-10 pr-4 py-3 bg-[#252334] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleSendCode}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>

          {/* Verification Code */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Please enter email verification code"
              className="w-full pl-10 pr-4 py-3 bg-[#252334] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 p-3 bg-[#252334] rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300 text-sm">
              In order to protect your account and fund security, please bind the email
            </p>
          </div>

          {/* Commit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Commit
          </button>
        </form>

        {/* Bottom padding */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}