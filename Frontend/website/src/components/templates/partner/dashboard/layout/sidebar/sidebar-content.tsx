"use client";

import { Link } from "@/components/blocks/links";
import {
  SidebarContent as ShadcnSidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/shadcn/sidebar";
import { useTranslations } from "next-intl";

export default function SidebarContent() {
  const tSidebarContent = useTranslations(
    "app.partner.dashboard.layout.sidebar",
  );
  const sections = tSidebarContent.raw("content");

  return (
    <ShadcnSidebarContent>
      <SidebarSection sections={sections} />
    </ShadcnSidebarContent>
  );
}

type tLink = {
  url: string;
  label: string;
};
type tSection = {
  label: string;
  links: tLink[];
};

type tSidebarSectionProps = {
  sections: tSection[];
};
function SidebarSection({ sections }: tSidebarSectionProps) {
  const sidebar = useSidebar();

  function onClick() {
    sidebar.setOpenMobile(false);
  }

  return sections.map((section, index) => (
    <SidebarGroup key={index}>
      <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {section.links.map((link, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild onClick={onClick}>
                <Link href={link.url}>{link.label}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
}
