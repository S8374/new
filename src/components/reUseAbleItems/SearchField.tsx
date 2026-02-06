// SearchField.tsx
"use client";

import { useState, useRef } from "react";

const TYPE_BADGES = [
  { id: "SP0RTS", label: "JDB", color: "bg-gradient-to-r from-yellow-500 to-orange-600" },
  { id: "DOBU", label: "CQ9", color: "bg-indigo-700" },
  { id: "LUDU", label: "FC FA CHAI", color: "bg-gray-800" },
  { id: "JILI", label: "JIL", color: "bg-amber-600" },
] as const;

type GameType = (typeof TYPE_BADGES)[number]["id"];

interface SearchFieldProps {
  onSearch?: (query: string) => void;
  onTypeSelect?: (type: GameType | null) => void;
  placeholder?: string;
  className?: string;
}

const SearchField = ({
  onSearch,
  onTypeSelect,
  placeholder = "搜索游戏...",
  className = "",
}: SearchFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<GameType | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTypeClick = (type: GameType) => {
    const newActive = activeType === type ? null : type;
    setActiveType(newActive);
    if (onTypeSelect) onTypeSelect(newActive);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
      setIsEditing(false);
      setQuery("");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setQuery("");
    // Clear filter when exiting search? Optional:
    // if (onTypeSelect) onTypeSelect(null);
  };

  const handleIconClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Badge-Only Mode (default) */}
      {!isEditing && (
        <div
          className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
          onClick={handleIconClick}
        >
          {/* Type Badges — left */}
          <div className="flex gap-2 min-w-0">
            {TYPE_BADGES.map((badge) => (
              <button
                key={badge.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTypeClick(badge.id);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-all ${
                  activeType === badge.id
                    ? `${badge.color} text-white shadow-md`
                    : "bg-gray-700/70 text-gray-300 hover:bg-gray-600"
                }`}
                aria-label={`Filter by ${badge.label}`}
              >
                {badge.label}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Search Icon */}
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Open search"
            onClick={handleIconClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* Input Mode — BADGES HIDDEN */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-700">
            {/* 🔴 NO BADGES HERE — they are hidden */}

            {/* Search Input — takes full space */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
              autoFocus
            />

            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="ml-2 px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            {/* Search Submit Icon */}
            <button
              type="submit"
              className="ml-1 p-1.5 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchField;