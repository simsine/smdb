type SearchObject = {
    Poster:string;
    Title:String;
    Type:String;
    Year:string;
    imdbID:string;
}

export async function fetchMoviesByTitle(searchTitle:string|null){
    const response = await fetch(`http://www.omdbapi.com/?apikey=9d1c5f5c&s=${searchTitle}`);
    const json = response.json()
    return json
}