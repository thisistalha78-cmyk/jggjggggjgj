// 📌 summary.js — Generate AI Summary using OpenRouter

const express = require("express");
const router = express.Router();
const openrouterSummary = require("../services/openrouter");

// POST /api/summary
router.post("/", async (req, res) => {
    console.log("REQ BODY RECEIVED >>> ", req.body);

    const { text } = req.body;

    // ❌ No text provided
    if (!text || text.trim() === "") {
        return res.json({ summary: "⚠ No text provided" });
    }

    try {
        // Call OpenRouter summary generator
        const summary = await openrouterSummary(text);

        return res.json({
            summary: summary || "⚠ Summary unavailable.",
        });

    } catch (err) {
        console.error("SUMMARY ERROR >>> ", err);
        return res.json({
            summary: "⚠ Error generating summary.",
        });
    }
});

module.exports = router;
