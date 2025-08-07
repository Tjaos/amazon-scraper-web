import axios from "axios";
import { JSDOM } from "jsdom";

export default async function scrapeAmazon(keyword: string) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36",
    },
  });

  const dom = new JSDOM(response.data);
  const document = dom.window.document;

  const results: any[] = [];
  const items = document.querySelectorAll(
    "[data-component-type='s-search-result']"
  );

  items.forEach((item) => {
    const title = item.querySelector("h2 span")?.textContent?.trim();
    const rating = item.querySelector(".a-icon-alt")?.textContent?.trim();
    const reviews = item.querySelector(".a-size-base")?.textContent?.trim();
    const image = item.querySelector("img")?.getAttribute("src");

    if (title && image) {
      results.push({
        title,
        rating: rating || "N/A",
        reviews: reviews || "N/A",
        image,
      });
    }
  });

  return results;
}
