import { Result } from "@/interfaces/MoviesResponse.interface";
import { Loader, MovieCard } from "..";
import InfiniteScroll from "react-infinite-scroller";

interface Props {
  results: Result[];
  hasNext: boolean;
  loadMore: () => void;
}

const NoMoreResults = () => {
  return (
    <div className="bg-dark-100 mt-[4rem] border border-gray-500 text-center text-gray-100 px-4 py-6 rounded relative">
      <strong>It seems there&apos; no more movies! 😭😭😭</strong>
    </div>
  );
};

export const MoviesList = ({ results, loadMore, hasNext }: Props) => {
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
      <div
      // className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasNext}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initialLoad={false}
          loader={
            <div className="loader w-full" key={0}>
              <Loader />
            </div>
          }
          // useWindow={false}
          // getScrollParent={() => this.scrollParentRef}
        >
          <div className="flex flex-col gap-8">
            {firstGrid.map((movieItem) => (
              <MovieCard movieItem={movieItem} key={movieItem._id} />
            ))}
          </div>
          <div className="flex flex-col gap-8">
            {secondGrid.map((movieItem) => (
              <MovieCard movieItem={movieItem} key={movieItem._id} />
            ))}
          </div>
          <div className="flex flex-col gap-8">
            {thirdGrid.map((movieItem) => (
              <MovieCard movieItem={movieItem} key={movieItem._id} />
            ))}
          </div>
          <div className="flex flex-col gap-8">
            {fourthGrid.map((movieItem) => (
              <MovieCard movieItem={movieItem} key={movieItem._id} />
            ))}
          </div>
        </InfiniteScroll>

        {!hasNext && <NoMoreResults />}
      </div>
    </div>
  );
};
