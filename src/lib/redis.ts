import { IMoviesResponse } from "@/interfaces/MoviesResponse.interface";
import { Redis } from "ioredis";

interface QueryProps {
  page: number;
  year?: number;
  title?: string;
}

const redis = new Redis(String(process.env.REDIS_URI));

export const saveCacheMovies = async (query: any, results: IMoviesResponse) => {
  let purgedFilters: string = "";
  let arrayPurgedFilters: string[] = [];
  for (const key in query) {
    if (query[key]) {
      const tempFilter = `${key}=${encodeURIComponent(query[key])}`;
      arrayPurgedFilters.push(tempFilter);
    }
  }

  purgedFilters = arrayPurgedFilters.join("&");

  redis.setex(
    `movies:${purgedFilters}`,
    60 * 10,
    JSON.stringify({ ...results })
  );
};

export const getCacheMovies = async (query: any) => {
  let purgedFilters: string = "";
  let arrayPurgedFilters: string[] = [];
  for (const key in query) {
    if (query[key]) {
      const tempFilter = `${key}=${encodeURIComponent(query[key])}`;
      arrayPurgedFilters.push(tempFilter);
    }
  }

  purgedFilters = arrayPurgedFilters.join("&");

  const foundResult = await redis.get(`movies:${purgedFilters}`);

  const parsedResult = foundResult ? JSON.parse(foundResult) : null;

  return parsedResult;
};
