import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));  // Static ফাইল সার্ভ করবে

const GIFTED_API = "https://giftedapi.com/pair";  // Gifted API URL

// Pair Code জেনারেট করার রুট
app.post("/get-pair-code", async (req, res) => {
    const { whatsapp } = req.body;

    try {
        const response = await fetch(`${GIFTED_API}/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ whatsapp })
        });

        const data = await response.json();
        res.json({ pairCode: data.pairCode });
    } catch (error) {
        res.status(500).json({ error: "Pair Code আনতে সমস্যা হয়েছে!" });
    }
});

// মিউজিক পাঠানোর রুট
app.post("/send-music", async (req, res) => {
    const { pairCode, musicUrl } = req.body;

    try {
        const response = await fetch(`${GIFTED_API}/send-music`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pairCode, musicUrl })
        });

        const data = await response.json();
        res.json({ success: data.success });
    } catch (error) {
        res.status(500).json({ error: "মিউজিক পাঠাতে সমস্যা হয়েছে!" });
    }
});

// সার্ভার চালু করা
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
