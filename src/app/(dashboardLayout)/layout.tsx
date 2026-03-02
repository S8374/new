"use client";

import DashboardHeader from "@/sidebar/DashboardHeader";
import DashboardSidebar from "@/sidebar/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // 🔐 Protect dashboard
  useEffect(() => {
    if (!loading && !user) {
      router.push("/?auth=required");
    }
  }, [user, loading]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <DashboardSidebar role={user.role} />

      <div className="flex flex-col flex-1">
        <DashboardHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}