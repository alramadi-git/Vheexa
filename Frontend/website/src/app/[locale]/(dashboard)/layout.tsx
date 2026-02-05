"use client";

import { SidebarProvider, SidebarInset } from "@/components/shadcn/sidebar";

import Sidebar from "@/components/locals/partner/dashboard/layout/sidebar/sidebar";
import Header from "@/components/locals/partner/dashboard/layout/header/header";

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
