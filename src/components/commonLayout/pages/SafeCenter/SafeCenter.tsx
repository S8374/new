// components/account/SafeCenter.tsx
"use client";

import { 
  Mail, 
  Lock, 
  Shield, 
  Wallet, 
  ChevronRight,
  CheckCircle,
} from "lucide-react";

export default function SafeCenter() {
  const items = [
    { id: "email", label: "Set email", icon: Mail },
    { id: "password", label: "Modify log in password", icon: Lock },
    { id: "withdraw-password", label: "Set withdraw password", icon: Shield },
    { id: "wallet", label: "Bind withdraw wallet address", icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-[#0F0D2A] pb-20">
      {/* Header */}
      <div className="relative h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `radial-gradient(circle at center, #1a1826 0%, #0F0D2A 70%)`,
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div className="relative w-24 h-24 mb-4">
            {/* Glowing checkmark circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-full h-full rounded-full bg-black/30 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-yellow-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">安全中心</h1>
          <p className="text-gray-300 max-w-xs">
            Comprehensive protection of your account security
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 pt-6">
        {items.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center justify-between p-4 bg-[#1E1D2A] rounded-xl border border-gray-700 hover:bg-[#252334] transition-colors mb-3"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-gray-400" />
              <span className="text-white">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        ))}
      </div>

      {/* Bottom padding for safe area */}
      <div className="h-20"></div>
    </div>
  );
}