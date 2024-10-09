import { Category } from "@admin/modules/category/models/category";

export class Movie{
    name: string = "";
    code: string = "";
    description: string = "";
    category: Category;
    price: number = 0;
    image: string = ""
    constructor(category: Category){
        this.category = category;
    }
}