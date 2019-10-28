export class Item {
    id: string;
    name: string;
    details: string;
    price: number;
    discount: number;
    stock: number;
    imgPaths: Array<string>;
    createDate;
    lastModified;

    constructor() {
        this.imgPaths = [];
    }
}
