import { useQuery } from "@tanstack/react-query";
import { tmdbOptions, TMDBResponse } from "../../@types/tmdb";
import RootLoading from "../components/loading";
import { useEffect, useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import MovieSlideItem from "./MovieSlideItem";

const MovieSlide = ({ mid }: { mid: string }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["movies", mid, "slides"],
    queryFn: async (): Promise<TMDBResponse> => {
      console.log(mid);
      const url = `https://api.themoviedb.org/3/movie/${Number(
        mid
      )}/similar?language=en-US&page=1`;
      const res = await fetch(url, tmdbOptions());
      const data = (await res.json()) as TMDBResponse;
      console.log(data);
      return data;
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  const options: Settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const slideRef = useRef<Slider>(null);
  if (isPending) {
    return <RootLoading />;
  }
  if (error || !data) {
    return <h1>Error {error.message}</h1>;
  }

  return data.results.length === 0 ? null : (
    <div>
      <div className="relative">
        <button
          onClick={() => slideRef.current?.slickPrev()}
          className="absolute top-[50%] left-0 bg-white border z-10 translate-y-[-50%] cursor-pointer p-1.5 rounded border-gray-200"
        >
          <IoChevronBack />
        </button>
        <button
          onClick={() => slideRef.current?.slickNext()}
          className="absolute top-[50%] right-0 bg-white border z-10 translate-y-[-50%] cursor-pointer p-1.5 rounded border-gray-200"
        >
          <IoChevronForward />
        </button>
        <Slider {...options} className="overflow-hidden m-2.5" ref={slideRef}>
          {data.results.map((movie) => (
            <MovieSlideItem key={movie.id} {...movie} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieSlide;
