"use client";

import {
  Sidebar as ShadcnSidebar,
  SidebarSeparator,
  
} from "@/components/shadcn/sidebar";

import SidebarHeader from "./sidebar-header";
import SidebarContent from "./sidebar-content";

export default function Sidebar() {
  return (
    <ShadcnSidebar>
      <SidebarHeader />
      <SidebarContent />
      <SidebarSeparator />
    </ShadcnSidebar>
  );
}
