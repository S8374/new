import HeaderTabItems from "@/components/commonLayout/header/HeaderTabItems";
import Banner from "@/components/commonLayout/home/Banner";
import NavItems from "@/components/commonLayout/home/NavItems";


export default function Home() {
  return (
    <main className="min-h-screen space-y-8 ">
      <Banner />
      <NavItems/>
      <HeaderTabItems/>
    </main>
  );
}