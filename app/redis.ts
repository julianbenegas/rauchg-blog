import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error("UPSTASH_REDIS_REST_TOKEN is not defined");
}

const redis = new Redis({
  // url: "https://global-apt-bear-30602.upstash.io", rauchg's one
  url: "https://us1-fun-octopus-41504.upstash.io", // ours
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default redis;
