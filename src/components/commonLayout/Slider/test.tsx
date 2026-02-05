"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Types
interface GameCard {
  id: string;
  title: string;
  provider: string;
  imageUrl: string;
  bgColor: string; // e.g., "from-purple-500 to-pink-500"
}

// Mock data matching your image
const HOT_GAMES: GameCard[] = [
  {
    id: "sugar-rush",
    title: "SUGAR RUSH",
    provider: "PRAGMATIC PLAY",
    imageUrl: "/images/sugar-rush.jpg", // → replace with real path or base64
    bgColor: "from-purple-500 to-pink-500",
  },
  {
    id: "mt真人",
    title: "MT真人",
    provider: "MT OFA LIVE",
    imageUrl: "/images/mt-live.jpg",
    bgColor: "from-red-500 to-orange-500",
  },
  {
    id: "mahjong-ways",
    title: "MAHJONG WAYS",
    provider: "PGSOFT",
    imageUrl: "/images/mahjong-ways.jpg",
    bgColor: "from-yellow-500 to-orange-500",
  },
  {
    id: "mahjong-ways-2",
    title: "MAHJONG WAYS 2",
    provider: "PGSOFT",
    imageUrl: "/images/mahjong-ways-2.jpg",
    bgColor: "from-green-500 to-emerald-500",
  },
  {
    id: "live-casino",
    title: "LIVE CASINO",
    provider: "EVOLUTION",
    imageUrl: "/images/live-casino.jpg",
    bgColor: "from-blue-500 to-indigo-500",
  },
];

// Fallback placeholder if images not ready
const PlaceholderCard = ({ title, provider, bgColor }: Omit<GameCard, "id" | "imageUrl">) => (
  <div className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] ${bgColor} flex flex-col h-full`}>
    <div className="h-32 bg-white/20 flex items-center justify-center">
      <div className="text-white text-xs font-bold uppercase tracking-wider">{title}</div>
    </div>
    <div className="p-3 bg-black/20 backdrop-blur-sm">
      <div className="text-white text-sm font-semibold truncate">{title}</div>
      <div className="text-white/80 text-xs mt-1">{provider}</div>
    </div>
  </div>
);

export default function HotGamesSlider() {
  const [swiper, setSwiper] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!swiper) return;
    const updateArrows = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };
    swiper.on("slideChange", updateArrows);
    return () => {
      swiper.off("slideChange", updateArrows);
    };
  }, [swiper]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">🔥</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Hot</h2>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => swiper?.slidePrev()}
            disabled={isBeginning}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isBeginning
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            disabled={isEnd}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isEnd
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView="auto"
        centeredSlides={false}
        grabCursor={true}
        loop={false}
        onSwiper={setSwiper}
        className="w-full"
        breakpoints={{
          320: { slidesPerView: "auto", spaceBetween: 12 },
          768: { slidesPerView: 3.5, spaceBetween: 16 },
          1024: { slidesPerView: 4.5, spaceBetween: 20 },
        }}
      >
        {HOT_GAMES.map((game) => (
          <SwiperSlide key={game.id} className="!w-[160px] sm:!w-[180px] md:!w-[200px]">
            <div 
              className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] ${game.bgColor} flex flex-col h-full cursor-pointer group`}
              role="link"
              tabIndex={0}
              onClick={() => console.log(`Play ${game.title}`)}
            >
              {/* Image / Placeholder */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-xs font-bold uppercase tracking-wider text-center px-2">
                    {game.title}
                  </div>
                </div>
              </div>
              
              {/* Info */}
              <div className="p-3 bg-black/20 backdrop-blur-sm">
                <div className="text-white text-sm font-semibold truncate">{game.title}</div>
                <div className="text-white/80 text-xs mt-1">{game.provider}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
