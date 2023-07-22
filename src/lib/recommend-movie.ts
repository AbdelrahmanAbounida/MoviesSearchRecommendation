import { getUserMovies } from "@/firebase_ops/app"
import { Configuration, OpenAIApi } from "openai";
import { searchMoviesByTitle } from "./search-movie";
import { MoviePorps, SearchResult } from "./types";


export const getRecommendMovies = async(userId:string)=>{
    // get all searched movies by user
    const data = await getUserMovies(userId)
    const searchedMovies = data?.SearchedMovies
    const recommendedMovies = data?.recommendedMovies

    const today = new Date().toISOString().slice(0, 10);
    const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const BASE_PROMPT = `You are a Movie Recommendation bot whose job is to recommend user movies 
                        according to their search history and date. and make sure that the recommended
                        movies should exist in OMDb API  database. List me 10 movies according to this user search history and date.

                        Search Movies History:
                        ${searchedMovies}
                        
                        Date:
                        ${today}

                        the output should be as a list of 10 movies seperated by comma without 
                         any additional information, numbers, I need just a list of words like:
                        [superman, spiderman,]
                        
                        `
    try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: BASE_PROMPT,
          temperature:0.5,
          max_tokens: 1500
        });
        const recommendedMoviesTitles =  completion.data.choices[0].text?.split(',')
        

        if(recommendedMoviesTitles){
          const recommendedMovies = []
          for(let i=0;i<recommendedMoviesTitles.length;i++){

              let recommendedMovieTitle = recommendedMoviesTitles[i].trim()
              const dotIndex = recommendedMovieTitle.indexOf('.')
              if(dotIndex !== -1){
                recommendedMovieTitle = recommendedMovieTitle.slice(dotIndex+1)
              }

              const res:SearchResult = await searchMoviesByTitle(recommendedMovieTitle,1)
              const moviesData:MoviePorps[] = res.Search
              if(moviesData){
                recommendedMovies.push(moviesData[0])
              }
          }

          return recommendedMovies
        }

      } catch (error) {
          return []
      }

}
