import { DOMParser } from "deno-dom";
export async function getDocument(url:string) {
    const response = await fetch(url);
    return new DOMParser().parseFromString(
        await response.text(),
        "text/html",
    )!;
}