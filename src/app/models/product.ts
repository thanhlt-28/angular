import { Category } from "./category";

export class Product {
    id: Number;
    title: string;
    price: number;
    image: string;
    desc: string;
    details: string;
    categoryId: Number;

    category?: Category;
    created_at?: Date;
    updated_at?: Date;

    constructor(title: string, id: number, image: string, desc: string, price: number, details: string, category: Array<Category> = []) {

        this.title = title;
        this.image = image;
        this.id = id;
        this.desc = desc;
        this.price = price;
        this.details = details;
        this.categoryId = this.categoryId;

    }
}