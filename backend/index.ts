import express from "express";
import cors from "cors";
import scrapeAmazon from "./scrape";

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes

// scraping endpoint
app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword as string;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    const data = await scrapeAmazon(keyword);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Scraping failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
