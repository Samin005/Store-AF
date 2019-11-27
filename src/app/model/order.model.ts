import {User} from './user.model';

export class Order {
    orderID: string;
    user: User;
    cart: Array<any>;
    paymentMethod: string;
    totalPrice: number;

    constructor() {
        this.cart = [];
    }
}
