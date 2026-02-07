// components/promotions/RedPacketPage.tsx
"use client";

import { useState } from "react";
import { AlertCircle, X } from "lucide-react";

export default function RedPacketPage () {
  const [type, setType] = useState<"Newcomer" | "All person">("Newcomer");
  const [turnover, setTurnover] = useState<"no" | "1x" | "3x" | "5x" | "10x">("no");
  const [deadline, setDeadline] = useState<"1 day later" | "2 day later" | "3 day later">("1 day later");
  const [note1, setNote1] = useState("");
  const [note2, setNote2] = useState("");

  return (
    <div className="min-h-screen bg-[#1E1D2A] pb-20">
      {/* Header */}
      <div className="relative h-16 flex items-center px-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white flex-1 text-center">Red Packet</h1>
        <button className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/40">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 pt-6 space-y-5">
        {/* Total amount & Number */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-400 text-sm">Total amount</div>
            <div className="text-white font-bold text-lg">100</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">Number</div>
            <div className="text-white font-bold text-lg">10</div>
          </div>
        </div>

        {/* Type */}
        <div>
          <div className="text-gray-400 text-sm mb-2">Type</div>
          <div className="flex gap-2">
            <button
              onClick={() => setType("Newcomer")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                type === "Newcomer"
                  ? "bg-white text-black"
                  : "bg-[#252334] text-gray-300 hover:bg-[#2D2C3A]"
              }`}
            >
              Newcomer
            </button>
            <button
              onClick={() => setType("All person")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                type === "All person"
                  ? "bg-white text-black"
                  : "bg-[#252334] text-gray-300 hover:bg-[#2D2C3A]"
              }`}
            >
              All person
            </button>
          </div>
        </div>

        {/* Turnover times */}
        <div>
          <div className="text-gray-400 text-sm mb-2">Turnover times</div>
          <div className="flex gap-2">
            {(["no", "1x", "3x", "5x", "10x"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTurnover(t)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  turnover === t
                    ? "bg-white text-black"
                    : "bg-[#252334] text-gray-300 hover:bg-[#2D2C3A]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Deadline */}
        <div>
          <div className="text-gray-400 text-sm mb-2">Deadline</div>
          <div className="flex gap-2">
            {(["1 day later", "2 day later", "3 day later"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDeadline(d)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  deadline === d
                    ? "bg-white text-black"
                    : "bg-[#252334] text-gray-300 hover:bg-[#2D2C3A]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <div className="text-gray-400 text-sm mb-1">Notes</div>
          <input
            type="text"
            value={note1}
            onChange={(e) => setNote1(e.target.value)}
            placeholder="请输入"
            className="w-full px-3 py-2.5 bg-[#252334] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <div className="text-gray-400 text-sm mb-1">Notes</div>
          <input
            type="text"
            value={note2}
            onChange={(e) => setNote2(e.target.value)}
            placeholder="请输入"
            className="w-full px-3 py-2.5 bg-[#252334] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 p-3 bg-[#252334] rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm">
            Newcomer red packet: all newcomers can claim; all person red packet: everyone can claim
          </p>
        </div>

        {/* Submit Button */}
        <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg">
          Submit
        </button>
      </div>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  );
}