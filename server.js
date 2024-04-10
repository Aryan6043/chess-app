const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const { redisClient } = require("./config/redis");

dotenv.config();

const app = express();

db.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log("Connected to MySQL Database...");
});

app.get("/", (req, res) => {
    res.send("<h1>Hello from express</h1>");
});

// Example route that uses Redis
app.get("/cache-example", async (req, res) => {
    try {
        const cacheKey = "someKey";
        let data = await redisClient.get(cacheKey);
        if (data) {
            return res.json({ source: 'cache', data: JSON.parse(data) });
        }
        
        // Placeholder for data fetching logic from a database or another source
        data = { message: "Hello from database or other data source" };
        
        // Save fetched data in Redis cache
        await redisClient.set(cacheKey, JSON.stringify(data), { EX: 3600 }); // Expires in 1 hour

        return res.json({ source: 'db', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
