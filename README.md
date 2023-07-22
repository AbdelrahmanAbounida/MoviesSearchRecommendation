# Movie Search Recommendation App
This is an openai powered app which uses openai to recommend user what to watch everyday 

## Installation
```bash
git clone git@github.com:AbdelrahmanAbounida/MoviesSearchRecommendation.git
cd MoviesSearchRecommendation
npm i 
```

## env

if u don't wanna test firebase authentication or openai just create a .env file only with 
```bash
NEXT_PUBLIC_OMDb_API_KEY = YOUR_OMDB_API_KEY
```
and make sure to remove Auth Provider from _layout.tsx

but if u wanna test the whole app create a .env file with all existing fields in .env.template
(create a new firebase app and get its keys and also add your openai api ky)
```bash

NEXT_PUBLIC_API_KEY =  
NEXT_PUBLIC_AUTH_DOMAIN =  
NEXT_PUBLIC_PROJECT_ID =  
NEXT_PUBLIC_STORAGE_BUCKET = 
NEXT_PUBLIC_MESSAGING_SENDER_ID = 
NEXT_PUBLIC_APP_ID =  
NEXT_PUBLIC_MEASUREMENT_ID = 

NEXT_PUBLIC_OMDb_API_KEY = 
NEXT_PUBLIC_OPENAI_API_KEY =
```

## Getting Started

First, run the development server:

```bash
npm run dev
```
