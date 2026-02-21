import { getTranslations } from "next-intl/server";

import { cn } from "@/utilities/cn";

import {
  FaRegCopyright,
  FaLinkedinIn,
  FaMeta,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

import {
  sectionClassName,
  Container,
} from "@/components/blocks/typography";

import { Link } from "@/components/blocks/links";
import { Logo } from "@/components/blocks/images";

type tLink = {
  url: string;
  label: string;
};
type tNavigationMenu = {
  label: string;
  links: tLink[];
};

const date = new Date();
export default async function Footer() {
  const tFooter = await getTranslations("app.user.layout.footer");
  const quickLinks: tNavigationMenu[] = tFooter.raw("quick-links");

  const year = date.getFullYear();

  return (
    <footer className={cn(sectionClassName, "border-t pb-0!")}>
      <Container>
        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
          <div className="space-y-3 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Link href="/" className="block size-fit">
                <Logo className="size-10" />
              </Link>
              <h3 className="text-2xl font-bold">{tFooter("title")}</h3>
            </div>
            <p className="text-muted-foreground text-pretty">
              {tFooter("description")}
            </p>
          </div>
          <div className="xs:grid-cols-2 grid gap-6 sm:col-span-2 lg:col-span-4 lg:grid-cols-4">
            {quickLinks.map((linkGroup, index) => (
              <div key={index} className="space-y-3">
                <h4 className="block text-lg font-medium">{linkGroup.label}</h4>
                <ul className="space-y-2 text-sm">
                  {linkGroup.links.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.url}
                        className="text-muted-foreground hover:text-primary block duration-150"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6 text-sm">
          <p className="text-muted-foreground flex items-center gap-1.5">
            {tFooter.rich("outro", {
              copyright: () => <FaRegCopyright className="size-3" />,
              time: () => <time dateTime={`${year}`}>{year}</time>,
              span: (chunk) => <span>{chunk}</span>,
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
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
      </Container>
    </footer>
  );
}
