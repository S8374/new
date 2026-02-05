/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface GameCard {
  id: string;
  title: string;
  provider: string;
  imageUrl: string;
}

const HOT_GAMES: GameCard[] = [
  { id: "1", title: "QUEEN OF BOUNTY", provider: "PGSOFT", imageUrl: "/images/queen-of-bounty.jpg" },
  { id: "2", title: "WILD BOUNTY SHOWDOWN", provider: "PGSOFT", imageUrl: "/images/wild-bounty.jpg" },
  { id: "3", title: "ZEUS VS HADES", provider: "PRAGMATIC PLAY", imageUrl: "/images/zeus-hades.jpg" },
  { id: "4", title: "STARLIGHT PRINCESS 1000", provider: "PRAGMATIC PLAY", imageUrl: "/images/starlight.jpg" },
];

export default function HotGamesSlider() {
  const [swiper, setSwiper] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const syncState = (s: any) => {
    if (!s) return;
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  return (
    <div className="w-full bg-background px-4 py-4 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          🔥 <span>Hot</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => swiper?.slidePrev()}
            disabled={!swiper || isBeginning}
            className={`w-8 h-8 rounded-md flex items-center justify-center text-foreground
              ${isBeginning ? "opacity-40 cursor-not-allowed" : "hover:bg-black/30"}`}
          >
            ‹
          </button>

          <button
            onClick={() => swiper?.slideNext()}
            disabled={!swiper || isEnd}
            className={`w-8 h-8 rounded-md flex items-center justify-center text-foreground
              ${isEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-black/30"}`}
          >
            ›
          </button>
        </div>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={14}
        grabCursor
        watchOverflow
        onSwiper={(s) => {
          setSwiper(s);
          syncState(s);
        }}
        onSlideChange={syncState}
        onResize={syncState}
        className="w-full !overflow-visible"
      >
        {HOT_GAMES.map((game) => (
          <SwiperSlide
            key={game.id}
            className="!w-[120px] sm:!w-[130px] md:!w-[140px]" // smaller width
          >
            <div className="group flex flex-col rounded-lg border border-black/30 overflow-hidden cursor-pointer bg-black/20 backdrop-blur-sm hover:border-white/30 transition-all">
              {/* Image */}
              <div className="relative w-full h-[140px] overflow-hidden"> {/* fixed height */}
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div className="p-2 text-white">
                <div className="text-sm font-semibold leading-tight truncate">
                  {game.title}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {game.provider}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
