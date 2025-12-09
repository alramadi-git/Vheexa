import { ClsFetch } from "@/libraries/fetch";

const clsFetch = new ClsFetch(
  process.env.NEXT_PUBLIC_API_DOMAIN!,
  "/api/partner",
);

export { clsFetch };
