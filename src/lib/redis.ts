import { IMoviesResponse } from "@/interfaces/MoviesResponse.interface";
import { createClient } from "redis";

interface QueryProps {
  page: number;
  year?: number;
  title?: string;
}

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("error", (err) => console.log("Redis Client Error", err));

const getRedisConnectionInstance = async () => {
  if (!redis.isOpen) {
    await redis.connect();
  }
  return redis;
};

export const saveCacheMovies = async (query: any, results: IMoviesResponse) => {
  const redisInstance = await getRedisConnectionInstance();

  let purgedFilters: string = "";
  let arrayPurgedFilters: string[] = [];
  for (const key in query) {
    if (query[key]) {
      const tempFilter = `${key}=${encodeURIComponent(query[key])}`;
      arrayPurgedFilters.push(tempFilter);
    }
  }

  purgedFilters = arrayPurgedFilters.join("&");

  //   redisInstance.json.set(`movies?${purgedFilters}`, "$", {
  //     ...(results as any),
  //   },);

  redisInstance.setEx(
    `movies:${purgedFilters}`,
    60 * 10,
    JSON.stringify({ ...results })
  );

  //   redisInstance.disconnect();
};

export const getCacheMovies = async (query: any) => {
  const redisInstance = await getRedisConnectionInstance();

  let purgedFilters: string = "";
  let arrayPurgedFilters: string[] = [];
  for (const key in query) {
    if (query[key]) {
      const tempFilter = `${key}=${encodeURIComponent(query[key])}`;
      arrayPurgedFilters.push(tempFilter);
    }
  }

  purgedFilters = arrayPurgedFilters.join("&");

  const foundResult = await redisInstance.get(`movies:${purgedFilters}`);

  //   redisInstance.disconnect();

  return foundResult ? JSON.parse(foundResult) : null;
};
