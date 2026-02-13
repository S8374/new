/* eslint-disable react/jsx-key */
"use client";

import Logo from "@/shared/Logo/Logo";
import Link from "next/link";

const promotionItems = [
  {
    id: "1",
    image:
      "https://admin.tkv6test.cc/uploads/20251126/0ab6232392ffde09f96e20d02035afea.png",
  },
  {
    id: "2",
    image:
      "https://admin.tkv6test.cc/uploads/20251126/1f97f88339250ae8d7a654b598a645d8.png",
  },
  {
    id: "3",
    image:
      "https://admin.tkv6test.cc/uploads/20251126/ef98c6653485bd4e4176289a99ceeaab.png",
  },
];

const PromotionSection= () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://img.tkzc886.com/imgcn/tkzc/bg_login.webp')",
      }}
      className="min-h-dvh"
    >
      {/* Logo */}
      <div className="flex shrink-0 h-20 w-20 ml-4 items-center">
        <Logo />
      </div>

      {/* Promotions */}
      <div className="max-w-6xl mx-auto space-y-4 p-4">
        {promotionItems.map((item) => (
          <Link
            key={item.id}
            href={`/promotion/${item.id}`}
            className="block"
          >
            <div
              className="relative rounded-xl overflow-hidden group cursor-pointer"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "180px",
              }}
            >
              {/* Optional hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default PromotionSection ;