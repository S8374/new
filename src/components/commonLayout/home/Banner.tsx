"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";
import Marquee from "react-fast-marquee";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Slide One",
    subtitle: "Amazing Nature",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit.",
    image: "https://swiperjs.com/demos/images/nature-1.jpg",
  },
  {
    title: "Slide Two",
    subtitle: "Beautiful View",
    text: "Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.",
    image: "https://swiperjs.com/demos/images/nature-2.jpg",
  },
  {
    title: "Slide Three",
    subtitle: "Peaceful Place",
    text: "Aliquam hendrerit lorem at elit facilisis rutrum.",
    image: "https://swiperjs.com/demos/images/nature-3.jpg",
  },
];

export default function Banner() {
  return (
    <div className="">
      <Marquee>
  I can be a React component, multiple React components, or just some text.
</Marquee>
      <div>
        <Swiper
          speed={800}
          parallax
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          navigation
          modules={[Parallax, Pagination, Navigation, Autoplay]}
          className="w-full h-[60vh] md:h-[40vh]"
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
