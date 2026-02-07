"use client";

import { useEffect, useRef } from "react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC key + click outside + body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-2xl overflow-hidden
                   bg-gray-900 border border-gray-800 shadow-2xl
                   bg-no-repeat bg-cover"
        style={{
          backgroundImage:
            "url('https://img.tkzc886.com/imgcn/tkzc/bg_login.webp')",
        }}
      >
        {/* Header */}
        <div className="relative h-28">
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <h2 className="text-2xl font-bold text-white">Welcome Sign In</h2>
            <p className="text-gray-200 text-sm mt-1">
              No account yet?{" "}
              <span className="text-yellow-300 hover:underline cursor-pointer">
                Register now
              </span>
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-6 pt-4 space-y-4">
          {/* Username */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              👤
            </span>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full pl-10 pr-4 py-3 rounded-lg
                         bg-gray-800/50 border border-gray-700
                         text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              🔒
            </span>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full pl-10 pr-4 py-3 rounded-lg
                         bg-gray-800/50 border border-gray-700
                         text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Options */}
          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-yellow-500" />
              <span className="text-gray-300">Remember password</span>
            </label>
            <span className="text-yellow-400 hover:underline cursor-pointer">
              Forget password
            </span>
          </div>

          {/* Human Check */}
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            </div>
            I am human
          </div>

          {/* Sign In */}
          <button
            className="w-full py-3 rounded-lg font-bold text-white
                       bg-gradient-to-r from-yellow-500 to-orange-600
                       hover:opacity-90 transition"
          >
            SIGN IN
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-700" />
            <span className="text-xs text-gray-400">
              使用以下方式免注册登录
            </span>
            <div className="flex-1 border-t border-gray-700" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-4">
            <button className="w-10 h-10 rounded-full bg-blue-500 text-white hover:scale-105 transition">
              ✈️
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-600 text-white hover:scale-105 transition">
              f
            </button>
            <button className="w-10 h-10 rounded-full bg-red-500 text-white hover:scale-105 transition">
              G
            </button>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8
                     rounded-full bg-black/50 hover:bg-black/70
                     text-white flex items-center justify-center"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
