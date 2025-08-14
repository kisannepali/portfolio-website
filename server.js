const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = "f3a6064f08724bef91a15154251408"; // keep secret here
const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=kathmandu&aqi=no`;

// Serve static files (your HTML, CSS, JS)
app.use(express.static("public"));

app.get("/temperature", async (req, res) => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const temp = data.current.temp_c;
        res.json({ message: `The temperature of Kathmandu is ${temp}°C.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching temperature." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
