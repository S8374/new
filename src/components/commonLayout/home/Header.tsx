"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/shared/Logo/Logo";
import { Globe } from "lucide-react";

const Header = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const toggleLanguage = () => setIsLanguageOpen((prev) => !prev);

  const selectLanguage = (lang: typeof languages[0]) => {
    setSelectedLang(lang);
    setIsLanguageOpen(false);
    console.log("Language changed to:", lang.name);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Right Section: Auth + Language */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Auth Buttons - Stack on small screens */}
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/sign-in" passHref>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-primary-foreground/80 text-primary-foreground hover:bg-primary-foreground/10"
              >
                SIGN IN
              </Button>
            </Link>
            <Link href="/sign-up" passHref>
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
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-full p-2 text-primary-foreground/90 hover:bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
              aria-expanded={isLanguageOpen}
              aria-haspopup="true"
              aria-label={`Switch language (current: ${selectedLang.name})`}
            >
              <Globe className="h-5 w-5" />
              {/* Show flag + code only on medium+ screens */}
              <span className="hidden md:inline text-sm font-medium">
                {selectedLang.flag} {selectedLang.code.toUpperCase()}
              </span>
              {/* On small screens: just flag */}
              <span className="md:hidden text-base">{selectedLang.flag}</span>
            </Button>

            {/* Dropdown */}
            {isLanguageOpen && (
              <div
                className="
                  absolute right-0 top-full z-50 mt-2 w-56 origin-top-right 
                  overflow-hidden rounded-xl border bg-popover shadow-xl 
                  ring-1 ring-black/5 focus:outline-none
                  dark:border-border dark:bg-popover
                "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="language-menu"
              >
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang)}
                      className={`
                        flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm
                        ${selectedLang.code === lang.code
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-accent-foreground"}
                        transition-colors
                      `}
                      role="menuitem"
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-only auth buttons (below sm) */}
      <div className="sm:hidden px-4 pb-3 pt-1">
        <div className="flex gap-2 justify-end">
          <Link href="/sign-in" passHref>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary-foreground/80 text-primary-foreground hover:bg-primary-foreground/10 w-24"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up" passHref>
            <Button
              size="sm"
              className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-24"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;