import { GetGenreModel } from "@admin/modules/genres/models/get-genre.model";
import { Movie } from "./movie";
export class GetMovie extends Movie{
    genre: GetGenreModel | undefined
}