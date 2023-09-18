import { SearchIcon } from "@/components";
import { Result } from "@/interfaces/MoviesResponse.interface";
import { getMovies } from "@/lib/getMovies";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface Props {
  results: Result[];
}

const IMAGE_UNAVAILABLE =
  "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";

const CardMovieItem = ({ movieItem }: { movieItem: Result }) => {
  const aspectRatio = movieItem?.primaryImage
    ? movieItem?.primaryImage?.width! / movieItem?.primaryImage?.height!
    : 1;

  return (
    <Card className="pt-2" key={movieItem.id}>
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
        />
      </CardBody>
    </Card>
  );
};

const MasonryMovies = ({ results }: Props) => {
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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="flex flex-col gap-8">
        {firstGrid.map((movieItem) => (
          <CardMovieItem movieItem={movieItem} key={movieItem.id} />
        ))}
      </div>
      <div className="flex flex-col gap-8">
        {secondGrid.map((movieItem) => (
          <CardMovieItem movieItem={movieItem} key={movieItem.id} />
        ))}
      </div>
      <div className="flex flex-col gap-8">
        {thirdGrid.map((movieItem) => (
          <CardMovieItem movieItem={movieItem} key={movieItem.id} />
        ))}
      </div>
      <div className="flex flex-col gap-8">
        {fourthGrid.map((movieItem) => (
          <CardMovieItem movieItem={movieItem} key={movieItem.id} />
        ))}
      </div>
    </div>
  );
};

export default function Home({ results }: Props) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onInputHandle = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Navbar */}
      <Navbar shouldHideOnScroll isBordered>
        <NavbarBrand>
          <p className="font-bold text-inherit">Movie Search</p>
        </NavbarBrand>
        {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent> */}
        <NavbarContent justify="end">
          <form onSubmit={handleSubmit}>
            <Input
              ref={inputRef}
              onChange={onInputHandle}
              value={inputValue}
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Search a movie"
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
            />
          </form>
        </NavbarContent>
      </Navbar>

      {/* Movie List */}

      <div className="list_movies px-20 py-10">
        <MasonryMovies results={results} />
      </div>
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
