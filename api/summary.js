const express = require("express");
const router = express.Router();
const openrouterSummary = require("../services/openrouter.js").default;

router.post("/summary", async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.json({ summary: "❌ No text provided" });
    }

    try {
        const summary = await openrouterSummary(text);
        res.json({ summary });

    } catch (err) {
        console.error(err);
        res.json({ summary: "❌ Summary generation error" });
    }
});

module.exports = router;
