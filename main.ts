import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { getListOfTopGitHubUsersByCountry } from "./getListOfTopGitHubUsersByCountry.ts";
import { getListOfCountries } from "./getListOfCountries.ts";
serve(async (_req) => {
  const pathName = new URL(_req.url).pathname
  if (pathName.startsWith('/api/')) {
    if (pathName.startsWith('/api/list-of-countries')) {
      return new Response(`${JSON.stringify(await getListOfCountries())}`, {
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }),
    });
    
    }
    const countrySlug = pathName.split("/").at(-1)
      return new Response(`${JSON.stringify(await getListOfTopGitHubUsersByCountry(countrySlug))}`, {
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }),
      });
  }
});