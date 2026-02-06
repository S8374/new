/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Button } from "../ui/button";

interface CardSliderItem {
    id: string | number;
    title: string;
    subtitle?: string;
    imageUrl: string;
    extra?: ReactNode;
}

interface CardSliderProps {
    items: CardSliderItem[];
    cardWidth?: { base: string; sm?: string; md?: string }; // width strings, e.g., "140px"
    cardHeight?: string; // e.g., "140px"
    spaceBetween?: number;
    title?: string;
    icon?: ReactNode;
    className?: string;
    rounded?: boolean; // optional rounded control
}

export default function CardSlider({
    items,
    cardWidth = { base: "120px", sm: "130px", md: "140px" },
    cardHeight = "140px",
    spaceBetween = 14,
    title,
    icon,
    className = "",
    rounded = true,
}: CardSliderProps) {
    const [swiper, setSwiper] = useState<any>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const syncState = (s: any) => {
        if (!s) return;
        setIsBeginning(s.isBeginning);
        setIsEnd(s.isEnd);
    };

    // Helper for rounded classes
    const roundedClass = rounded ? "rounded-lg" : "";

    return (
        <div className={`w-full bg-background px-4 py-4 ${className}`}>
            {(title || icon) && (
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                        {icon} <span>{title}</span>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={() => swiper?.slidePrev()}
                            disabled={!swiper || isBeginning}
                            className={`w-8 h-8 flex items-center justify-center text-foreground
                ${isBeginning ? "opacity-40 cursor-not-allowed" : "hover:bg-black/30"}`}
                        >
                            ‹
                        </Button>

                        <button
                            onClick={() => swiper?.slideNext()}
                            disabled={!swiper || isEnd}
                            className={`w-8 h-8 flex items-center justify-center text-foreground
                ${isEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-black/30"}`}
                        >
                            ›
                        </button>
                    </div>
                </div>
            )}

            <Swiper
                modules={[Navigation]}
                slidesPerView="auto"
                spaceBetween={spaceBetween}
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
                {items.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        style={{
                            width: cardWidth.base, // dynamic width for base
                        }}
                        className="!overflow-visible"
                    >
                        <div
                            className={`group flex flex-col border border-black/30 overflow-hidden cursor-pointer bg-black/20 backdrop-blur-sm hover:border-white/30 transition-all ${roundedClass}`}
                            style={{
                                borderRadius: rounded ? undefined : 0,
                            }}
                        >
                            {/* Image */}
                            <div
                                className="relative w-full overflow-hidden"
                                style={{ height: cardHeight }}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>

                            {/* Text */}
                            <div className="p-2 text-white">
                                <div className="text-sm font-semibold leading-tight truncate">
                                    {item.title}
                                </div>
                                {item.subtitle && (
                                    <div className="text-xs text-gray-400 mt-0.5">
                                        {item.subtitle}
                                    </div>
                                )}
                                {item.extra && <div className="mt-1">{item.extra}</div>}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
