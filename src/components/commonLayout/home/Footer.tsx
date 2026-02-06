"use client";

import { useState } from "react";

const Footer = () => {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: "home" },
    { id: "promotion", label: "Promo", icon: "gift" },
    { id: "customer", label: "Alerts", icon: "bell" },
    { id: "download", label: "Download", icon: "download" },
    { id: "account", label: "Account", icon: "user" },
  ];

  const renderIcon = (type: string) => {
    const base = "w-6 h-6";
    switch (type) {
      case "home":
        return (
          <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 12l2-2 7-7 7 7M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0v-4a1 1 0 011-1h2a1 1 0 011 1v4m-6 0h6" />
          </svg>
        );
      case "gift":
        return (
          <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109 8m-5 4h14l1 8H4l1-8z" />
          </svg>
        );
      case "bell":
        return (
          <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 11-6 0" />
          </svg>
        );
      case "download":
        return (
          <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4-4-4m4 4V4" />
          </svg>
        );
      case "user":
        return (
          <svg className={base} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };


  return (
    <footer className="bg-primary sticky bottom-0 z-50 text-primary-foreground border-t border-gray-700">
      {/* Bottom Navigation Bar */}
<nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 transition
                ${
                  isActive
                    ? "text-white"
                    : "text-primary-foreground/60 hover:text-white"
                }
              `}
            >
              <div
                className={`flex items-center justify-center ${
                  isActive ? "scale-110" : "scale-100"
                } transition-transform`}
              >
                {renderIcon(item.icon)}
              </div>
              <span className="text-[11px] font-medium leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      
    </footer>
  );
};

export default Footer;