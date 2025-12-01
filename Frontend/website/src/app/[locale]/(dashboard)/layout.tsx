"use client";

import Header from "@/components/locals/[partner]/[dashboard]/header/header";
import Sidebar from "@/components/locals/[partner]/[dashboard]/sidebar/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/shadcn/sidebar";

export default function Layout({ children }: LayoutProps<"/[locale]">) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
