import CardSlider from "@/components/reUseAbleItems/CardSlider";
import BuyCryptoSection from "../../home/BuyCryptoSection";
import PartnerMarquee from "../../home/PartnersSection";

const HOT_GAMES = [
  { id: 1, title: "QUEEN OF BOUNTY", subtitle: "PGSOFT", imageUrl: "/images/queen-of-bounty.jpg" },
  { id: 2, title: "WILD BOUNTY SHOWDOWN", subtitle: "PGSOFT", imageUrl: "/images/wild-bounty.jpg" },
  { id: 3, title: "ZEUS VS HADES", subtitle: "PRAGMATIC PLAY", imageUrl: "/images/zeus-hades.jpg" },
  { id: 4, title: "ZEUS VS HADES", subtitle: "PRAGMATIC PLAY", imageUrl: "/images/zeus-hades.jpg" },
  { id: 5, title: "ZEUS VS HADES", subtitle: "PRAGMATIC PLAY", imageUrl: "/images/zeus-hades.jpg" },
];

const SLOT_GAMES = [
  { id: 1, title: "QUEEN OF BOUNTY", subtitle: "PGSOFT", imageUrl: "/images/queen-of-bounty.jpg" },
  { id: 2, title: "WILD BOUNTY SHOWDOWN", subtitle: "PGSOFT", imageUrl: "/images/wild-bounty.jpg" },

]
const HomeTabCOntent = () => {
  return (
    <div className="bg-[#3B393A]">
      <CardSlider
        items={HOT_GAMES}
                rounded={false}
        title="Hot Games"
        icon="🔥"
        cardWidth={{ base: "120px", sm: "130px", md: "150px" }}
        cardHeight="140px"
        spaceBetween={12}
      />
      <CardSlider
        items={SLOT_GAMES}
        title="Slots Games"
        rounded={false}
        icon="🔥"
        cardWidth={{ base: "140px", sm: "140px", md: "160px" }}
        cardHeight="120px"
        spaceBetween={12}
      />
     <CardSlider
        items={SLOT_GAMES}
        title="Lottery Games"
        rounded={false}
         icon="🔥"
        cardWidth={{ base: "140px", sm: "140px", md: "160px" }}
        cardHeight="120px"
        spaceBetween={12}
      />
      <CardSlider
        items={SLOT_GAMES}
        title="Sports Games"
        rounded={false}
        icon="🔥"
        cardWidth={{ base: "140px", sm: "140px", md: "160px" }}
        cardHeight="120px"
        spaceBetween={12}
      />
      <CardSlider
        items={SLOT_GAMES}
        title="Tables Games"
        rounded={false}
        icon="🔥"
        cardWidth={{ base: "140px", sm: "140px", md: "160px" }}
        cardHeight="120px"
        spaceBetween={12}
      />
     <BuyCryptoSection/>
     <PartnerMarquee/>
    </div>
  );
};

export default HomeTabCOntent;
