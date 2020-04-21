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
        let existingItemIndex = -1;
        let updatedQuantity = -1;
        let previousQuantity = -1;
        this.cart.forEach(cartItem => {
            if(cartItem.name === item.name){
                existingItemIndex = this.cart.indexOf(cartItem);
                previousQuantity = cartItem.quantity;
                updatedQuantity = previousQuantity + quantity;
            }
        });
        if(existingItemIndex !== -1){
            Swal.fire({
                icon: 'question',
                title: 'Already in Cart!',
                html: 'Already <b>'+previousQuantity+'</b> of <b>' + item.name + '</b> exists in your cart, would you like to add <b>'+ quantity +'</b> more?',
                confirmButtonText: 'Yes, add them.',
                showCancelButton: true,
                confirmButtonColor: '#d33'
            }).then(result => {
                if(result.value) {
                    this.cart.splice(existingItemIndex, 1);
                    this.cart.push(this.convertToCartItemWithQuantity(item, updatedQuantity));
                    this.updateTotalPrice();
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated Cart!',
                        html: 'Total <b>'+updatedQuantity+'</b> of <b>' + item.name + '</b> is in your cart now.',
                        showConfirmButton: false,
                        timer: 1500
                    }).finally();
                }
            });
        } else {
            this.cart.push(this.convertToCartItemWithQuantity(item, quantity));
            this.updateTotalPrice();
            Swal.fire({
                icon: 'success',
                title: 'Added to Cart!',
                html: '<b>' + item.name + '</b> was added to cart.',
                showConfirmButton: false,
                timer: 1500
            }).finally();
        }
    }

    removeItemFromCart(item) {
        const index = this.cart.indexOf(item);
        if (index !== -1) {
            this.cart.splice(index, 1);
            this.updateTotalPrice();
            Swal.fire({
                title: 'Removed from cart!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
            }).finally();
        } else {
            Swal.fire({
                title: item.name + ' not Found',
                icon: 'error'
            }).finally();
        }
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

    resetCart() {
        this.cart = [];
    }
}
