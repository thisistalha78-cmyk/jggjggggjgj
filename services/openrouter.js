const fetch = require("node-fetch");

async function openrouterSummary(text) {
    const API_KEY = process.env.OPENROUTER_API_KEY;

    if (!API_KEY) {
        console.log("❌ OPENROUTER_API_KEY missing!");
        return "Summary unavailable (missing API key).";
    }

    try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://yourapp.com",
                "X-Title": "DealFury Summary",
            },
            body: JSON.stringify({
                model: "google/gemma-2-9b-it:free",
                messages: [
                    { role: "system", content: "Summarize this deal text briefly." },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await res.json();

        return data?.choices?.[0]?.message?.content || "⚠ No summary returned.";

    } catch (err) {
        console.log("OpenRouter Error:", err);
        return "⚠ Error calling AI.";
    }
}

module.exports = openrouterSummary;
