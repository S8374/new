import BuyCryptoSection from "../../home/BuyCryptoSection";
import PartnerMarquee from "../../home/PartnersSection";
import SliderSection from "../../model/SliderSection";

const HomeTabCOntent = () => {
  
  return (
    <div className="bg-[#3B393A]">
       <SliderSection type="hot" title="Hot Games" icon="🔥" />

      <SliderSection type="slot-game" title="Slots Games" icon="🎰" />
      
      <SliderSection type="lottory" title="Lottery Games" icon="🎟️" />
      
      <SliderSection type="live" title="Live Games" icon="📺" showArrows={false} />
      
      <SliderSection type="sport" title="Sports Games" icon="🏆" showArrows={false} />
      
      <SliderSection type="table-game" title="Table Games" icon="🎲" showArrows={false} />

      <BuyCryptoSection />
      <PartnerMarquee />
    </div>
  );
};

export default HomeTabCOntent;
