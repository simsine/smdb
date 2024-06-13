// Types for responses from OMDB API
export interface MovieShort {
	Title: string
	Year: string
	imdbID: string
	Type: string
	Poster: string
}
export interface MovieFull extends MovieShort {
	Response: string
	Error?: string

	Rated: string
	Released: string
	Runtime: string
	Genre: string
	Director: string
	Writer: string
	Actors: string
	Plot: string
	Language: string
	Country: string
	Awards: string
	Ratings: Array<Rating>
	Metascore: string
	imdbRating: string
	imdbVotes: string
	totalSeasons: string
}
export interface Rating {
	Source: string
	Value: string
}

export interface SearchQueryResult {
	Search: SearchQueryResultSearch
	totalResults: number
	Response: string
	Error?: string
}
export type SearchQueryResultSearch = Array<MovieShort>
