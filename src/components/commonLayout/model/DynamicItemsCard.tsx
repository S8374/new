/* eslint-disable @next/next/no-img-element */
"use client";

import { ReactNode } from "react";
import { SliderItem } from "@/hooks/useSliders";

interface DynamicItemsCardProps {
  items: SliderItem[];
  cardWidth?: { base: string; sm?: string; md?: string };
  cardHeight?: string;
  spaceBetween?: number;
  title?: string;
  icon?: ReactNode;
  className?: string;
  rounded?: boolean;
  onItemClick?: (item: SliderItem) => void;
}

export default function DynamicItemsCard({
  items,
  cardWidth = { base: "120px", sm: "130px", md: "140px" },
  cardHeight = "140px",
  spaceBetween = 14,
  title,
  icon,
  className = "",
  rounded = true,
  onItemClick,
}: DynamicItemsCardProps) {
  if (!items.length) return null;

  return (
    <div className={`flex flex-col ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <h3 className="text-white font-medium">{title}</h3>
        </div>
      )}

      <div className={`flex flex-wrap ${
        spaceBetween === 4 ? "gap-1" :
        spaceBetween === 8 ? "gap-2" :
        spaceBetween === 12 ? "gap-3" :
        spaceBetween === 16 ? "gap-4" :
        spaceBetween === 20 ? "gap-5" :
        `gap-${Math.round(spaceBetween / 4)}`
      }`}>
        {items.map((item) => (
          <div
            key={item._id}
            onClick={() => onItemClick?.(item)}
            className={`group flex flex-col border border-black/30 overflow-hidden cursor-pointer bg-black/20 backdrop-blur-sm hover:border-white/30 transition-all ${
              rounded ? "rounded-lg" : ""
            } ${onItemClick ? "hover:scale-[1.02]" : ""}`}
            style={{ width: cardWidth.base }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ height: cardHeight }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {item.title && (
              <div className="p-2 text-white text-center">
                <p className="text-xs truncate">{item.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}