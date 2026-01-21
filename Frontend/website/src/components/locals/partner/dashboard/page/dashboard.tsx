"use client";

import useToken from "@/hooks/partner/token";

export default function Dashboard() {
    const a = useToken();
    console.log(a);

  return "Dashboards";
}
