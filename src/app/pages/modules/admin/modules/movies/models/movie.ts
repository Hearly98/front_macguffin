import { GenreModel } from "@admin/modules/genres/models/genre.model";

export class Movie{
    movie_id: number = 0;
    title: string = "";
    description: string = "";
    release_year: number = 0;
    genre?: GenreModel;
    poster_url:  string = "";
    //video_url?:string = 'https://www.youtube.com/embed/2PK9lUpin0g?si=H7XaRYpR7ed_tm91'
}