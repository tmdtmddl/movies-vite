import { Link } from "react-router-dom";
import { TMDBMovie } from "../../@types/tmdb";
import { useState } from "react";

const MovieSlideItem = (movie: TMDBMovie) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      className="mx-2.5 overflow-hidden rounded-xl relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        alt={movie.title}
        src={`${import.meta.env.VITE_TMDB_IMG_URL}${movie.poster_path}`}
        width={100}
        height={100}
        className="w-full"
      />
      {isHovering && (
        <Link
          to={`/${movie.id}`}
          className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs py-2.5 px-1"
        >
          <p>{movie.title}</p>
        </Link>
      )}
    </div>
  );
};

export default MovieSlideItem;
