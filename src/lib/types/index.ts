interface MovieShort {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
interface MovieFull extends MovieShort{
    Response:string;
    Error?:string;

    Rated:string;
    Released:string;
    Runtime:string;
    Genre:string;
    Director:string;
    Writer:string;
    Actors:string;
    Plot:string;
    Language:string;
    Country:string;
    Awards:string;
    Ratings:Array<Rating>;
    Metascore:string;
    imdbRating:string;
    imdbVotes:string;
    totalSeasons:string;
}
interface Rating {
    Source:string;
    Value:string;
}

interface SearchQueryResult{
    Search:SearchQueryResultSearch;
    totalResults:number;
    Response:string;
    Error?:string;
}
type SearchQueryResultSearch = Array<MovieShort>

export type {MovieShort, MovieFull, SearchQueryResult, SearchQueryResultSearch}