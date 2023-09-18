import { MoviesList, NavbarComponent } from "@/components";
import { Result } from "@/interfaces/MoviesResponse.interface";
import { getMovies } from "@/lib/getMovies";
import { useState } from "react";

interface Props {
  results: Result[];
}

export default function Home({ results }: Props) {
  const [movies, setMovies] = useState<Result[]>([...results]);

  return (
    <>
      {/* Navbar */}
      <NavbarComponent />

      {/* Movie List */}
      <MoviesList results={movies} />

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
