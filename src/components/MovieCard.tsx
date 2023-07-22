import { MoviePorps } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface MovieCardProps{
  movie: MoviePorps;
  width: number;
  height: number;
}

const MovieCard = ({movie,width,height}:MovieCardProps) =>{

  const router = useRouter()
    return(
        <div className="movie" key={movie.imdbID} onClick={()=>{router.push(`/${movie.imdbID}`)}}>

            <div><p>{movie.Released}</p></div>
            <div className={`w-[${width}]`}>
              <img width={width} height={height} alt={movie.Title} src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"} /></div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    )
}

export default MovieCard;