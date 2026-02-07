import HeaderTabItems from "@/components/commonLayout/header/HeaderTabItems";
import Banner from "@/components/commonLayout/home/Banner";
import NavItems from "@/components/commonLayout/home/NavItems";


export default function Home() {
  return (
    <main className="min-h-screen space-y-8 ">
      <div className="py-2 px-2 bg-linear-to-b from-chart-4/30 to-bg-[#3B393A]">
        <Banner />
      </div>

      <NavItems />
      <HeaderTabItems />
    </main>
  );
}