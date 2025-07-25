import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import {
  FaRegCopyright,
  FaLinkedinIn,
  FaMeta,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

const LINKS = [
  {
    group: "Product",
    items: [
      {
        title: "Features",
        href: "#",
      },
      {
        title: "Solution",
        href: "#",
      },
      {
        title: "Customers",
        href: "#",
      },
      {
        title: "Pricing",
        href: "#",
      },
      {
        title: "Help",
        href: "#",
      },
      {
        title: "About",
        href: "#",
      },
    ],
  },
  {
    group: "Solution",
    items: [
      {
        title: "Startup",
        href: "#",
      },
      {
        title: "Freelancers",
        href: "#",
      },
      {
        title: "Organizations",
        href: "#",
      },
      {
        title: "Students",
        href: "#",
      },
      {
        title: "Collaboration",
        href: "#",
      },
      {
        title: "Design",
        href: "#",
      },
      {
        title: "Management",
        href: "#",
      },
    ],
  },
  {
    group: "Company",
    items: [
      {
        title: "About",
        href: "#",
      },
      {
        title: "Careers",
        href: "#",
      },
      {
        title: "Blog",
        href: "#",
      },
      {
        title: "Press",
        href: "#",
      },
      {
        title: "Contact",
        href: "#",
      },
      {
        title: "Help",
        href: "#",
      },
    ],
  },
  {
    group: "Legal",
    items: [
      {
        title: "Licence",
        href: "#",
      },
      {
        title: "Privacy",
        href: "#",
      },
      {
        title: "Cookies",
        href: "#",
      },
      {
        title: "Security",
        href: "#",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-b bg-white pt-20 dark:bg-transparent">
      <div className="mb-8 border-b md:mb-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-6 pb-6">
          <Link href="/" className="block size-fit">
            <Image priority width="32" height="32" alt="" src="" />
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
                    href={item.href}
                    className="text-muted-foreground hover:text-primary block duration-150"
                  >
                    <span>{item.title}</span>
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
            <FaRegCopyright className="size-3" />
            <span>
              {new Date().getFullYear()} Vheexa LLC, All rights reserved
            </span>
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
