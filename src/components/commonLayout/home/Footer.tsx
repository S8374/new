"use client";

import { useState } from "react";

// You can use lucide-react, heroicons, or any icon library
// Here using simple inline SVG for no extra dependency (or install @heroicons/react)
const Footer = () => {
  const [activeTab, setActiveTab] = useState("home"); // optional: track active tab

  const navItems = [
    { id: "home", label: "Home", icon: "home" },
    { id: "promotion", label: "Promotion", icon: "gift" },
    { id: "customer", label: "Customer", icon: "bell" },
    { id: "download", label: "Download", icon: "download" },
    { id: "account", label: "Account", icon: "user" },
  ];

  // Simple icon renderer (replace with Heroicons / Lucide / RemixIcon etc.)
  const renderIcon = (type: string) => {
    switch (type) {
      case "home":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case "gift":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109 8m-5 4h14l1 8H4l1-8z" />
          </svg>
        );
      case "bell":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      case "download":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        );
      case "user":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-primary sticky bottom-0 z-50 text-primary-foreground border-t border-gray-700">
      {/* Bottom Navigation Bar */}
      <nav className="bg-primary">
        <div className="container mx-auto">
          <div className="flex justify-around items-center py-2 px-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
                  activeTab === item.id
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <div className="w-7 h-7">{renderIcon(item.icon)}</div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      
    </footer>
  );
};

export default Footer;