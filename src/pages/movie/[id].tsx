import { MovieInfo, NavbarComponent, SearchEngineHead } from "@/components";
import { ISeoProps } from "@/interfaces/seoProps";
import { getMovieById } from "@/lib/getMovieById";
import { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

const IMAGE_UNAVAILABLE =
  "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";

export default function MoviePage({
  result: { castData, data, revenueData },
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const seo: ISeoProps = {
    canonicalUrl: `https://next-movies-searcher.hedgehog-testing.xyz/movie/${router.query.id}`,
    description: `Movie found: ${data?.results.titleText.text}`,
    ogImgUrl: `${data?.results?.primaryImage?.url || IMAGE_UNAVAILABLE}`,
    ogTitle: `Movie Searcher by Diego - Movie: ${data?.results?.titleText?.text}`,
    ogType: "website",
    title: `Movie Searcher by Diego - Movie: ${data?.results?.titleText?.text}`,
  };

  const handleSearch = (value: string) => {
    router.push(`/search?title=${value}`, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <SearchEngineHead {...seo} />
      <NavbarComponent onHandleSearch={handleSearch} />

      <div className="px-3 py-3 sm:px-10 w-full">
        <MovieInfo
          data={data.results}
          castData={castData.results}
          revenueData={revenueData.results}
        />
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const id = ctx.params.id;

  const result = await getMovieById(id);

  return {
    props: { result },
  };
};
