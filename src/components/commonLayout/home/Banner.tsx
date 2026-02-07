"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";
import Marquee from "react-fast-marquee";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Megaphone } from "lucide-react";

const slides = [
  {
    title: "",
    subtitle: "",
    text: "",
    image: "https://admin.tkv6test.cc/uploads/20251126/0ab6232392ffde09f96e20d02035afea.png",
  },
  {
    title: "",
    subtitle: "",
    text: "",
    image: "https://admin.tkv6test.cc/uploads/20251126/1f97f88339250ae8d7a654b598a645d8.png",
  },
  {
    title: "",
    subtitle: "",
    text: "",
    image: "https://admin.tkv6test.cc/uploads/20251126/ef98c6653485bd4e4176289a99ceeaab.png",
  },
  {
    title: "",
    subtitle: "",
    text: "",
    image: "https://admin.tkv6test.cc/uploads/20251126/52181298ba1f93bc7d5a6757fb663c2b.png",
  },
  {
    title: "",
    subtitle: "",
    text: "",
    image: "https://admin.tkv6test.cc/uploads/20251126/85c4e0392491a68c1188c1964cb2e1d2.png",
  },
  {
    title: "",
    subtitle: "",
    text: "",
    image: "https://admin.tkv6test.cc/uploads/20251126/0ab6232392ffde09f96e20d02035afea.png",
  },
];

export default function Banner() {
  return (
    <div className="relative rounded-xl  overflow-hidden">
      <div className=" bg-chart-4/30">
        <div className="p-2 flex ">
          <Megaphone className="pr-1 text-chart-4 "/>
          <Marquee className="text-background">
            I can be a React component, multiple React components, or just some text.
          </Marquee>
        </div>
      </div>

      <div>
        <Swiper
          speed={800}
          parallax
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          navigation
          modules={[Parallax, Pagination, Navigation, Autoplay]}
          className="w-full h-[30vh] md:h-[30vh]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
                data-swiper-parallax="-30%"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                <div className="max-w-2xl text-white space-y-4">
                  <h1
                    className="text-3xl md:text-5xl font-bold"
                    data-swiper-parallax="-300"
                  >
                    {slide.title}
                  </h1>

                  <h3
                    className="text-lg md:text-2xl text-gray-200"
                    data-swiper-parallax="-200"
                  >
                    {slide.subtitle}
                  </h3>

                  <p
                    className="text-sm md:text-base text-gray-300"
                    data-swiper-parallax="-100"
                  >
                    {slide.text}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
