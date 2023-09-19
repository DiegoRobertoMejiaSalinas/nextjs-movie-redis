import { MoviesList, NavbarComponent } from "@/components";
import { IFilterMovie } from "@/interfaces/FilterMovies.interface";
import { IMoviesResponse, Result } from "@/interfaces/MoviesResponse.interface";
import { getSearchMovies } from "@/lib/searchMovies";
import { InferGetServerSidePropsType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage({
  results,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [movies, setMovies] = useState<Result[]>([...results]);
  const router = useRouter();
  const [filters, setFilters] = useState<IFilterMovie>({
    page: 1,
  });

  useEffect(() => {
    for (let [key, value] of Object.entries(router.query)) {
      setFilters((oldFilters) => ({ ...oldFilters, [key]: value }));
    }
  }, [router.query]);

  const handleNewSearch = async (value: string) => {
    const tempFilters = {
      page: 1,
      title: value,
    };

    router.replace(`/search?title=${value}`);

    const queryParams = new URLSearchParams({ ...(tempFilters as any) });

    const response = await fetch(`/api/search-movies?${queryParams}`);
    const newMovies: IMoviesResponse = await response.json();

    setMovies([...newMovies.results]);

    setFilters({
      ...tempFilters,
    });
  };

  const handleLoadOneMorePage = async () => {
    if (!filters.title?.trim().length) return;

    const tempFilters = { ...filters };
    tempFilters.page = Number(tempFilters.page) + 1;

    const queryParams = new URLSearchParams({ ...(tempFilters as any) });

    const response = await fetch(`/api/search-movies?${queryParams}`);
    const newMovies: IMoviesResponse = await response.json();

    setMovies((originalMovies) => [...originalMovies, ...newMovies.results]);

    setFilters((oldFilters) => ({
      ...oldFilters,
      page: Number(oldFilters.page) + 1,
    }));
  };

  return (
    <>
      <NavbarComponent onHandleSearch={handleNewSearch} />
      <MoviesList results={movies} loadMore={handleLoadOneMorePage} />
    </>
  );
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const query: any = {
    page: 1,
  };

  for (let [key, value] of Object.entries(ctx.query)) {
    if (value) query[key] = value;
  }

  const response = await getSearchMovies(query);

  return {
    props: {
      results: response.results,
    },
  };
};
