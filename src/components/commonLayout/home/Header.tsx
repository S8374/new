"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/shared/Logo/Logo";
import { Globe } from "lucide-react";

const Header = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "bn", name: "বাংলা (Bangla)", flag: "🇧🇩" },
    { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
    { code: "ar", name: "العربية (Arabic)", flag: "🇸🇦" },
    { code: "es", name: "Español", flag: "🇪🇸" },
  ];

  const [selectedLang, setSelectedLang] = useState(languages[0]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-chart-4/30 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex shrink-0 h-20 w-20 items-center">
          <Logo />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Auth Buttons */}
          <div className=" flex items-center gap-2">
            <Link href="/sign-in">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-primary-foreground/80 text-primary-foreground hover:bg-primary-foreground/10"
              >
                SIGN IN
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button
                size="sm"
                className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                SIGN UP
              </Button>
            </Link>
          </div>

          

          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              size="icon"
              className="rounded-full text-primary-foreground hover:bg-primary-foreground/10"
              aria-label="Change language"
            >
              <Globe className="h-5 w-5" />
            </Button>

            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border bg-popover shadow-xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsLanguageOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition
                      ${
                        selectedLang.code === lang.code
                          ? "bg-accent font-medium"
                          : "hover:bg-accent/60"
                      }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
