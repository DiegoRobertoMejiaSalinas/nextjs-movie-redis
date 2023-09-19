import { IMoviesResponse } from "@/interfaces/MoviesResponse.interface";
import { ISingleMovieCastResponse } from "@/interfaces/SingleMovieCastResponse.interface";
import { ISingleMovieResponse } from "@/interfaces/SingleMovieResponse.interface";
import { ISingleMovieRevenueBudgetResponse } from "@/interfaces/SingleMovieRevenueBudget.interface";
import { Redis } from "ioredis";

interface SaveProp {
  data: ISingleMovieResponse;
  revenueData: ISingleMovieRevenueBudgetResponse;
  castData: ISingleMovieCastResponse;
}

const redis = new Redis(String(process.env.REDIS_URI));

export const saveCacheSingleMovie = async (id: string, result: SaveProp) => {
  redis.setex(`movie:${id}`, 60 * 60 * 24 * 30, JSON.stringify(result));
};

export const getCacheSingleMovie = async (id: string) => {
  const foundResult = await redis.get(`movie:${id}`);
  const parsedResult: SaveProp = foundResult ? JSON.parse(foundResult) : null;
  return parsedResult;
};

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

  const parsedResult: IMoviesResponse = foundResult
    ? JSON.parse(foundResult)
    : null;

  return parsedResult;
};
