// import necessary modules
import express from "express"; //express for creating APIs and HTTP server
import cors from "cors"; //cors for permitting cross-origin requests
import scrapeAmazon from "./scrape"; // import the scraping function responsable for fetching data from Amazon

const app = express(); // create an instance of express app
const PORT = 3000; // define the port on which the server will listen

app.use(cors()); // Enable CORS for all routes

// scraping endpoint
app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword as string;

  if (!keyword) {
    // Check if keyword is provided
    return res.status(400).json({ error: "Keyword is required" });
  }

  // Call the scrape function with the provided keyword
  try {
    const data = await scrapeAmazon(keyword);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Scraping failed" });
  }
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
