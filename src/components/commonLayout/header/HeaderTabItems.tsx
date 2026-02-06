"use client";

import { Bell, CreditCard, Settings, User, Flame, Eye, Tv, Fish, Ticket, Target, Dice5 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useRef } from "react";

// Corrected imports
import HomeTabContent from "./tabContent/HomeTabContent";
import HotTabContent from "./tabContent/HotTabContent";
import RecentViewTabContent from "./tabContent/RecentViewTabContent";
import SlotGameTabContent from "./tabContent/SlotGameTabContent";
import LiveTabContent from "./tabContent/LiveTabContent";
import LottoryTabContent from "./tabContent/LottoryTabContent";
import SportTabContent from "./tabContent/SportTabContent";
import TableGameTabContent from "./tabContent/TableGameTabContent";
import FishingGameTabContent from "./tabContent/FisingTabContent";

const HeaderTabItems = () => {
  const [activeTab, setActiveTab] = useState("home");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Tab data with proper icons
  const tabs = [
    { id: "home", label: "Home", icon: User },
    { id: "hot", label: "Hot", icon: Flame },
    { id: "recent-views", label: "Recent Views", icon: Eye },
    { id: "slot-game", label: "Slot Game", icon: Settings },
    { id: "live", label: "Live", icon: Tv },
    { id: "fishing-game", label: "Fishing Game", icon: Fish },
    { id: "lottory", label: "Lottory", icon: Ticket },
    { id: "sport", label: "Sport", icon: Target },
    { id: "table-game", label: "Table Game", icon: Dice5 },
  ];

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

  return (
    <Tabs 
      defaultValue="home" 
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      {/* Scrollable Tabs List */}
      <div className="relative mb-4">
        
        <ScrollArea 
          ref={scrollAreaRef}
          className="w-full whitespace-nowrap rounded-md px-4"
        >
          <TabsList className="inline-flex h-10 items-center justify-center  bg-muted p-1 text-muted-foreground gap-2 min-w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={`
                    inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium 
                    ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none 
                    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:pointer-events-none disabled:opacity-50
                    data-[state=active]:bg-background data-[state=active]:text-foreground 
                    data-[state=active]:shadow-sm hover:bg-muted/80
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
        <TabsContent 
          value="home" 
          className="mt-0 data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut"
        >
          <HomeTabContent />
        </TabsContent>
        
        <TabsContent 
          value="hot" 
          className="mt-0 data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut"
        >
          <HotTabContent />
        </TabsContent>
        
        <TabsContent 
          value="recent-views" 
          className="mt-0 data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut"
        >
          <RecentViewTabContent />
        </TabsContent>
        
        <TabsContent 
          value="slot-game" 
          className="mt-0 data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut"
        >
          <SlotGameTabContent />
        </TabsContent>
        
        <TabsContent 
          value="live" 
          className="mt-0 data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut"
        >
          <LiveTabContent />
        </TabsContent>
        
        <TabsContent 
          value="fishing-game" 
          className="mt-0 data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut"
        >
          <FishingGameTabContent />
        </TabsContent>
        
        <TabsContent 
          value="lottory" 
          className="mt-0 data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut"
        >
          <LottoryTabContent />
        </TabsContent>
        
        <TabsContent 
          value="sport" 
          className="mt-0 data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut"
        >
          <SportTabContent />
        </TabsContent>
        
        <TabsContent 
          value="table-game" 
          className="mt-0 data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut"
        >
          <TableGameTabContent />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default HeaderTabItems;