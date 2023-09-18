import { SearchIcon } from "@/components";
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
  Image,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
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
      <div className="list_movies grid gap-4 grid-cols-6 px-20 py-10">
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <small className="text-default-500">2023</small>
            <h4 className="font-bold text-large">The Flash</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://m.media-amazon.com/images/M/MV5BODBiZWIzZjUtMDFkMC00NWVhLWE5ZTktOWZjY2M1Zjc1NzY2XkEyXkFqcGdeQXVyNjE2MDMxNTg@._V1_.jpg"
              width={270}
            />
          </CardBody>
        </Card>

        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <small className="text-default-500">2023</small>
            <h4 className="font-bold text-large">The Flash</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://m.media-amazon.com/images/M/MV5BODBiZWIzZjUtMDFkMC00NWVhLWE5ZTktOWZjY2M1Zjc1NzY2XkEyXkFqcGdeQXVyNjE2MDMxNTg@._V1_.jpg"
              width={270}
            />
          </CardBody>
        </Card>

        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <small className="text-default-500">2023</small>
            <h4 className="font-bold text-large">The Flash</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://m.media-amazon.com/images/M/MV5BODBiZWIzZjUtMDFkMC00NWVhLWE5ZTktOWZjY2M1Zjc1NzY2XkEyXkFqcGdeQXVyNjE2MDMxNTg@._V1_.jpg"
              width={270}
            />
          </CardBody>
        </Card>

        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <small className="text-default-500">2023</small>
            <h4 className="font-bold text-large">The Flash</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://m.media-amazon.com/images/M/MV5BODBiZWIzZjUtMDFkMC00NWVhLWE5ZTktOWZjY2M1Zjc1NzY2XkEyXkFqcGdeQXVyNjE2MDMxNTg@._V1_.jpg"
              width={270}
            />
          </CardBody>
        </Card>

        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <small className="text-default-500">2023</small>
            <h4 className="font-bold text-large">The Flash</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://m.media-amazon.com/images/M/MV5BODBiZWIzZjUtMDFkMC00NWVhLWE5ZTktOWZjY2M1Zjc1NzY2XkEyXkFqcGdeQXVyNjE2MDMxNTg@._V1_.jpg"
              width={270}
            />
          </CardBody>
        </Card>

        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <small className="text-default-500">2023</small>
            <h4 className="font-bold text-large">The Flash</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://m.media-amazon.com/images/M/MV5BODBiZWIzZjUtMDFkMC00NWVhLWE5ZTktOWZjY2M1Zjc1NzY2XkEyXkFqcGdeQXVyNjE2MDMxNTg@._V1_.jpg"
              width={270}
            />
          </CardBody>
        </Card>

        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <small className="text-default-500">2023</small>
            <h4 className="font-bold text-large">The Flash</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://m.media-amazon.com/images/M/MV5BODBiZWIzZjUtMDFkMC00NWVhLWE5ZTktOWZjY2M1Zjc1NzY2XkEyXkFqcGdeQXVyNjE2MDMxNTg@._V1_.jpg"
              width={270}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
