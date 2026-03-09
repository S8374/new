"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchFilterBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filter: string | null) => void;
  filters?: Array<{ id: string; label: string; color?: string }>;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

const SearchFilterBar = ({
  onSearch,
  onFilterChange,
  filters = [],
  placeholder = "Search...",
  className = "",
  debounceMs = 300,
}: SearchFilterBarProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchQuery);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch, debounceMs]);

  const handleFilterClick = (filterId: string) => {
    const newFilter = activeFilter === filterId ? null : filterId;
    setActiveFilter(newFilter);
    if (onFilterChange) onFilterChange(newFilter);
  };

  const handleSearchClick = () => {
    setIsSearching(true);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleSearchClose = () => {
    setIsSearching(false);
    setSearchQuery("");
    if (onSearch) onSearch("");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (onSearch) onSearch("");
    inputRef.current?.focus();
  };

  // Default filter colors if not provided
  const getFilterColor = (index: number) => {
    const colors = [
      'from-purple-600 to-pink-600',
      'from-blue-600 to-cyan-600',
      'from-green-600 to-emerald-600',
      'from-orange-600 to-red-600',
      'from-indigo-600 to-purple-600',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className={`w-full ${className}`}>
      {!isSearching ? (
        // Filter mode - show filter badges
        <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-700">
          {/* Filter Badges */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
                  activeFilter === filter.id
                    ? filter.color || `bg-gradient-to-r ${getFilterColor(index)} text-white shadow-md`
                    : 'bg-gray-700/70 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Search Button */}
          <button
            onClick={handleSearchClick}
            className="p-1.5 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Open search"
          >
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      ) : (
        // Search mode - show search input
        <div className="relative">
          <div className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 focus-within:border-blue-500 transition-colors">
            <div className="pl-3">
              <Search className="w-5 h-5 text-gray-400" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-3 py-2.5 text-sm"
              autoFocus
            />

            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="p-1.5 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}

            <button
              onClick={handleSearchClose}
              className="px-3 py-1.5 mr-1 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;