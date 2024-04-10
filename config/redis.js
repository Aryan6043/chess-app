const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

const host = process.env.REDIS_HOST || "localhost";
const redisClient = redis.createClient({
    url: `redis://${host}:6379`,
});

redisClient.on("error", (err) => {
    console.error("Redis error", err);
    process.exit(1);
});

(async () => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis...");
    } catch (err) {
        console.error("Redis connection error:", err);
        process.exit(1);
    }
})();

module.exports = { redisClient };
