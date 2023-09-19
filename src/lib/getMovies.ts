import { API_URL, RAPID_API_HOST, RAPID_API_KEY } from "@/constants/global";
import { IMoviesResponse } from "@/interfaces/MoviesResponse.interface";
import { getCacheMovies, saveCacheMovies } from "./redis";
import { IFilterMovie } from "@/interfaces/FilterMovies.interface";

const getApiUrlCall = ({ page }: IFilterMovie) => {
  const urlQueryParams = new URLSearchParams({
    year: String(new Date().getFullYear()),
    limit: "20",
    titleType: "movie",
    page: page ? String(page) : "1",
  });

  return `${API_URL}/titles?${urlQueryParams}`;
};

export const getMovies = async (query: IFilterMovie) => {
  console.time();
  console.log(getApiUrlCall(query));

  const foundResult = await getCacheMovies(query);
  if (foundResult) {
    console.timeEnd();

    return foundResult;
  }

  const response = await fetch(getApiUrlCall(query), {
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY!,
      "X-RapidAPI-Host": RAPID_API_HOST!,
    },
  });
  console.timeEnd();

  const data: IMoviesResponse = await response.json();
  saveCacheMovies(query, data);

  return data;
};
