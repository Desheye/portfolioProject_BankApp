const redis = require('redis');
const client = redis.createClient();

// Connect to Redis server
client.connect().catch(err => {
  console.error('Redis connection error:', err);
});

// Function to get user data from Redis cache
async function getUserDataFromCache(key, redisInstance = client) {
  try {
    const cachedData = await redisInstance.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error('Error fetching data from Redis:', error);
    throw error;
  }
}

// Function to cache user data in Redis
async function cacheUserData(key, data, redisInstance = client, ttl = 3600) {
  try {
    await redisInstance.set(key, JSON.stringify(data), 'EX', ttl); // Cache for 1 hour (3600 seconds)
  } catch (error) {
    console.error('Error caching data in Redis:', error);
    throw error;
  }
}

module.exports = {
  getUserDataFromCache,
  cacheUserData,
};
