import { API_URL, RAPID_API_HOST, RAPID_API_KEY } from "@/constants/global";
import { IMoviesResponse } from "@/interfaces/MoviesResponse.interface";

interface QueryProps {
  page: number;
  year: number;
  title: string;
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
  const response = await fetch(getApiUrlCall(query), {
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY!,
      "X-RapidAPI-Host": RAPID_API_HOST!,
    },
  });

  const data: IMoviesResponse = await response.json();

  return data;
};
