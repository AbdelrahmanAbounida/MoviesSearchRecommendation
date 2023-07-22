import { MoviePorps, SearchResult } from "./types";


export const searchMoviesByTitle = async (search_key:string,page:number):Promise<SearchResult> =>{
    const API_KEY = process.env.NEXT_PUBLIC_OMDb_API_KEY
    const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search_key}&page=${page}`;
    const response = await fetch(API_URL);
    const data = await response.json(); 
    return data;
}


export const searchMoviesById = async (id:string):Promise<MoviePorps> =>{
    const API_KEY = process.env.NEXT_PUBLIC_OMDb_API_KEY
    const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`;
    const response = await fetch(API_URL);
    const data = await response.json(); 
    return data;
}