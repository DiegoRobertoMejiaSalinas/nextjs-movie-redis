import { API_URL, RAPID_API_HOST, RAPID_API_KEY } from "@/constants/global";
import { IMoviesResponse } from "@/interfaces/MoviesResponse.interface";
import { getCacheMovies, saveCacheMovies } from "./redis";

interface QueryProps {
  page: number;
  year?: number;
  title?: string;
}

const getApiUrlCall = ({ page, year, title }: QueryProps) => {
  const query = new URLSearchParams({
    page: String(page),
    year: String(year),
    limit: "20",
  });

  if (title) query.append("title", title);

  return `${API_URL}/titles?${query}`;
};
export const getMovies = async (query: QueryProps) => {
  console.time();

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
