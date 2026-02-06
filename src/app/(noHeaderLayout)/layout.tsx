import Footer from "@/components/commonLayout/home/Footer";
import React from "react";

export default function NoHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex justify-center bg-[#3B393A]">
      <div className="w-full max-w-[450px] flex flex-col min-h-dvh">
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
