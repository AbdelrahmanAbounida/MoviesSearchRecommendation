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


  export const MData = [
    {
        "Title": "Batman v Superman: Dawn of Justice",
        "Year": "2016",
        "imdbID": "tt2975590",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
        "Title": "Superman Returns",
        "Year": "2006",
        "imdbID": "tt0348150",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNDUzZGRhNzktYTZkMC00YWFiLTljMDEtMTk2OWJhYzAyYmY2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
    },
    {
        "Title": "Superman",
        "Year": "1978",
        "imdbID": "tt0078346",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMzA0YWMwMTUtMTVhNC00NjRkLWE2ZTgtOWEzNjJhYzNiMTlkXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
    },
    {
        "Title": "Superman II",
        "Year": "1980",
        "imdbID": "tt0081573",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BODk2NjgzNTEtYzZhZC00ZTBkLTllMGQtMmMxMzU1NDRkM2RlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
    },
    {
        "Title": "Superman III",
        "Year": "1983",
        "imdbID": "tt0086393",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMzI3ZDllMTctNmI2Mi00OGQ4LTk2ZTQtYTJhMjA5ZGI2YmRkXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
    },
    {
        "Title": "Batman v Superman: Dawn of Justice (Ultimate Edition)",
        "Year": "2016",
        "imdbID": "tt18689424",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOTRlNWQwM2ItNjkyZC00MGI3LThkYjktZmE5N2FlMzcyNTIyXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg"
    },
    {
        "Title": "Superman IV: The Quest for Peace",
        "Year": "1987",
        "imdbID": "tt0094074",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMmIwZWY1YTYtNDlhOS00NDRmLWI4MzItNjk2NDc1N2NhYzNlXkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_SX300.jpg"
    },
    {
        "Title": "Superman & Lois",
        "Year": "2021–",
        "imdbID": "tt11192306",
        "Type": "series",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOTA2MDVhMWItNTYwYi00OTcyLWJjZmEtNTQ2NTAxMDQyYTQwXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg"
    },
    {
        "Title": "Lois & Clark: The New Adventures of Superman",
        "Year": "1993–1997",
        "imdbID": "tt0106057",
        "Type": "series",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZTU1ZGFjNzEtZWYzZC00ZmI0LTg2NmMtN2YyNTY4YzhlODIyXkEyXkFqcGdeQXVyMjExMjk0ODk@._V1_SX300.jpg"
    },
    {
        "Title": "Superman/Batman: Apocalypse",
        "Year": "2010",
        "imdbID": "tt1673430",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjk3ODhmNjgtZjllOC00ZWZjLTkwYzQtNzc1Y2ZhMjY2ODE0XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    }
  ]
  