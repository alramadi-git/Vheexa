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
import { Link } from "@/components/locals/blocks/link";
import { FullHDImage } from "@/components/locals/blocks/image";
import { Container, Section } from "@/components/locals/blocks/typography";

type tRoute = {
  label: string;
  href: string;
};
type tLinkGroup = {
  label: string;
  links: Array<tRoute>;
};

const date = new Date();
export default async function Footer() {
  const year = date.getFullYear();

  const t = await getTranslations("app.user.layout.footer");
  const quickLinks: Array<tLinkGroup> = t.raw("quick-links");

  return (
    <footer>
      <Section className="border-t py-12">
        <Container>
          <div className="grid md:grid-cols-6 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <Link href="/user" className="block size-fit">
                  <FullHDImage
                    src={t("logo.src")}
                    alt={t("logo.alt")}
                    className="size-10"
                  />
                </Link>

                <h3 className="text-2xl font-bold">{t("title")}</h3>
              </div>

              <p className="text-muted-foreground text-pretty">
                {t("description")}
              </p>
            </div>

            <div className="md:col-span-4 grid sm:grid-cols-2 gap-6 lg:grid-cols-4">
              {quickLinks.map((linkGroup, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="block text-lg font-medium">
                    {linkGroup.label}
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {linkGroup.links.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
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
              {t.rich("outro", {
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
      </Section>
    </footer>
  );
}
