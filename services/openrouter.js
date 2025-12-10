import fetch from "node-fetch";

export default async function openrouterSummary(text) {
    const API_KEY = process.env.OPENROUTER_API_KEY;

    if (!API_KEY) return "❌ Missing OpenRouter API key";

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "google/gemma-3n-e2b-it:free",
                messages: [
                    { role: "system", content: "Summarize the deals in simple language." },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await response.json();
        return data?.choices?.[0]?.message?.content || "⚠️ Summary unavailable.";
    } catch (err) {
        console.error("OpenRouter Error:", err);
        return "❌ AI summary failed.";
    }
}
