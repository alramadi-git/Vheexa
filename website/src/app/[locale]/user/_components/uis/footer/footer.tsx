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
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import Time from "@/app/[locale]/user/_components/uis/footer/time";
import NextIntlLink from "@/components/locals/blocks/next-intl-link";

type TRoute = {
  label: string;
  href: string;
};
type TLinkGroup = {
  label: string;
  routes: Array<TRoute>;
};

const linkGroups: Array<TLinkGroup> = [
  {
    label: "Product",
    routes: [
      {
        label: "Features",
        href: "#",
      },
      {
        label: "Solution",
        href: "#",
      },
      {
        label: "Customers",
        href: "#",
      },
      {
        label: "Pricing",
        href: "#",
      },
      {
        label: "Help",
        href: "#",
      },
      {
        label: "About",
        href: "#",
      },
    ],
  },
  {
    label: "Solution",
    routes: [
      {
        label: "Startup",
        href: "#",
      },
      {
        label: "Freelancers",
        href: "#",
      },
      {
        label: "Organizations",
        href: "#",
      },
      {
        label: "Students",
        href: "#",
      },
      {
        label: "Collaboration",
        href: "#",
      },
      {
        label: "Design",
        href: "#",
      },
      {
        label: "Management",
        href: "#",
      },
    ],
  },
  {
    label: "Company",
    routes: [
      {
        label: "About",
        href: "#",
      },
      {
        label: "Careers",
        href: "#",
      },
      {
        label: "Blog",
        href: "#",
      },
      {
        label: "Press",
        href: "#",
      },
      {
        label: "Contact",
        href: "#",
      },
      {
        label: "Help",
        href: "#",
      },
    ],
  },
  {
    label: "Legal",
    routes: [
      {
        label: "Licence",
        href: "#",
      },
      {
        label: "Privacy",
        href: "#",
      },
      {
        label: "Cookies",
        href: "#",
      },
      {
        label: "Security",
        href: "#",
      },
    ],
  },
];

const socials = [];

export default async function Footer() {
  const t = await getTranslations("app.page.footer");

  return (
    <footer className="border-b bg-white pt-20 dark:bg-transparent">
      <div className="mb-8 border-b md:mb-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-6 pb-6">
          {/* <NextIntlLink href="/" className="block size-fit">
            <Image priority width="32" height="32" alt="" src="" />
          </NextIntlLink> */}
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 md:grid-cols-5 md:gap-0 lg:grid-cols-4">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-5 md:row-start-1 lg:col-span-3">
            {linkGroups.map((linkGroup, index) => (
              <div key={index} className="space-y-4 text-sm">
                <span className="block font-medium">{linkGroup.label}</span>
                {linkGroup.routes.map((item, index) => (
                  <NextIntlLink
                    key={index}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary block duration-150"
                  >
                    <span>{item.label}</span>
                  </NextIntlLink>
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
          <div className="flex flex-wrap justify-center gap-3.5">
            <NextIntlLink
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <FaLinkedinIn className="size-4" />
            </NextIntlLink>
            <NextIntlLink
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X/Twitter"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <FaXTwitter className="size-4" />
            </NextIntlLink>
            <NextIntlLink
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <FaMeta className="size-4" />
            </NextIntlLink>
            <NextIntlLink
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <FaInstagram className="size-4" />
            </NextIntlLink>
            <NextIntlLink
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <FaTiktok className="size-4" />
            </NextIntlLink>
            <NextIntlLink
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube"
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <FaYoutube className="size-4" />
            </NextIntlLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
