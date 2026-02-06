import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" className="relative w-40 h-20">
      <Image
        src="https://img.tkzc886.com/imgcn/tkzc/tkzcminilogo4.png"
        alt="Company Logo"
        fill
        placeholder="blur"
        blurDataURL="/icons/commonLayout/header/Logo-blur.jpg"
        className="object-contain"
      />
    </Link>
  );
}
