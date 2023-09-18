import { Result } from "@/interfaces/MoviesResponse.interface";
import { MovieCard } from "..";

interface Props {
  results: Result[];
}

export const MoviesList = ({ results }: Props) => {
  if (!results?.length) return <></>;

  const firstGrid = [];
  const secondGrid = [];
  const thirdGrid = [];
  const fourthGrid = [];

  for (let i = 0; i <= results.length - 1; i++) {
    if (i % 4 == 0) {
      firstGrid.push(results[i]);
    } else if (i % 4 == 1) {
      secondGrid.push(results[i]);
    } else if (i % 4 == 2) {
      thirdGrid.push(results[i]);
    } else if (i % 4 == 3) {
      fourthGrid.push(results[i]);
    }
  }

  return (
    <div className="list_movies px-8 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-8">
          {firstGrid.map((movieItem) => (
            <MovieCard movieItem={movieItem} key={movieItem.id} />
          ))}
        </div>
        <div className="flex flex-col gap-8">
          {secondGrid.map((movieItem) => (
            <MovieCard movieItem={movieItem} key={movieItem.id} />
          ))}
        </div>
        <div className="flex flex-col gap-8">
          {thirdGrid.map((movieItem) => (
            <MovieCard movieItem={movieItem} key={movieItem.id} />
          ))}
        </div>
        <div className="flex flex-col gap-8">
          {fourthGrid.map((movieItem) => (
            <MovieCard movieItem={movieItem} key={movieItem.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
