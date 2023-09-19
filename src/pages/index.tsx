import { MoviesList, NavbarComponent, SearchEngineHead } from "@/components";
import { IFilterMovie } from "@/interfaces/FilterMovies.interface";
import { IMoviesResponse, Result } from "@/interfaces/MoviesResponse.interface";
import { ISeoProps } from "@/interfaces/seoProps";
import { getMovies } from "@/lib/getMovies";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const seo: ISeoProps = {
  canonicalUrl: "https://next-movies-searcher.hedgehog-testing.xyz/",
  description:
    "A testing movie searcher and catalogue made by Diego with NextJs, Redis and MoviesDatabase",
  ogImgUrl:
    "https://res.cloudinary.com/purplesoda/image/upload/v1695146357/Test%20Images/samuel-regan-asante-wMkaMXTJjlQ-unsplash_1_uglivj.webp",
  ogTitle: "Movie Searcher by Diego",
  ogType: "website",
  title: "Movie Searcher by Diego",
};

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
      <SearchEngineHead {...seo} />

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
