import type { TFolder } from "@/app/[locale]/(dashboard)/_types/folder";

import {
  SidebarMenuButton,
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

type TSidebarContentMainSubfolder = {
  props: TFolder;
};

export default function SidebarContentMainSubfolder(
  props: TSidebarContentMainSubfolder["props"],
) {
  return (
    <Collapsible asChild>
      <SidebarMenuSubItem>
        <CollapsibleTrigger asChild className="sidebar-parent rounded">
          <SidebarMenuButton tooltip={props.label}>
            <span className="line-clamp-1">{props.label}</span>
            <LuChevronRight className="sidebar-son-rotate-90 ml-auto transition-transform duration-200" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {props.folders.map((folder) => (
              <SidebarContentMainSubfolder key={props.label} {...folder} />
            ))}

            {props.files.map((file) => (
              <SidebarMenuSubItem key={file.label}>
                <SidebarMenuSubButton asChild className="line-clamp-1 rounded">
                  <NextIntlLink href={file.href}>{file.label}</NextIntlLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuSubItem>
    </Collapsible>
  );
}
