import { getTranslations } from "next-intl/server";

import { format } from "libphonenumber-js";

import { FaWhatsapp } from "react-icons/fa6";
import { LuMail, LuPhone, LuMapPin } from "react-icons/lu";

import {
  Section,
  Container,
  Title,
  Description,
} from "@/components/locals/blocks/typography";

import { Placeholder } from "@/components/locals/blocks/images";

import { Link } from "@/components/locals/blocks/links";

export default async function Contact() {
  const tContact = await getTranslations("app.user.contact.page.contact");

  return (
    <Section>
      <Container className="space-y-8">
        <div className="flex items-center justify-center">
          <h1 className="border-primary/65 items-center border-b-2 px-2 pb-2 font-bold">
            {tContact("title")}
          </h1>
        </div>
        <div>
          <Title className="text-center">{tContact("subtitle")}</Title>
          <Description className="text-center">
            {tContact("description")}
          </Description>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Placeholder className="rounded" />
          <div className="space-y-6">
            <div className="space-y-3">
              <div>
                <h3 className="text-xl">{tContact("chat-with-us.title")}</h3>
                <p className="text-muted-foreground text-lg">
                  {tContact("chat-with-us.description")}
                </p>
              </div>
              <ul>
                <li>
                  <Link
                    href={tContact("chat-with-us.whatsapp.url")}
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <FaWhatsapp className="size-5" />
                    {tContact("chat-with-us.whatsapp.label")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={tContact("chat-with-us.email.url")}
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <LuMail className="size-5" />
                    {tContact("chat-with-us.email.label")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="text-xl">{tContact("call-us.title")}</h3>
                <p className="text-muted-foreground text-lg">
                  {tContact("call-us.description")}
                </p>
              </div>
              <ul>
                <li>
                  <Link
                    href={tContact("call-us.phone-number.url")}
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <LuPhone className="size-5" />
                    {format(tContact("call-us.phone-number.label"), "NATIONAL")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="text-xl">{tContact("visit-us.title")}</h3>
                <p className="text-muted-foreground text-lg">
                  {tContact("visit-us.description")}
                </p>
              </div>
              <ul>
                <li>
                  <Link
                    href={tContact("visit-us.location.url")}
                    className="inline-flex items-center gap-1.5 hover:underline"
                  >
                    <LuMapPin className="size-5" />
                    {tContact("visit-us.location.label")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
