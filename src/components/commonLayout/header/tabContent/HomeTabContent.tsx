import CardSlider from "@/components/reUseAbleItems/CardSlider";
import BuyCryptoSection from "../../home/BuyCryptoSection";
import PartnerMarquee from "../../home/PartnersSection";

const HOT_GAMES = [
  { id: 1, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/pp/ppvs20swbonsup.webp" },
  { id: 2, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/pg/pg135.webp" },
  { id: 3, title: "ZEUS VS HADES", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/pg/pg1695365.webp" },
  { id: 4, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/pg/pg65.webp" },
  { id: 5, title: "", subtitle: "", imageUrl: "https://admin.tkv6test.cc/uploads/20260104/654fdbbfbddafab36b5f07c4186486a7.png" },
  { id: 6, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/pp/ppvs20sugarrushx.webp" },
  { id: 7, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-jqqd3.webp" }
];

const SLOT_GAMES = [
  { id: 1, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-jdb3.webp" },
  { id: 2, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-fcdz4.webp" },
  { id: 3, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-cq9dz4.webp" },
  { id: 4, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-pp4.webp" },
  { id: 5, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-pg4.webp?v=2" },
  { id: 6, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-jdb3.webp" }

]

const Lottery_Games = [
  { id: 1, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-pc284.2-4.63.webp" },
  { id: 2, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-pc28high3.webp" },
  { id: 3, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-pc284.2-4.63.webp" },
  { id: 4, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-jqqd3.webp" },
]
const Live_Games = [
  { id: 1, title: "", subtitle: "", imageUrl: "https://admin.tkv6test.cc/uploads/20260104/c0862d6074eb3e889a101d1a811d1b7c.png" },
  { id: 2, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-bbinlive4.webp" },
  { id: 3, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-pplive4.webp" },
  { id: 4, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-jqqd3.webp" },
]
const Sports_Games = [
  { id: 1, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-imty3.webp" },
  { id: 2, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-crhgty3.webp" },
  { id: 3, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-jqqd3.webp" },
]
const Table_Games = [
  { id: 1, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-fcqp3.webp" },
  { id: 3, title: "", subtitle: "", imageUrl: "https://img.tkzc886.com/imgen/ztb/ztb-jqqd3.webp" },
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
        spaceBetween={10}
      />
      <CardSlider
        items={SLOT_GAMES}
        title="Slots Games"
        rounded={false}
        icon="🔥"
        cardWidth={{ base: "140px", sm: "140px", md: "160px" }}
        cardHeight="140px"
        spaceBetween={10}
      />
      <CardSlider
        items={Lottery_Games}
        title="Lottery Games"
        rounded={false}
        icon="🔥"
        cardWidth={{ base: "140px", sm: "140px", md: "160px" }}
        cardHeight="140px"
        spaceBetween={10}
      />
      <CardSlider
        items={Live_Games}
        title="Live Games"
        rounded={false}
        icon="🔥"
        cardWidth={{ base: "140px", sm: "140px", md: "160px" }}
        cardHeight="140px"
        spaceBetween={10}
        showArrows={false}

      />
      <CardSlider
        items={Sports_Games}
        title="Sports Games"
        rounded={false}
        icon="🔥"
        cardWidth={{ base: "140px", sm: "140px", md: "160px" }}
        cardHeight="140px"
        spaceBetween={10}
        showArrows={false}

      />
      <CardSlider
        items={Table_Games}
        title="Tables Games"
        rounded={false}
        icon="🔥"
        cardWidth={{ base: "140px", sm: "140px", md: "160px" }}
        cardHeight="140px"
        spaceBetween={10}
        showArrows={false}
      />
      <BuyCryptoSection />
      <PartnerMarquee />
    </div>
  );
};

export default HomeTabCOntent;
