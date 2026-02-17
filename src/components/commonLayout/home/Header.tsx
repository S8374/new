/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/shared/Logo/Logo";
import { Globe } from "lucide-react";
import SignInModal from "@/components/auth/SignInModal";
import SignUpModal from "@/components/auth/SignUpModal";
import BalanceHeader from "./BalanceHeader";
import { authService } from "@/services/api/auth.services";

const Header = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  
  // ── Auth state ────────────────────────────────────────
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await authService.me(undefined); // ← assume it returns Promise
        console.log(response)
        if (mounted) {
          setUser(response?.data || null);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, []);

  // Close dropdown on outside click
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

  const isLoggedIn = !!user;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-chart-4/30 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex shrink-0 h-28 w-28 items-center">
            <Logo />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {loading ? (
              // Optional: show skeleton / spinner while checking auth
              <div className="h-9 w-24 animate-pulse rounded-full bg-muted" />
            ) : isLoggedIn ? (
              <>
                <BalanceHeader />
                {/* You can also show username, avatar, logout button, etc. here */}
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-chart-4/30 border-chart-4 hover:text-background text-background hover:bg-chart-4/20"
                  onClick={() => setIsSignInOpen(true)}
                >
                  SIGN IN
                </Button>

                <Button
                  size="sm"
                  className="rounded-full bg-chart-4 text-foreground hover:bg-bg-chart-4/90"
                  onClick={() => setIsSignUpOpen(true)}
                >
                  SIGN UP
                </Button>
              </div>
            )}

            {/* Language Selector – always visible */}
            <div className="relative" ref={dropdownRef}>
              <Button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                size="icon"
                className="rounded-full text-background bg-chart/30 hover:bg-chart/30"
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
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition ${
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

      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </>
  );
};

export default Header;