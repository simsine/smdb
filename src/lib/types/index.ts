
interface Movie {
    Title: String;
    Year: String;
    imdbID: String;
    Type: String;
    Poster: string;
}
interface SearchQueryResult{
    Search:SearchQueryResultSearch;
    totalResults:Number;
    Response:String;
    Error?:String;
}
type SearchQueryResultSearch = Array<Movie>

export type {Movie, SearchQueryResult, SearchQueryResultSearch}