import {Injectable} from '@angular/core';
import {Item} from '../model/item.model';
import {CartItem} from '../model/cart-item.model';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    cart = [];
    totalPrice = 0;

    constructor() {
    }

    addToCart(item: Item, quantity: number) {
        this.cart.push(this.convertToCartItemWithQuantity(item, quantity));
        this.updateTotalPrice();
        Swal.fire({
            type: 'success',
            title: 'Added to Cart!',
            html: '<b>' + item.name + '</b> was added to cart.',
            showConfirmButton: false,
            timer: 1500
        }).finally();
    }

    removeItemFromCart(item) {
        const index = this.cart.indexOf(item);
        if (index !== -1) {
            this.cart.splice(index, 1);
            this.updateTotalPrice();
            Swal.fire({
                title: 'Removed from cart!',
                type: 'success',
                showConfirmButton: false,
                timer: 1000
            }).finally();
        } else {
            Swal.fire({
                title: item.name + ' not Found',
                type: 'error'
            }).finally();
        }
    }

    viewCart() {
        console.log(this.cart);
    }

    convertToCartItemWithQuantity(item: Item, quantity: number) {
        const cartItem = new CartItem();
        cartItem.id = item.id;
        cartItem.name = item.name;
        cartItem.details = item.details;
        cartItem.imgUrl = item.imgPaths[0];
        cartItem.quantity = quantity;
        cartItem.price = item.price;
        cartItem.subTotal = cartItem.quantity * cartItem.price;
        return cartItem;
    }

    updateTotalPrice() {
        this.totalPrice = 0;
        this.cart.forEach(cartItem => {
            this.totalPrice = this.totalPrice + cartItem.subTotal;
        });
    }
}
