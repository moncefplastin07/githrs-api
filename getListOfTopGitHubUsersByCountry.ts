
import { getDocument } from "./getDocument.ts";
export async function  getListOfTopGitHubUsersByCountry(slug: string) {
  const document = await getDocument(`https://commits.top/${slug}.html`)
  const usersTable = document.querySelector(".users-list tbody")
    ?.querySelectorAll(
      "tr",
    ) || [];

    const header = {
        lastUpdate: document.querySelector("section p code")?.textContent || null,
        country: document.querySelector('.wrapper section h1')?.textContent.split(' in ').at(-1)?.trim(),
        countrySlug: slug.split('/').at(-1)?.trim().split(".")[0],
        totalUsersNumber: Number(document.querySelector('.wrapper section b')?.textContent),
        by: {
          name: "Moncef Gaha",
          email: "x@moncefgaha.me",
          site: "https://moncefgaha.me",
        },
      };
  const usersList = ([...usersTable].map((userColmun) => {
    return {
      score: +userColmun.children[0]?.textContent.split(".")[0],
      URL: userColmun.children[1]?.querySelector("a")?.getAttribute("href"),
      name: userColmun.children[1]?.lastChild.nodeValue?.substring(
        1,
        userColmun.children[1].lastChild.nodeValue.length - 1,
      ),
      username: userColmun.children[1]?.querySelector("a")?.getAttribute("href")
        ?.split("/").at(-1),
      contribs: +userColmun.children[2]?.textContent,
      avatar:
        userColmun.children[3]?.querySelector("img")?.attributes["data-src"],
    };
  }));
  return { data:{ header, users: usersList }};
}