import type { TGroup } from "@/app/[locale]/(dashboard)/_types/group";

import {
  SidebarGroup as ShadcnSidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/shadcn/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/collapsible";
import { LuChevronRight } from "react-icons/lu";
import NextIntlLink from "@/components/locals/blocks/next-intl-link";
import SidebarSubfolder from "@/app/[locale]/(dashboard)/_components/uis/sidebar/sidebar-subfolder";

type TSidebarGroup = TGroup;

export default function SidebarGroup(props: TSidebarGroup) {
  return (
    <ShadcnSidebarGroup>
      <SidebarGroupLabel>{props.title}</SidebarGroupLabel>
      <SidebarMenu>
        {props.folders.map((folder) => (
          <Collapsible asChild key={folder.label}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="sidebar-parent rounded">
                <SidebarMenuButton tooltip={folder.label}>
                  <span>{folder.label}</span>
                  <LuChevronRight className="sidebar-son-rotate-90 ml-auto transition-transform duration-200" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {folder.folders.map((folder) => (
                    <SidebarSubfolder key={folder.label} {...folder} />
                  ))}

                  {folder.files.map((file) => (
                    <SidebarMenuSubItem key={file.label}>
                      <SidebarMenuSubButton asChild className="rounded">
                        <NextIntlLink href={file.href}>
                          <span>{file.label}</span>
                        </NextIntlLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        {props.files.map((file) => (
          <SidebarMenuItem key={file.label}>
            <SidebarMenuButton asChild className="rounded">
              <NextIntlLink href={file.href}>{file.label}</NextIntlLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </ShadcnSidebarGroup>
  );
}
