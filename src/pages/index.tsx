import { MoviesList, NavbarComponent } from "@/components";
import { Result } from "@/interfaces/MoviesResponse.interface";
import { getMovies } from "@/lib/getMovies";
import { useState } from "react";

interface Props {
  results: Result[];
}

interface IFilters {
  page: number;
  text?: string;
  year?: number;
}

export default function Home({ results }: Props) {
  const [movies, setMovies] = useState<Result[]>([...results]);
  const [filters, setFilters] = useState<IFilters>({
    page: 1,
    text: "",
    year: 2023,
  });
  const [hasNextPage, setHasNextPage] = useState(false);

  const handleLoadOneMorePage = async () => {
    const tempFilters = { ...filters };
    if (!tempFilters.text?.trim().length) {
      delete tempFilters["text"];
    }

    const newMovies = await getMovies({
      ...tempFilters,
      page: filters.page + 1,
    });

    console.log(newMovies);

    setMovies((originalMovies) => [...originalMovies, ...newMovies.results]);

    setFilters((oldFilters) => ({ ...oldFilters, page: oldFilters.page + 1 }));
  };

  return (
    <>
      {/* Navbar */}
      <NavbarComponent />

      {/* Movie List */}
      <MoviesList results={movies} loadMore={handleLoadOneMorePage} />

      {/* <div className="list_movies px-20 py-10">
        <MasonryMovies results={results} />
      </div> */}
    </>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const yearValue = () => {
    if (!ctx.query?.title) return 2023;

    return ctx.query.year;
  };

  const query: any = {
    page: ctx.query?.page || 1,
    year: yearValue(),
    title: ctx.query?.title || null,
  };

  const response = await getMovies(query);

  return {
    props: {
      results: response.results,
    },
  };
};
