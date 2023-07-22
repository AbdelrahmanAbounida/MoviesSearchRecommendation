import { MoviePorps, SearchResult } from "./types";


export const searchMoviesByTitle = async (search_key:string,page:number):Promise<SearchResult> =>{
    console.log("search_key",search_key)
    const API_KEY = 'e1a03dda'
    const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search_key}&page=${page}`;
    const response = await fetch(API_URL);
    const data = await response.json(); 
    return data;
}


export const searchMoviesById = async (id:string):Promise<MoviePorps> =>{
    const API_KEY = 'e1a03dda'
    const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`;
    const response = await fetch(API_URL);
    const data = await response.json(); 
    return data;
}