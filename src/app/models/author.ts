export class Author {
    id: Number;
    name: string;
    image: string;
    authorId?: any[];
    books?: any[];
    constructor(id: Number, name: string, image: string, books: any[] = [], authorId: any[] = []) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.books = books;
    }
}


