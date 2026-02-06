"use client";

import { useEffect, useRef } from "react";
import {
  Send,
  Headphones,
  Crown,
  ShieldCheck,
  Bot,
  X,
} from "lucide-react";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomerModal({
  isOpen,
  onClose,
}: CustomerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC + outside click
  useEffect(() => {
    if (!isOpen) return;

    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const clickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", esc);
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("keydown", esc);
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-black/70 flex items-center justify-center">
      <div
        ref={modalRef}
        className="relative w-full max-w-sm rounded-t-3xl bg-[#2c2b33] border border-yellow-500/60 shadow-[0_0_30px_rgba(255,200,80,0.25)]"
      >
        {/* Robot */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
            <Bot className="w-12 h-12 text-black" />
          </div>
        </div>

        {/* Header */}
        <div className="pt-16 pb-4 text-center px-4">
          <h2 className="text-lg font-bold text-white">
            24 hours online service
          </h2>
          <p className="text-sm text-gray-300 mt-1">
            serve wholeheartedly for you
          </p>
        </div>

        {/* List */}
        <div className="px-4 pb-4 space-y-3">
          {[
            { label: "Telegram", icon: Send, color: "text-sky-400" },
            { label: "Online Service", icon: Headphones, color: "text-orange-400" },
            { label: "TG VIP Service", icon: Crown, color: "text-yellow-400" },
            { label: "Official Channel", icon: ShieldCheck, color: "text-purple-400" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#1f1e26] border border-yellow-500/20"
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-white text-sm font-medium">
                  {item.label}
                </span>
              </div>

              <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold shadow hover:brightness-110">
                Consult
              </button>
            </div>
          ))}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
