"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";
import Marquee from "react-fast-marquee";
import { Megaphone } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { sliderTypeService } from "@/services/api/slider.types";

interface Slider {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  order: number;
}

export default function Banner() {
  const [slides, setSlides] = useState<Slider[]>([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await sliderTypeService.getSliderTypeWithSliders();
        const heroType = res.data.find(
          (type: any) => type.name === "hero"
        );
        if (heroType && heroType.sliders) {
          setSlides(heroType.sliders);
        }
      } catch (error) {
        console.error("Failed to fetch sliders", error);
      }
    };

    fetchSliders();
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Marquee */}
      <div className="bg-chart-4/30">
        <div className="p-2 flex">
          <Megaphone className="pr-1 text-chart-4" />
          <Marquee className="text-background">
            I can be a React component, multiple React components, or just some text.
          </Marquee>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        speed={800}
        parallax
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        modules={[Parallax, Pagination, Navigation, Autoplay]}
        className="w-full h-[30vh] md:h-[30vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              data-swiper-parallax="-30%"
            />         
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
