import React, { useEffect } from 'react';
import { MoviePorps, Rating } from '@/lib/types';
import { searchMoviesById } from '@/lib/search-movie';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const MovieDetail = ({movie}:any) => {
    console.log(movie)
    const {currenUser} = useAuth()
  const router = useRouter()
  
  useEffect(()=>{
    if(!currenUser){
      router.push("/auth/login")
    }
  },[currenUser])
  
  return (
    <div className='mx-auto w-3/4'>
      <h1 className='font-bold text-center text-3xl mt-5 text-teal-800 mb-4'>{movie.Title}</h1>
      <img className='w-full lg:w-1/2 lg:text-center lg:mx-auto xl:w-1/3 h-96' src={movie.Poster} alt={movie.Title} />
      <p className='mt-3'><span className='font-bold'>Released:</span> {movie.Released}</p>
      <p className=''><span className='font-bold'>Runtime:</span> {movie.RunTime}</p>
      <p className=''><span className='font-bold'>Genre:</span> {movie.Genre}</p>
      <p className=''><span className='font-bold'>Director:</span> {movie.Director}</p>
      <p className=''><span className='font-bold'>Writer:</span> {movie.Writer}</p>
      <p className=''><span className='font-bold'>Actors:</span> {movie.Actors}</p>
      <p className=''><span className='font-bold'>Language:</span> {movie.Language}</p>
      <p className=''><span className='font-bold'>Country:</span> {movie.Country}</p>
      <p className=''><span className='font-bold'>Awards:</span> {movie.Awards}</p>
      <p className=''><span className='font-bold'>Type:</span> {movie.Type}</p>

      {movie.Ratings && (
        <div>
          <h3 className='text-teal-600 font-semibold mt-1'>Ratings:</h3>
          <ul>
            {movie.Ratings.map((rating:Rating) => (
              <li key={rating.Source}>
                <span className='font-bold'>{rating.Source}</span>: {rating.Value}
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
};

export default MovieDetail;

export async function getServerSideProps({ params }:any) {

  const { movieId } = params;
  try {
    const response = await searchMoviesById(movieId)

    console.log(response)
    const movie = response;
    return {
      props: {
        movie,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}