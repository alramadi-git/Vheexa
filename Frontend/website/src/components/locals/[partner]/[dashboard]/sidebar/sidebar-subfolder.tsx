import { TFolder } from "@/app/[locale]/(dashboard)/_types/folder";
import { LuChevronRight } from "react-icons/lu";

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
import { Link } from "@/components/locals/blocks/link";

type TSidebarFolder = TFolder;

export default function SidebarSubfolder(props: TSidebarFolder) {
  return (
    <Collapsible asChild>
      <SidebarMenuSubItem>
        <CollapsibleTrigger asChild className="sidebar-parent l rounded">
          <SidebarMenuButton tooltip={props.label}>
            <span className="line-clamp-1">{props.label}</span>
            <LuChevronRight className="sidebar-son-rotate-90 ml-auto transition-transform duration-200" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {props.folders.map((folder) => (
              <SidebarSubfolder key={props.label} {...folder} />
            ))}

            {props.files.map((file) => (
              <SidebarMenuSubItem key={file.label}>
                <SidebarMenuSubButton
                  asChild
                  className="l line-clamp-1 rounded"
                >
                  <Link href={file.href}>{file.label}</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuSubItem>
    </Collapsible>
  );
}
