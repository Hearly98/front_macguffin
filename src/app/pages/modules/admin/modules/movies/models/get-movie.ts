
import { GenreModel } from "@admin/modules/genres/models/genre.model";
import { Movie } from "./movie";
export class GetMovie extends Movie{
    genre: GenreModel | undefined
}