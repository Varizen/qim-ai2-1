import "../config.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Query is required" });

    const apiUrl = "https://api.semanticscholar.org/graph/v1/paper/search";
    const params = new URLSearchParams({
      query: q,
      limit: "20",
      fields: "title,authors,year,citationCount,url",
    });

    const response = await fetch(`${apiUrl}?${params.toString()}`);
    if (!response.ok) {
      return res.status(502).json({ error: "Semantic Scholar API error" });
    }

    const data = await response.json();
    const rawPapers = data.data || [];

    // Deduplicate and format papers
    const seen = new Set();
    const papers = [];
    for (const p of rawPapers) {
      const key = p.title;
      if (seen.has(key)) continue;
      seen.add(key);
      papers.push({
        title: p.title,
        authors: (p.authors || []).map((a) => a.name),
        year: p.year,
        citationCount: p.citationCount || 0,
        url: p.url || "",
      });
    }

    // Build author stats
    const authorMap = new Map();
    for (const p of rawPapers) {
      for (const a of p.authors || []) {
        const name = a.name;
        const existing = authorMap.get(name) || { totalCitations: 0, papers: 0, years: [] };
        existing.totalCitations += p.citationCount || 0;
        existing.papers += 1;
        if (p.year) existing.years.push(p.year);
        authorMap.set(name, existing);
      }
    }

    const currentYear = new Date().getFullYear();
    const authors = Array.from(authorMap.entries())
      .map(([name, stats]) => {
        const maxYear = stats.years.length > 0 ? Math.max(...stats.years) : currentYear;
        // Normalize recency score: 1.0 = current year, 0.0 = 20 years ago
        const recencyNorm = Math.max(0, Math.min(1, (maxYear - (currentYear - 20)) / 20));
        const score = 0.5 * stats.totalCitations + 0.3 * stats.papers * 10 + 0.2 * recencyNorm * 100;
        return {
          name,
          totalCitations: stats.totalCitations,
          papers: stats.papers,
          score: Math.round(score * 10) / 10,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    res.json({ papers, authors });
  } catch (err) {
    console.error("Research error:", err.message);
    res.status(500).json({ error: "Research search failed." });
  }
});

export default router;
