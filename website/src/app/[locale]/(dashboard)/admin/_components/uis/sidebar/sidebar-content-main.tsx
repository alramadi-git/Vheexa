import type { TGroup } from "@/app/[locale]/(dashboard)/_types/group";

import { getTranslations } from "next-intl/server";

import { Fragment } from "react";
import {
  SidebarGroup,
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
import SidebarContentMainSubfolder from "./sidebar-content-main.subfolder";

export default async function SidebarContentMain() {
  const t = await getTranslations("admin.page.sidebar.main");
  const groups: Array<TGroup> = t.raw("groups");

  return (
    <Fragment>
      {groups.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarMenu>
            {group.folders.map((folder) => (
              <Collapsible asChild key={folder.label}>
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    asChild
                    className="sidebar-parent rounded"
                  >
                    <SidebarMenuButton tooltip={folder.label}>
                      <span>{folder.label}</span>
                      <LuChevronRight className="sidebar-son-rotate-90 ml-auto transition-transform duration-200" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {folder.folders.map((folder) => (
                        <SidebarContentMainSubfolder
                          key={folder.label}
                          {...folder}
                        />
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
            {group.files.map((file) => (
              <SidebarMenuItem key={file.label}>
                <SidebarMenuButton asChild className="rounded">
                  <NextIntlLink href={file.href}>{file.label}</NextIntlLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </Fragment>
  );
}
