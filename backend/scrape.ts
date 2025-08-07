import axios from "axios"; // axios for making HTTP requests
import { JSDOM } from "jsdom"; // JSDOM for parsing HTML and querying DOM elements

// Function to scrape Amazon search results based on a keyword
export default async function scrapeAmazon(keyword: string) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

  const response = await axios.get(url, {
    headers: {
      //for simulating a browser request and avoiding bot detection
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36",
    },
  });

  // Parse the HTML response using JSDOM
  const dom = new JSDOM(response.data);
  const document = dom.window.document;

  // Query the document for product items
  const results: any[] = [];
  // Select all elements that match the product item structure
  const items = document.querySelectorAll(
    "[data-component-type='s-search-result']"
  );

  // Iterate over each item and extract relevant information
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
