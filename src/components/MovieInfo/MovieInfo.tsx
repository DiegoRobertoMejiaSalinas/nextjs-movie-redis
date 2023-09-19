import Image from "next/image";
import styles from "./MovieInfo.module.css";
import { ISingleMovieResults } from "@/interfaces/SingleMovieResponse.interface";
import { ISingleMovieRevenueBudgetResults } from "@/interfaces/SingleMovieRevenueBudget.interface";
import { ISingleMovieCastResults } from "@/interfaces/SingleMovieCastResponse.interface";
import { ActorItem, RevenueList } from "..";
import { ActorsList } from "../ActorsList/ActorsList";

const IMAGE_UNAVAILABLE =
  "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";

interface Props {
  data: ISingleMovieResults;
  revenueData: ISingleMovieRevenueBudgetResults;
  castData: ISingleMovieCastResults;
}

export const MovieInfo = ({ data, castData, revenueData }: Props) => {
  const aspectRatio = data?.primaryImage
    ? data?.primaryImage?.width! / data?.primaryImage?.height!
    : 1;

  return (
    <div
      className={`bg-gray-700 w-full rounded-lg px-5 py-7 ${styles.container}`}
    >
      <div
        className={styles.image_container}
        style={{
          width: "100%",
          aspectRatio,
          position: "relative",
        }}
      >
        <Image
          fill
          alt={data.titleText.text}
          className="object-cover h-auto max-w-full rounded-lg"
          src={data?.primaryImage?.url || IMAGE_UNAVAILABLE}
        />
      </div>
      <div className={styles.info_container}>
        <h2 className={`mt-5 sm:mt-8 ${styles.title}`}>
          {data.titleText.text}
        </h2>
      </div>
      {/* <div className="my-3">
        <hr />
      </div> */}
      <div className={styles.revenue_container}>
        <RevenueList revenueData={revenueData} />
      </div>
      {/* <div className="my-3">
        <hr />
      </div> */}
      <div className={styles.actors_container}>
        <ActorsList actors={castData.cast.edges} />
      </div>
    </div>
  );
};
