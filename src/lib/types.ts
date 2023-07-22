export interface Rating {
    Source:string;
    Value:string;
  }
  
  export interface MoviePorps{
    imdbID?:string;
    Title: string; // Movie Title
    Released?:string;
    RunTime?:string;
    Genre?:string;
    Director?:string;
    Writer?:string;
    Actors?:string;
    Language?:string;
    Country?:string;
    Awards?:string;
    Poster:string;
    Ratings?:Rating[];
    Type?: string; // movie , series, episode
  }


  export interface SearchResult{
    Response: string;
    Search: MoviePorps[];
    totalResults:number;
  }

