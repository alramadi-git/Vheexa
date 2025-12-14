"use client";

import Header from "@/components/locals/partner/dashboard/layout/header/header";
import Sidebar from "@/components/locals/partner/dashboard/layout/sidebar/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/shadcn/sidebar";

export default function Layout({ children }: LayoutProps<"/[locale]">) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset className="dashboard">
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
