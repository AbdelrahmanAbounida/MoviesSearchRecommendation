// import { MoviePorps, SearchResult } from "@/lib/types";


// export async function POST(request: Request) {

//   console.log("Getting api request")

//     const body = await request.json();
//     const page = body.page;
//     const search_key = body.search_key;

//     console.log(page,search_key)
//     try{
//         const API_KEY = 'e1a03dda'
//         const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search_key}&page=${page}`;
//         const response = await fetch(API_URL);
//         const data:SearchResult = await response.json(); 

//         console.log(data)
//         return new Response(JSON.stringify({ data }), {
//           status: 200,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//     }
//     catch(error){
//         return new Response(JSON.stringify({ error }), {
//             status: 500,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });
//     }


// }