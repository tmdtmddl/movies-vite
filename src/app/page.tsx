import { useInfiniteQuery } from "@tanstack/react-query";
import { tmdbOptions, TMDBResponse } from "../@types/tmdb";
import RootLoading from "./components/loading";
import { useEffect } from "react";
import MovieItem from "./MovieItem";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const {
    data,
    status,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }): Promise<TMDBResponse> => {
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageParam}&sort_by=popularity.desc`;
      const res = await fetch(url, tmdbOptions());
      const data = (await res.json()) as TMDBResponse;
      return data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

  const { ref, inView } = useInView({ threshold: 0.25 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("load more movies");
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return status === "pending" ? (
    <RootLoading />
  ) : status === "error" ? (
    <h1>Error {error.message}</h1>
  ) : (
    data && (
      <div>
        {data.pages.map((page: TMDBResponse, index) => {
          return (
            <ul key={index} className="grid grid-cols-2 gap-5 px-5">
              {page.results.map((movie) => (
                <li key={movie.id}>
                  <MovieItem {...movie} />
                </li>
              ))}
            </ul>
          );
        })}
        {isFetchingNextPage && <div className="p-10">loading more...</div>}
        <div ref={ref} className="border p-5">
          Read More
        </div>
      </div>
    )
  );
};

export default Home;
