import { API_URL, RAPID_API_HOST, RAPID_API_KEY } from "@/constants/global";
import { getCacheMovies, saveCacheMovies } from "./redis";
import { IMoviesResponse } from "@/interfaces/MoviesResponse.interface";

interface QueryProps {
  page: number;
  year?: number;
  title: string;
}

const getApiUrlCall = (query: QueryProps) => {
  const urlQueryParams = new URLSearchParams({
    titleType: "movie",
    limit: "20",
    exact: "false",
  });

  for (let [key, value] of Object.entries(query)) {
    if (value) {
      urlQueryParams.append(key, value);
    }
  }

  if (!urlQueryParams.get("page")) {
    urlQueryParams.append("page", "1");
  }

  urlQueryParams.delete("title");

  return `${API_URL}/titles/search/title/${query.title}?${urlQueryParams}`;
};

export const getSearchMovies = async (query: QueryProps) => {
  console.time();
  console.log(getApiUrlCall(query));

  const foundResult: IMoviesResponse = await getCacheMovies(query);
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
