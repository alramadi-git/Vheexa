import "server-only";

import { ClsFetch } from "@/libraries/fetch";

const clsFetch = new ClsFetch(process.env.API_DOMAIN!, "/api", {
  "X-Api-Key": `${process.env.API_KEY}`,
});

export { clsFetch as clsFetch };