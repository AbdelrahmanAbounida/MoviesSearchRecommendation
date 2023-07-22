import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Recommend.module.css'
import { useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { getUserMovies, setUserSearchMovies, updateUserRecommendedMovies } from '@/firebase_ops/app'
import { searchMoviesByTitle } from '@/lib/search-movie'
import { getRecommendMovies } from '@/lib/recommend-movie'
import MovieCard from '@/components/MovieCard'
import { useSearchProps } from '@/context/SearchContext'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export default function Recommend() {

    const {currentUser} = useAuth()
    const {date,setdate,recommendedmovies, setrecommendedmovies} = useSearchProps()
    const router = useRouter()


    if(!currentUser){
      router.push("/auth/login")
    }
    const getRecommendedMovies = async ()=>{

      const searchedMovies = await getUserMovies(currentUser?.uid);
      const oldDate = searchedMovies?.date
      let oldRecommendedMovies = searchedMovies?.RecommendedMovies
      const today = new Date().toISOString().slice(0, 10);
      
      // 
      if(today === oldDate){
        if(!oldRecommendedMovies){
          const res = await searchMoviesByTitle("popular",1)
          oldRecommendedMovies = res.Search
          updateUserRecommendedMovies(currentUser.uid,oldRecommendedMovies,oldRecommendedMovies);
        }
        setrecommendedmovies(oldRecommendedMovies)
        return
      }

      // 
        try{
          let newrecommendedMovies = await getRecommendMovies(currentUser.uid)

          if(!newrecommendedMovies){
            const res = await searchMoviesByTitle("popular",1)
            newrecommendedMovies = res.Search
            setrecommendedmovies(newrecommendedMovies?newrecommendedMovies:oldRecommendedMovies)
          }
          else{
            setrecommendedmovies(newrecommendedMovies?newrecommendedMovies:oldRecommendedMovies)
          }
          updateUserRecommendedMovies(currentUser.uid,oldRecommendedMovies,newrecommendedMovies);
          setdate(today)
        }
        catch(error){
          const res = await searchMoviesByTitle("popular",1)
          oldRecommendedMovies = res.Search
          updateUserRecommendedMovies(currentUser.uid,oldRecommendedMovies,oldRecommendedMovies);
          setdate(today)
        }

    }

  useEffect(()=>{
    if(!currentUser){
        router.push("/auth/login")
      }
    
  },[currentUser])

  useEffect(()=>{
    getRecommendedMovies()
  },[])


  return (
    <>
      <Head>
        <title>OMDB Browser - Recommendations</title>
        <meta name="description" content="Get movie recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.main} ${inter.className}`}>
          {recommendedmovies?.length  ? (
              <div className=''>
                <div className="grid 2xl:grid-cols-5  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {recommendedmovies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} width={310} height={460}/>
                    ))}
                </div>
                    
                </div>
                
            ):<>No Recommended Movies Yet</>}
      </div>
    </>
  )
}


// export async function getStaticProps({params}:any){

//   const res = await searchMoviesByTitle("popular",1)

//   return {
//     props: {
//       movies: res?.Search
//     },
//     revalidate: 60*60*24
//   }
// }

// export async function getStaticPaths(){
//   const res = await searchMoviesByTitle("popular",1)
//   const movies = res.Search
//   const paths = movies.map((movie)=>({
//     params: {id:movie.imdbID}
//   }))

//   return {paths,fallback:'blocking'}
// }