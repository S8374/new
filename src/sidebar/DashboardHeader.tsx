"use client";

import { BellIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardHeader() {
  return (
    <header className="h-16 w-full bg-[#1f3d5b] flex items-center justify-end px-6">
      <div className="flex items-center gap-6 text-white">

        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 text-sm">
            <span className="text-lg">🇺🇸</span>
            <span>English</span>
            <ChevronDownIcon size={14} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>বাংলা</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notification */}
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <BellIcon size={18} />
        </Button>

      
    
        {/* User Profile */}
        {/* <div className="flex items-center gap-3 border-l border-white/20 pl-4">
          <div className="text-right leading-tight">
            <p className="text-sm font-medium">Md. Rezaul Haque</p>
            <p className="text-xs text-green-400">Available</p>
          </div>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatar.jpg" />
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
        </div> */}

      </div>
    </header>
  );
}