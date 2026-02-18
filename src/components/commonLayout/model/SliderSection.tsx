"use client";

import { useEffect, useState } from "react";
import CardSlider from "@/components/reUseAbleItems/CardSlider";
import { sliderService } from "@/services/api/slider.service";

const SliderSection = ({
  type,
  title,
  icon,
  showArrows = true,
}: {
  type: string;
  title: string;
  icon?: React.ReactNode;
  showArrows?: boolean;
}) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await sliderService.getAllSliders({ type });

        if (res?.success && res?.data) {
          const mapped = res.data.map((item: any) => ({
            id: item._id,
            title: item.title,
            subtitle: item.subtitle,
            imageUrl: item.image,
          }));

          setItems(mapped);
        }
      } catch (error) {
        console.error(`Failed to fetch ${type} sliders`, error);
      }
    };

    fetchSliders();
  }, [type]);

  if (!items.length) return null; // hide section if empty

  return (
    <CardSlider
      items={items}
      title={title}
      icon={icon}
      rounded={false}
      cardWidth={{ base: "140px", sm: "140px", md: "160px" }}
      cardHeight="140px"
      spaceBetween={10}
      showArrows={showArrows}
    />
  );
};

export default SliderSection;