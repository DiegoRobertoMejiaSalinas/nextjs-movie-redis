import { API_URL, RAPID_API_HOST, RAPID_API_KEY } from "@/constants/global";
import { ISingleMovieResponse } from "@/interfaces/SingleMovieResponse.interface";
import { getCacheSingleMovie, saveCacheSingleMovie } from "./redis";
import { ISingleMovieCastResponse } from "@/interfaces/SingleMovieCastResponse.interface";
import { ISingleMovieRevenueBudgetResponse } from "@/interfaces/SingleMovieRevenueBudget.interface";

const getApiUrlCall = (id: string) => {
  return `${API_URL}/titles/${id}`;
};

export const getMovieById = async (id: string) => {
  console.time();
  console.log(getApiUrlCall(id));

  const foundResult = await getCacheSingleMovie(id);
  if (foundResult) {
    console.timeEnd();

    return foundResult;
  }

  const response = await fetch(getApiUrlCall(id), {
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY!,
      "X-RapidAPI-Host": RAPID_API_HOST!,
    },
  });

  const responseCast = await fetch(`${getApiUrlCall(id)}?info=extendedCast`, {
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY!,
      "X-RapidAPI-Host": RAPID_API_HOST!,
    },
  });

  const responseRevenueBudget = await fetch(
    `${getApiUrlCall(id)}?info=revenue_budget`,
    {
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY!,
        "X-RapidAPI-Host": RAPID_API_HOST!,
      },
    }
  );

  console.timeEnd();

  const data: ISingleMovieResponse = await response.json();
  const revenueData: ISingleMovieRevenueBudgetResponse =
    await responseRevenueBudget.json();
  const castData: ISingleMovieCastResponse = await responseCast.json();
  saveCacheSingleMovie(id, { data, revenueData, castData });

  return  { data, revenueData, castData };
};
