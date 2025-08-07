import {
  LuBadgeCheck,
  LuBell,
  LuChevronsUpDown,
  LuCreditCard,
  LuLogOut,
  LuSparkles,
} from "react-icons/lu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/shadcn/sidebar";
import SidebarProfile from "@/app/[locale]/(dashboard)/_components/uis/sidebar/sidebar-profile";

export default function SidebarHeaderProfile() {
  return (
    <SidebarProfile
      {...{
        name: "alramadi",
        email: "alramadi@vheexa.com",
        image: {
          url: "",
          alternate: "aLr",
        },
      }}
    />
  );
}
