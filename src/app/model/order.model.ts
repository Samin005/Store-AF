import {User} from './user.model';

export class Order {
    orderID: string;
    user: User;
    cart: Array<any>;
    paymentMethod: string;
    totalPrice: number;
    orderDate;

    constructor() {
        this.cart = [];
    }
}
