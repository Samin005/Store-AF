import {Injectable} from '@angular/core';
import {Item} from '../model/item.model';
import {CartItem} from '../model/cart-item.model';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    cart = [];

    constructor() {
    }

    addToCart(item: Item, quantity: number) {
        this.cart.push(this.convertToCartItemWithQuantity(item, quantity));
        Swal.fire({
            type: 'success',
            title: 'Added to Cart!',
            text: item.name + ' was added to cart.',
            showConfirmButton: false,
            timer: 1500
        }).finally();
    }

    viewCart() {
        console.log(this.cart);
    }

    convertToCartItemWithQuantity(item: Item, quantity: number) {
        const cartItem = new CartItem();
        cartItem.id = item.id;
        cartItem.name = item.name;
        cartItem.imgUrl = item.imgPaths[0];
        cartItem.quantity = quantity;
        return cartItem;
    }
}
