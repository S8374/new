// components/commonLayout/footer/Footer.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Gift,
  Download,
  User,
  CupSoda,
  Headset,
} from "lucide-react";
import { useState } from "react";
import CustomerModal from "../model/CustomerModal";

const Footer = () => {
  const pathname = usePathname();
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", href: "/", icon: Home },
    { id: "promotion", label: "Promo", href: "/promotion", icon: Gift },
    // ⚠️ Customer now opens modal, not link
    { id: "customer", label: "Customer", href: "#", icon: Headset },
    { id: "download", label: "Download", href: "/download", icon: Download },
    { id: "account", label: "Account", href: "/account", icon: User },
  ];

  return (
    <>
      <footer className="bg-[#22222B]/80 sticky bottom-0 z-50 backdrop-blur-sm ">
        <nav className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.id === "customer") {
                    setIsCustomerOpen(true);
                  } else {
                    // For others, use Link behavior (or router.push if needed)
                    window.location.href = item.href;
                  }
                }}
                className={`flex flex-col cursor-pointer items-center justify-center gap-1 flex-1 py-2 transition
                  ${
                    isActive
                      ? "text-chart-4"
                      : "text-white hover:text-white"
                  }
                `}
                aria-label={item.label}
              >
                <Icon
                  className={`w-6 h-6 transition-transform ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                />
                <span className="text-[11px] font-medium leading-none">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </footer>

      {/* Customer Modal */}
      <CustomerModal isOpen={isCustomerOpen} onClose={() => setIsCustomerOpen(false)} />
    </>
  );
};

export default Footer;