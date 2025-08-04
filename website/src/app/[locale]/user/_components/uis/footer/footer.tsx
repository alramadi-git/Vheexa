import { getTranslations } from "next-intl/server";

import {
  FaRegCopyright,
  FaLinkedinIn,
  FaMeta,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
// import Image from "next/image";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import Link from "@/components/locals/blocks/next-intl-link";
import Time from "@/app/[locale]/user/_components/uis/footer/time";

const LINKS: Array<{
  group: string;
  items: Array<{ label: string; url: string }>;
}> = [
  {
    group: "Product",
    items: [
      {
        label: "Features",
        url: "#",
      },
      {
        label: "Solution",
        url: "#",
      },
      {
        label: "Customers",
        url: "#",
      },
      {
        label: "Pricing",
        url: "#",
      },
      {
        label: "Help",
        url: "#",
      },
      {
        label: "About",
        url: "#",
      },
    ],
  },
  {
    group: "Solution",
    items: [
      {
        label: "Startup",
        url: "#",
      },
      {
        label: "Freelancers",
        url: "#",
      },
      {
        label: "Organizations",
        url: "#",
      },
      {
        label: "Students",
        url: "#",
      },
      {
        label: "Collaboration",
        url: "#",
      },
      {
        label: "Design",
        url: "#",
      },
      {
        label: "Management",
        url: "#",
      },
    ],
  },
  {
    group: "Company",
    items: [
      {
        label: "About",
        url: "#",
      },
      {
        label: "Careers",
        url: "#",
      },
      {
        label: "Blog",
        url: "#",
      },
      {
        label: "Press",
        url: "#",
      },
      {
        label: "Contact",
        url: "#",
      },
      {
        label: "Help",
        url: "#",
      },
    ],
  },
  {
    group: "Legal",
    items: [
      {
        label: "Licence",
        url: "#",
      },
      {
        label: "Privacy",
        url: "#",
      },
      {
        label: "Cookies",
        url: "#",
      },
      {
        label: "Security",
        url: "#",
      },
    ],
  },
];

export default async function Footer() {
  const t = await getTranslations("app.page.footer");

  return (
    <footer className="border-b bg-white pt-20 dark:bg-transparent">
      <div className="mb-8 border-b md:mb-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-6 pb-6">
          <Link href="/" className="block size-fit">
            {/* <Image priority width="32" height="32" alt="" src="" /> */}
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 md:grid-cols-5 md:gap-0 lg:grid-cols-4">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-5 md:row-start-1 lg:col-span-3">
            {LINKS.map((link, index) => (
              <div key={index} className="space-y-4 text-sm">
                <span className="block font-medium">{link.group}</span>
                {link.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className="text-muted-foreground hover:text-primary block duration-150"
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <form className="row-start-1 border-b pb-8 text-sm md:col-span-2 md:border-none lg:col-span-1">
            <div className="space-y-4">
              <Label htmlFor="mail" className="block font-medium">
                Newsletter
              </Label>
              <div className="flex gap-2">
                <Input
                  id="mail"
                  name="mail"
                  type="email"
                  placeholder="Your email"
                  className="h-8 text-sm"
                />
                <Button size="sm">Submit</Button>
              </div>
              <span className="text-muted-foreground block text-sm">
                {"Don't"} miss any update!
              </span>
            </div>
          </form>
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6 text-sm">
          <p className="text-muted-foreground flex items-center gap-1.5">
            {t.rich("outro", {
              copyright: () => <FaRegCopyright className="size-3" />,
              time: () => <Time />,
              span: (chunk) => <span>{chunk}</span>,
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <FaLinkedinIn className="size-4" />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X/Twitter"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <FaXTwitter className="size-4" />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <FaMeta className="size-4" />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <FaInstagram className="size-4" />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <FaTiktok className="size-4" />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <FaYoutube className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
