import { getDocument } from "./getDocument.ts";
export async function getListOfCountries() {
    const document = await getDocument(`https://commits.top/`)
    const countriesList = document.querySelectorAll(".country-list a") || [];
    const listOfCountries = [...countriesList].map((element)=>{
        return {
            country: element.textContent.trim(),
            slug: element.childNodes[0].parentElement?.attributes.href.split('.')[0],
        }
    })
    return  listOfCountries
}