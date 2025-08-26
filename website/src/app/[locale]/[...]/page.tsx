import { notFound } from "next/navigation";

export const dynamic = "force-static";

/**
 * According to the Next-Intl documentation, this is the recommended way to handle unknown routes.
 * This page is only here to catch unknown routes. It's not meant to be accessed directly.
 */ export default function Page() {
    notFound();
 };
