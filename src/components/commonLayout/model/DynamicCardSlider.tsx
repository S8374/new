/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SliderItem {
    id: string | number;
    title: string;
    subtitle?: string;
    imageUrl: string;
    extra?: ReactNode;
}

interface DynamicCardSliderProps {
    items: SliderItem[];
    cardWidth?: { base: string; sm?: string; md?: string };
    cardHeight?: string;
    spaceBetween?: number;
    title?: string;
    icon?: ReactNode;
    className?: string;
    rounded?: boolean;
    showArrows?: boolean;
    onItemClick?: (item: SliderItem) => void;
}

export default function DynamicCardSlider({
    items,
    cardWidth = { base: "120px", sm: "130px", md: "140px" },
    cardHeight = "140px",
    spaceBetween = 14,
    title,
    icon,
    className = "",
    rounded = true,
    showArrows = true,
    onItemClick,
}: DynamicCardSliderProps) {
    const [swiper, setSwiper] = useState<any>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const syncState = (s: any) => {
        if (!s) return;
        setIsBeginning(s.isBeginning);
        setIsEnd(s.isEnd);
    };

    const roundedClass = rounded ? "rounded-lg" : "";

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className={`w-full bg-[#3B393A] px-4 py-4 ${className}`}>
            {(title || icon) && (
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-background font-semibold">
                        {icon} <span>{title}</span>
                    </div>

                    {showArrows && items.length > 3 && (
                        <div className="flex gap-2">
                            <Button
                                onClick={() => swiper?.slidePrev()}
                                disabled={!swiper || isBeginning}
                                className={`w-8 h-8 flex items-center justify-center text-foreground
                                    ${isBeginning ? "opacity-40 cursor-not-allowed" : "hover:bg-black/30"}`}
                            >
                                <ArrowLeft />
                            </Button>

                            <Button
                                onClick={() => swiper?.slideNext()}
                                disabled={!swiper || isEnd}
                                className={`w-8 h-8 flex items-center justify-center text-foreground
                                    ${isEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-black/30"}`}
                            >
                                <ArrowRight />
                            </Button>
                        </div>
                    )}
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
                            width: cardWidth.base,
                        }}
                        className="!overflow-visible"
                    >
                        <div
                            onClick={() => onItemClick?.(item)}
                            className={`group flex flex-col border border-black/30 overflow-hidden cursor-pointer bg-black/20 backdrop-blur-sm hover:border-white/30 transition-all ${roundedClass}`}
                            style={{
                                borderRadius: rounded ? undefined : 0,
                            }}
                        >
                            <div
                                className="relative w-full overflow-hidden"
                                style={{ height: cardHeight }}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.title || "Game image"}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                            
                            {/* Show title if available */}
                            {item.title && (
                                <div className="p-2 text-white text-center">
                                    <p className="text-xs truncate">{item.title}</p>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}