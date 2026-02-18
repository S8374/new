// @/config/sidebar.config.ts
import { SidebarItem, SidebarSection } from "@/types/sidebar.types";
import {
  LayoutDashboard,
  FileText,
  MessageCircle,
  Phone,
  Shield,
  Mail,
  Settings,
  BarChart3,
  Zap,
  Users,
  Code,
  Folder,
  Key,
} from "lucide-react";

export const SIDEBAR_CONFIG: SidebarSection[] = [
  {
    title: "Admin Panel",
    roles: ["ADMIN"],
    items: [

      {
        title: "Marquee",
        icon: MessageCircle,
        items: [
          { title: "Marquee Handel", url: "/admin/marquee", icon: Mail },
        ],
      },
      {
        title: "Slider",
        icon: Phone,
        items: [
          { title: "Slider Controll", url: "/admin/slider-controll", icon: Users },
          { title: "Add Slider Type", url: "/admin/add-slider-type", icon: Users },
          { title: "Add Slider", url: "/admin/sliders", icon: Users },
        ],
      }
    ],
  }
  ,
  {
    title: "User Panel",
    roles: ["USERS"],
    items: [
      {
        title: "Dashboard",
        url: "/user/overview",
        icon: LayoutDashboard,
      },
      {
        title: "Phonebook",
        icon: Phone,
        items: [
          { title: "Contacts", url: "/user/phonebook/contacts", icon: Users },
          { title: "Groups", url: "/user/phonebook/groups", icon: Users },
        ],
      },
      {
        title: "Reports",
        icon: BarChart3,
        items: [
          { title: "Usage", url: "/user/reports/usage", icon: Zap },
          { title: "Delivery", url: "/user/reports/delivery", icon: Mail },
          { title: "Errors", url: "/user/reports/errors", icon: Shield },
        ],
      },
      {
        title: "Developer / API",
        icon: Code,
        items: [
          { title: "API Keys", url: "/user/api/keys", icon: Key },
          { title: "Webhooks", url: "/user/api/webhooks", icon: Zap },
          { title: "Documentation", url: "/user/api/docs", icon: FileText },
        ],
      },
    ]
  }
];

// Helper: check if item has children
export const hasChildren = (item: SidebarItem): item is SidebarItem & { items: SidebarItem[] } =>
  !!item.items && item.items.length > 0;