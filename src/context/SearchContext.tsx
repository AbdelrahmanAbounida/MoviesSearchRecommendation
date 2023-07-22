'use client';

import { MoviePorps } from "@/lib/types";
import { createContext, useContext, useState } from "react";


const defaultMovie = {Poster:"",
Title:"",
imdbID:"",
Actors:"",
Type:"",
Awards:"",
Country:"",
Director:"",
Genre:"",
Language:"",
Ratings:[],
Released:"",
RunTime:"",
Writer:""}

export interface SearchContextInterface {
    searchKey: string;
    setsearchKey: (item:string)=>{};
    movies: MoviePorps[];
    setmovies: (movies:MoviePorps[])=>{};
    date:string;
    setdate:(item:string)=>{};
    recommendedmovies:MoviePorps,
    setrecommendedmovies:(item:MoviePorps)=>{}
}

export const SearchContext = createContext({
    searchKey: '',
    setsearchKey: (item:string)=>{},
    movies: [defaultMovie],
    setmovies: (item: MoviePorps[])=>{},
    date:"",
    setdate:(item:string)=>{},
    recommendedmovies:[defaultMovie],
    setrecommendedmovies:(item:MoviePorps[])=>{}
})


export function useSearchProps() {
    return useContext(SearchContext)
}

export function SearchContextProvider({children}:any){
    const [searchKey, setsearchKey] = useState<string>('')
    const [movies, setmovies] = useState<any[]>([])
    const [date, setdate] = useState("")
    const [recommendedmovies, setrecommendedmovies] = useState<any[]>([])

      return (
        <SearchContext.Provider
          value={{
            searchKey,
            setsearchKey,
            movies,
            setmovies,
            date,
            setdate,
            recommendedmovies,
            setrecommendedmovies
          }}>
          {children}
        </SearchContext.Provider>
      )
    }