// components/modals/SignInModal.tsx
"use client";

import { useState, useEffect, useRef } from "react";

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on ESC or click outside
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

    return (
        <div >
            <div
                ref={modalRef}
                className="relative w-full max-w-md rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl   bg-no-repeat bg-cover"
                style={{
                    backgroundImage: "url('https://img.tkzc886.com/imgcn/tkzc/bg_login.webp')",
                }}
            >
                {/* Gold Wave Header */}
                <div className="relative h-28 ">
                    {/* Decorative golden ribbons (matching your screenshot) */}
                    {/* Decorative golden ribbons (matching your screenshot) */}
                    <div
                        className="absolute "

                    />


                    {/* Title */}
                    <div className="absolute inset-0 flex flex-col items-start justify-center px-4">
                        <h2 className="text-2xl font-bold text-white">Welcome Sign In</h2>
                        <p className="text-gray-200 text-sm mt-1">
                            No account yet?{" "}
                            <span className="text-yellow-300 hover:underline cursor-pointer">Register now</span>
                        </p>
                    </div>
                </div>

                {/* Form Content */}
                <div className="px-6 pb-6 pt-4 space-y-4">
                    {/* Username */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter username"
                            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <div className="w-5 h-5 rounded border border-yellow-500 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-gray-300">Remember password</span>
                        </label>
                        <span className="text-yellow-400 hover:underline cursor-pointer">Forget password</span>
                    </div>

                    {/* CAPTCHA / I am human */}
                    <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                        </div>
                        <span className="text-gray-300">I am human</span>
                    </div>

                    {/* Sign In Button */}
                    <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg">
                        SIGN IN
                    </button>

                    {/* Divider + Text */}
                    <div className="relative flex items-center my-4">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="px-4 text-gray-500 text-sm">使用以下方式免注册登录</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    {/* Social Logins */}
                    <div className="flex justify-center space-x-4">
                        {[
                            { name: "Telegram", icon: "✈️", color: "bg-blue-500" },
                            { name: "Facebook", icon: "f", color: "bg-blue-600" },
                            { name: "Google", icon: "G", color: "bg-red-500" },
                        ].map((item) => (
                            <button
                                key={item.name}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${item.color} text-sm font-bold hover:scale-105 transition-transform`}
                                aria-label={`Sign in with ${item.name}`}
                            >
                                {item.icon}
                            </button>
                        ))}
                    </div>


                </div>

                {/* Close Button (top-right) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors z-10"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}