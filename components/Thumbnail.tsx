import Image from "next/image";

interface Props {
  movie: Movie; // | DocumentData
}

function Thumbnail({ movie }: Props) {
  return (
    <div className="relative h-28 min-w-45 cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-65 md:hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt="Movie poster"
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  );
}

export default Thumbnail;
