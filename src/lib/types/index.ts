interface MovieShort {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
interface Rating {
    Source:string;
    Value:string;
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

interface SearchQueryResult{
    Search:SearchQueryResultSearch;
    totalResults:Number;
    Response:string;
    Error?:string;
}
type SearchQueryResultSearch = Array<MovieShort>

export type {MovieShort, MovieFull, SearchQueryResult, SearchQueryResultSearch}

// {
//     Rated: 'TV-14',
//     Released: '24 Oct 2010',
//     Runtime: '88 min',
//     Genre: 'Crime, Drama, Mystery',
//     Director: 'N/A',
//     Writer: 'Mark Gatiss, Steven Moffat',
//     Actors: 'Benedict Cumberbatch, Martin Freeman, Una Stubbs',
//     Plot: 'A modern update finds the famous sleuth and his doctor partner solving crime in 21st-century London.',
//     Language: 'English',
//     Country: 'United Kingdom, United States',
//     Awards: 'Won 9 Primetime Emmys. 93 wins & 183 nominations total',
//     Ratings: [ { Source: 'Internet Movie Database', Value: '9.1/10' } ],
//     Metascore: 'N/A',
//     imdbRating: '9.1',
//     imdbVotes: '939,113',
//     totalSeasons: '4',
//   }