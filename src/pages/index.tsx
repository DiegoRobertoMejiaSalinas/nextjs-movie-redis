import { MoviesList, NavbarComponent } from "@/components";
import { IFilterMovie } from "@/interfaces/FilterMovies.interface";
import { IMoviesResponse, Result } from "@/interfaces/MoviesResponse.interface";
import { getMovies } from "@/lib/getMovies";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home({
  results,
  nextPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [movies, setMovies] = useState<Result[]>([...results]);
  const [filters, setFilters] = useState<IFilterMovie>({
    page: 1,
  });
  const [hasNextPage, setHasNextPage] = useState(!!nextPage);

  const handleSearch = (value: string) => {
    router.push(`/search?title=${value}`, undefined, {
      shallow: true,
    });
  };

  const handleLoadOneMorePage = async () => {
    const tempFilters = { ...filters };
    tempFilters.page = Number(tempFilters.page) + 1;

    const queryParams = new URLSearchParams({ ...(tempFilters as any) });

    const response = await fetch(`/api/movies?${queryParams}`);
    const newMovies: IMoviesResponse = await response.json();

    setMovies((originalMovies) => [...originalMovies, ...newMovies.results]);
    setHasNextPage(!!newMovies.next);

    setFilters((oldFilters) => ({
      ...oldFilters,
      page: Number(oldFilters.page) + 1,
    }));
  };

  return (
    <>
      {/* Navbar */}
      <NavbarComponent onHandleSearch={handleSearch} />

      {/* Movie List */}
      <MoviesList
        hasNext={hasNextPage}
        results={movies}
        loadMore={handleLoadOneMorePage}
      />
    </>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const response = await getMovies({});

  return {
    props: {
      results: response.results,
      nextPage: response.next,
    },
  };
};
