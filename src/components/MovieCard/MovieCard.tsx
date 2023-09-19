import { Result } from "@/interfaces/MoviesResponse.interface";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const IMAGE_UNAVAILABLE =
  "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";

export const MovieCard = ({ movieItem }: { movieItem: Result }) => {
  const aspectRatio = movieItem?.primaryImage
    ? movieItem?.primaryImage?.width! / movieItem?.primaryImage?.height!
    : 1;

  return (
    <Link href={`/movie/${movieItem.id}`}>
      <Card className="pt-2">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start mb-5">
          <small className="text-default-500">
            {movieItem?.releaseYear?.year}
          </small>
          <h4 className="font-bold text-large">{movieItem?.titleText?.text}</h4>
        </CardHeader>
        <CardBody
          className="overflow-visible px-2 mx-auto pt-4 pb-0"
          style={{
            width: "100%",
            aspectRatio,
          }}
        >
          <Image
            alt={movieItem?.titleText?.text}
            className="object-cover h-auto max-w-full rounded-lg"
            src={movieItem?.primaryImage?.url || IMAGE_UNAVAILABLE}
            fill
            sizes="(max-width: 576px) 100vw, (max-width: 768px) 80vw, (max-width: 992px) 70vw, 60vw"
          />
        </CardBody>
      </Card>
    </Link>
  );
};
