import { Author } from "./author";
import { Category } from "./category";

export class Product {
    id: number;
    title: string;
    price: number;
    image: string;
    desc: string;
    details: string;
    categoryId: number;
    authorId: number;

    category?: Category[];
    author?: Author[];
    created_at?: Date;
    updated_at?: Date;

    constructor(title: string, id: number, image: string, desc: string, price: number, details: string, category: Array<Category> = [], author: Array<Author> = []) {

        this.title = title;
        this.image = image;
        this.id = id;
        this.desc = desc;
        this.price = price;
        this.details = details;
        this.categoryId = this.categoryId;
        this.authorId = this.authorId;

    }
}