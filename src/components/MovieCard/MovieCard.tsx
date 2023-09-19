import { Result } from "@/interfaces/MoviesResponse.interface";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Variants, motion, useInView } from "framer-motion";
import { useRef } from "react";

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween",
      staggerChildren: 0.2,
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
};

const MotionCardBodyComponent = motion(CardBody);

const IMAGE_UNAVAILABLE =
  "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";

export const MovieCard = ({ movieItem }: { movieItem: Result }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const aspectRatio = movieItem?.primaryImage
    ? movieItem?.primaryImage?.width! / movieItem?.primaryImage?.height!
    : 1;

  return (
    <motion.div
      ref={ref}
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      <Link href={`/movie/${movieItem.id}`}>
        <Card className="pt-2">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start mb-5">
            <motion.small variants={titleVariants} className="text-default-500">
              {movieItem?.releaseYear?.year}
            </motion.small>
            <motion.h4
              variants={titleVariants}
              className="font-bold text-large"
            >
              {movieItem?.titleText?.text}
            </motion.h4>
          </CardHeader>
          <MotionCardBodyComponent
            variants={imageVariants}
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
          </MotionCardBodyComponent>
        </Card>
      </Link>
    </motion.div>
  );
};
