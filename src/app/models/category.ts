export class Category {
    id: Number;
    name: string;
    monster?: any[];
    constructor(id: Number, name: string, monster: any[] = []) {
        this.id = id;
        this.name = name;
        this.monster = monster;
    }
}
