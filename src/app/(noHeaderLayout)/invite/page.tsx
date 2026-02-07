// app/share/page.tsx
"use client";

import Link from "next/link";
import { 
  Send,
  Link as LinkIcon,
  MessageCircle,
  Phone,
  ArrowLeft,
} from "lucide-react";

export default function InvitePage() {
  return (
    <div className="min-h-screen bg-[#1E1D2A] pb-20">
      {/* Header */}
      <div className="relative h-16 flex items-center px-4 border-b border-gray-800">
        <Link href="/account" className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40 mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-white flex-1 text-center">Share</h1>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 pt-6">
        {/* Share Card */}
        <div className="bg-[#252334] rounded-2xl p-4 border border-yellow-500/30">
          <div className="mb-4">
            <span className="text-gray-300 text-sm">Share to:</span>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {/* TG One-click Share */}
            <button className="w-full flex items-center gap-3 p-3 bg-[#1E1D2A] rounded-lg hover:bg-[#2D2C3A] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">TG One-click Share</span>
            </button>

            {/* Copy TG share link */}
            <button className="w-full flex items-center gap-3 p-3 bg-[#1E1D2A] rounded-lg hover:bg-[#2D2C3A] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">Copy TG share link</span>
            </button>

            {/* Copy Web share link */}
            <button className="w-full flex items-center gap-3 p-3 bg-[#1E1D2A] rounded-lg hover:bg-[#2D2C3A] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">Copy Web share link</span>
            </button>

            {/* WhatsApp One-click Share */}
            <button className="w-full flex items-center gap-3 p-3 bg-[#1E1D2A] rounded-lg hover:bg-[#2D2C3A] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">WhatsApp One-click Share</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 bg-[#252334] rounded-xl p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-gray-400 text-xs mt-1">New Direct subordinates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-gray-400 text-xs mt-1">Direct subordinates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  );
}