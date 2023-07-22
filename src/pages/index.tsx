import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Search.module.css'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { MoviePorps, SearchResult } from '@/lib/types'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ToastAction } from '@radix-ui/react-toast'
import { toast } from '@/components/ui/use-toast'
import { searchMoviesByTitle } from '@/lib/search-movie'
import {  useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import MovieCard from '@/components/MovieCard'
import { useSearchProps } from '@/context/SearchContext'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { setUserSearchMovies, updateUserRecommendedMovies } from '@/firebase_ops/app'
import { getRecommendMovies } from '@/lib/recommend-movie'

const inter = Inter({ subsets: ['latin'] })


const SearchFormSchema = z.object({
  movieTitle: z.string().min(3, {
    message: "Movie Title shouldn't be less than 3 characters.",
  })
})


export default function Search() {

  const {currentUser} = useAuth()
  const router = useRouter()
  const [currentPage, setcurrentPage] = useState<number>(1)
  const [totalResult, settotalResult] = useState(0)
  const [loading, setloading] = useState(false)

  const {movies,setmovies,searchKey,setsearchKey,date,setdate} = useSearchProps()

  /* search Form handler */
  const form = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
  })

  /* This function fetches the movies according to the search key and the current page */
  const getMovies = async(movieTitle:any)=>{
    setloading(true)

    try{
      
      if(!searchKey && !movieTitle){
        setloading(false)
        return
      }

      const res:SearchResult = await searchMoviesByTitle(searchKey? searchKey: movieTitle,currentPage);
      const moviesData:MoviePorps[] = res.Search
      const totalResults:number = res.totalResults

      if(moviesData){
        setmovies(moviesData)
        settotalResult(totalResults)
      }
      setloading(false)
    } 
    catch(error){

      toast({
        variant: "destructive",
        title: "Failed to load movies",
        description: "There was a problem with your API Key.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })

      setloading(false)
      return
    }
  }
  const onSubmit = async(data: z.infer<typeof SearchFormSchema>) => {

    setsearchKey(data.movieTitle)
    setUserSearchMovies(currentUser.uid,data.movieTitle)
    
    getMovies(data.movieTitle)
  }
  
  /* Update Movies with new page selected */
  useEffect(()=>{
    getMovies(searchKey)
  },[currentPage])

  useEffect(()=>{
    if(!currentUser){
      router.push("/auth/login")
    }
  },[currentUser])

  return (
    <>
      <Head>
        <title>OMDB Browser - Search</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {/* update with search page code */}
        <div className='w-full mx-auto flex flex-col items-center justify-center'>
        
        <h1 className='text-center mx-auto mb-5 text-3xl font-bold'>Search For a Movie</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex sm:w-full w-1/2 max-w-lg  space-x-2">

          <FormField
            control={form.control}
            name="movieTitle"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input className="bg-transparent py-3 border-gray-400" placeholder='Search For Movie'  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
          )}
        />
            {/* <Input className='' type="text" placeholder="Movie Name" /> */}
            <Button type="submit" variant={'default'} className='bg-[#3c7d70] hover:bg-teal-700 px-10 text-md'>Search</Button>
          </form>
        </Form>

        {

      loading ? (<div> Loading.... </div>):
          
        movies?.length  ? (
          <div className=''>
            <div className="grid 2xl:grid-cols-5  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} width={310} height={460}/>
                ))}
            </div>

            <div className='mt-9'>

              <div className='flex justify-between  w-1/2 mx-auto'>
                  <Button disabled={currentPage === 1} onClick={() => setcurrentPage(currentPage - 1)}>Previous Page</Button>
                  <div>{currentPage}</div>
                  <Button disabled={currentPage * 10 > totalResult} onClick={() => setcurrentPage(currentPage + 1)}>Next Page</Button>
              </div>  

              </div>
                
            </div>
            
        ) : (
            <div className="empty">
                <h1 className='text-red-500 text-xl'>No movies found for searchKey: {searchKey}</h1>
            </div>
        )}
        </div>
      </main>
    </>
  )
}

