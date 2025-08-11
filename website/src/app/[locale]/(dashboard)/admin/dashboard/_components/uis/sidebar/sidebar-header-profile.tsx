import SidebarProfile from "@/app/[locale]/(dashboard)/_components/uis/sidebar/sidebar-profile";

export default function SidebarHeaderProfile() {
  return (
    <SidebarProfile
      {...{
        name: "admin",
        email: "admin@vheexa.com",
        image: {
          url: "",
          alternate: "aLr",
        },
      }}
    />
  );
}
