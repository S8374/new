import { DUMMY_USER } from "@/lib/dummyAuth";
import DashboardHeader from "@/sidebar/DashboardHeader";
import DashboardSidebar from "@/sidebar/DashboardSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Modern dashboard interface",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <DashboardSidebar role={DUMMY_USER.role} />

      <div className="flex flex-col flex-1">
        <DashboardHeader />

        <main className="flex-1 ">
          {/* Page content with animation */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
            
            {/* Content */}
            <div className="relative">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}