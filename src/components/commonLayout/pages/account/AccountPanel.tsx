/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Wallet,
  ArrowDownToLine,
  FileText,
  BarChart3,
  Repeat,
  ClipboardList,
  Coins,
  Bitcoin,
  Gift,
  ShieldCheck,
  Users,
  Download,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function ProfileWallet() {
  return (
    <div className="min-h-screen bg-[#3b3b3b] text-white p-4 max-w-md mx-auto">
      {/* Header */}
      <div   style={{
                    backgroundImage: "url('https://img.tkzc886.com/imgcn/tkzc/bg_login.webp')",
                }} className="relative  bg-no-repeat bg-cover  rounded-xl bg-linear-to-br from-chart-4 pt-52 to-chart-4/25 p-4 mb-4">
        <div className="flex items-center gap-3">
          <img
            src="https://img.tkzc886.com/imgcn/tkzc/bg_login.webp"
            className="w-14 h-14 rounded-full border-2 border-yellow-400"
            alt="avatar"
          />
          <div>
            <p className="font-semibold text-lg">roni123</p>
            <p className="text-xs text-gray-300 flex items-center gap-1">
              ID: 72059
            </p>
          </div>
        </div>

        {/* VIP */}
        <div className="mt-4 bg-[#4a4a4a] rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-sm">VIP0</span>
            <button className="text-yellow-400 text-xs font-semibold">
              VIP Details &gt;
            </button>
          </div>

          <p className="text-xs text-gray-300 mb-2">
            need to deposit 50U more to join the VIP membership
          </p>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-600 rounded-full">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            </div>
            <span className="text-xs">VIP1</span>
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className="bg-[#4a4a4a] rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Coins className="text-green-400" />
            <span className="font-semibold">Balance</span>
          </div>
          <span className="text-yellow-400 font-bold">0.00</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="bg-yellow-400 text-black py-2 rounded-lg font-semibold flex items-center justify-center gap-2">
            <Wallet size={18} /> Deposit
          </button>
          <button className="bg-gray-600 py-2 rounded-lg font-semibold flex items-center justify-center gap-2">
            <ArrowDownToLine size={18} /> Withdraw
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-4 gap-4 mt-5 text-center text-xs">
          <MenuItem icon={<FileText />} label="Balance Det" />
          <MenuItem icon={<BarChart3 />} label="Profit Report" />
          <MenuItem icon={<Repeat />} label="Transaction" />
          <MenuItem icon={<ClipboardList />} label="Task" />
          <MenuItem icon={<Coins />} label="My Bets" />
          <MenuItem icon={<Bitcoin />} label="Buy Crypto" />
          <MenuItem icon={<Gift />} label="LuckyWheel" />
        </div>
      </div>

      {/* Referral */}
      <div className="bg-[#4a4a4a] rounded-xl p-4 mb-4">
        <div className="flex items-center gap-3">
          <Gift className="text-yellow-400" />
          <div className="flex-1">
            <p className="text-sm">up to 0.6% bets commission</p>
            <div className="flex items-center gap-2 mt-2">
              <input
                readOnly
                value="https://t.me/sky8app_bot?start=72059"
                className="flex-1 bg-gray-600 text-xs p-2 rounded-md"
              />
              <button className="bg-yellow-400 text-black px-3 py-1 rounded-md text-xs font-semibold">
                copy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List Menu */}
      <div className="bg-[#4a4a4a] rounded-xl divide-y divide-gray-600">
        <ListItem icon={<ShieldCheck />} label="Safe Center" />
        <ListItem icon={<Users />} label="Affiliate" />
        <ListItem icon={<Download />} label="Vpn Download" />
        <ListItem icon={<Sparkles />} label="LuckySpin" />
      </div>
    </div>
  );
}

/* Reusable Components */
const MenuItem = ({ icon, label }: any) => (
  <div className="flex flex-col items-center gap-1 text-gray-200">
    <div className="text-background">{icon}</div>
    <span>{label}</span>
  </div>
);

const ListItem = ({ icon, label }: any) => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center gap-3">
      <span className="text-yellow-400">{icon}</span>
      <span>{label}</span>
    </div>
    <Button className="text-foreground">
        <ArrowRight/>
    </Button>
  </div>
);
