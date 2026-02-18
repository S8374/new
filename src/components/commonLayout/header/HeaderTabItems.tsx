/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { User, Flame, Eye, Tv, Fish, Ticket, Target, Dice5, Gamepad2, Home } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useRef, useMemo } from "react";

// Import tab contents
import HomeTabContent from "./tabContent/HomeTabContent";
import { sliderTypeService } from "@/services/api/slider.types";
import { sliderService } from "@/services/api/slider.service";
import SearchField from "@/components/reUseAbleItems/SearchField";
import ItemsCard from "@/components/reUseAbleItems/ItemsCard";

// Map of icons for different tab types
const iconMap: Record<string, any> = {
  home: Home,
  hot: Flame,
  'recent-views': Eye,
  live: Tv,
  'fishing-game': Fish,
  lottory: Ticket,
  sport: Target,
  'table-game': Dice5,
  'slot-game': Gamepad2,
  // Default icon for dynamic tabs
  default: User
};

const HeaderTabItems = () => {
  const [activeTab, setActiveTab] = useState("home"); // Home is default active
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [sliderTypes, setSliderTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch slider types from API
  useEffect(() => {
    const fetchSliderTypes = async () => {
      try {
        setLoading(true);
        const res = await sliderTypeService.getAllSliderTypes();
        if (res?.success && res?.data) {
          setSliderTypes(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch slider types", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderTypes();
  }, []);

  console.log("Fetched Slider Types:", sliderTypes);

// Filter out both "hero" and "home" from dynamic tabs
const filteredSliderTypes = sliderTypes.filter(
  (type) => type.name.toLowerCase() !== "hero" && type.name.toLowerCase() !== "home"
);

  // Dynamic tabs from API (slider types) - excluding hero
  const dynamicTabs = filteredSliderTypes.map((type) => ({
    id: type.name.toLowerCase().replace(/\s+/g, '-'),
    label: type.name,
    icon: iconMap[type.name.toLowerCase()] || iconMap.default,
    originalName: type.name,
    _id: type._id
  }));

  // Static Home tab
  const homeTab = {
    id: "home",
    label: "Home",
    icon: iconMap.home
  };

  // Combine tabs - Home first, then dynamic tabs
  const allTabs = [homeTab, ...dynamicTabs];

  // Auto-scroll to active tab
  useEffect(() => {
    if (scrollAreaRef.current) {
      const activeElement = scrollAreaRef.current.querySelector('[data-state="active"]');
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeTab]);

  if (loading) {
    return (
      <div className="w-full bg-[#3B393A] sticky top-16 z-40 mb-4">
        <div className="h-10 flex items-center justify-center">
          <div className="text-white">Loading tabs...</div>
        </div>
      </div>
    );
  }

  return (
    <Tabs 
      defaultValue="home" 
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full bg-[#3B393A] sticky"
    >
      {/* Scrollable Tabs List */}
      <div className="sticky top-16 z-40 mb-4">
        <ScrollArea 
          ref={scrollAreaRef}
          className="w-full whitespace-nowrap bg-[#3B393A]"
        >
          <TabsList className="inline-flex h-10 bg-[#3B393A] items-center justify-center p-1 text-background gap-2 min-w-full">
            {allTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={`
                    inline-flex items-center justify-center whitespace-nowrap rounded px-2 py-4 text-sm font-medium 
                    text-background ring-offset-background transition-all duration-300 ease-in-out 
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:pointer-events-none disabled:opacity-50
                    data-[state=active]:bg-[#525151] data-[state=active]:text-background 
                    data-[state=active]:shadow-sm hover:bg-[#525151] data-[state=active]:rounded
                    min-w-fit
                  `}
                >
                  <Icon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110" />
                  <span className="transition-all duration-200">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          <ScrollBar orientation="horizontal" className="opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </ScrollArea>
      </div>

      {/* Tabs Content with Smooth Transitions */}
      <div className="relative overflow-hidden min-h-[400px]">
        {/* Home Tab Content */}
        <TabsContent value="home" className="mt-0 data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut">
          <HomeTabContent />
        </TabsContent>
        
        {/* Dynamic content for slider types (excluding hero) */}
        {dynamicTabs.map((tab) => (
          <TabsContent 
            key={tab.id}
            value={tab.id} 
            className="mt-0 data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut"
          >
            <DynamicTabContent sliderTypeId={tab._id} sliderTypeName={tab.label} />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

const DynamicTabContent = ({
  sliderTypeId,
  sliderTypeName,
}: {
  sliderTypeId: string;
  sliderTypeName: string;
}) => {
  const [sliders, setSliders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        setLoading(true);
        const res = await sliderService.getAllSliders({
          sliderTypeId,
        });

        if (res?.success && res?.data) {
          setSliders(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch sliders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, [sliderTypeId]);

  // 🔎 Search filter
  const filteredItems = useMemo(() => {
    return sliders.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sliders, searchQuery]);

  // 🔁 Convert API sliders → ItemsCard format
  const mappedItems = filteredItems.map((item) => ({
    id: item._id,
    title: item.title,
    subtitle: item.subtitle,
    imageUrl: item.image,
    onClick: () => {
      if (item.imageRedirectLink) {
        window.open(item.imageRedirectLink, "_blank");
      }
    },
  }));

  if (loading) {
    return (
      <div className="p-6 text-white text-center">
        Loading {sliderTypeName} games...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SearchField
        onSearch={(q) => setSearchQuery(q)}
        className="mb-6"
      />

      <ItemsCard
        items={mappedItems}
        title={`${sliderTypeName} Games`}
        rounded={false}
        icon="🎮"
        cardWidth={{ base: "140px", sm: "140px", md: "160px" }}
        cardHeight="160px"
        spaceBetween={12}
      />
    </div>
  );
};

export default HeaderTabItems;