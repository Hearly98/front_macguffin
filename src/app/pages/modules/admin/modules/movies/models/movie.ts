import { GenreModel } from "@admin/modules/genres/models/genre.model";

export class Movie{
    movie_id: number = 0;
    title: string = "";
    description: string = "";
    release_year: number = 0;
    genre?: GenreModel;
    poster_url:  string = "";
    movie_Url?:string = ''
}