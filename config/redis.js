const redis = require("redis")
const dotenv = require("dotenv")

dotenv.config();

const host = process.env.REDIS_HOST || "http://192.168.56.1"

const redisClient = redis.createClient({port: 6379, host});

console.log('Initializing Redis...')

redisClient.on("error", (err) => {
    console.log(err)
    process.exit(1);
})

redisClient.on("ready", () => {
    console.log("Redis client connected and ready to use...");
});

redisClient.on("connect", () => {
    console.log("Connected to Redis...")
})

module.exports = redisClient;