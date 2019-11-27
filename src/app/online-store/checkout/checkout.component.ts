import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {CompaniesService} from '../../service/companies.service';
import {AuthService} from '../../service/auth.service';
import {UsersService} from '../../service/users.service';
import {LoadingService} from '../../service/loading.service';
import {Order} from '../../model/order.model';
import {OrdersService} from '../../service/orders.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    @ViewChild('phoneNo') phoneNo: ElementRef;
    phoneNoChanged = false;
    @ViewChild('address') address: ElementRef;
    addressChanged = false;
    paymentMethod = 'Cash on Receive';
    order: Order;

    constructor(public companiesService: CompaniesService,
                public cartService: CartService,
                public authService: AuthService,
                public usersService: UsersService,
                private ordersService: OrdersService) {
        this.order = new Order();
    }

    ngOnInit() {
    }

    signIn() {
        this.authService.signInOS();
    }

    signOut() {
        this.authService.signOutOS();
    }

    checkPhoneNoChange() {
        if (this.usersService.currentUser.phoneNo === this.phoneNo.nativeElement.value) {
            this.phoneNoChanged = false;
        } else {
            this.phoneNoChanged = true;
        }
    }

    updatePhoneNo() {
        Swal.fire({
            type: 'question',
            title: 'Update Phone No?',
            html: 'Do you want to update Phone No from <b>' + this.usersService.currentUser.phoneNo + '</b> to <b>' + this.phoneNo.nativeElement.value + '</b> on your account?',
            confirmButtonText: 'Yes',
            confirmButtonColor: '#d33',
            showCancelButton: true
        }).then((response) => {
            if (response.value) {
                LoadingService.showLoaderOSNoAnimation();
                this.usersService.currentUser.phoneNo = this.phoneNo.nativeElement.value;
                this.usersService.updateCurrentUserPhoneNo();
                this.checkPhoneNoChange();
            }
        });
    }

    checkAddressChange() {
        if (this.usersService.currentUser.address === this.address.nativeElement.value) {
            this.addressChanged = false;
        } else {
            this.addressChanged = true;
        }
    }

    updateAddress() {
        Swal.fire({
            type: 'question',
            title: 'Update Address?',
            html: 'Do you want to update Address from <b>' + this.usersService.currentUser.address + '</b> to <b>' + this.address.nativeElement.value + '</b> on your account?',
            confirmButtonText: 'Yes',
            confirmButtonColor: '#d33',
            showCancelButton: true
        }).then((response) => {
            if (response.value) {
                LoadingService.showLoaderOSNoAnimation();
                this.usersService.currentUser.address = this.address.nativeElement.value;
                this.usersService.updateCurrentUserAddress();
                this.checkAddressChange();
            }
        });
    }

    placeOrder() {
        LoadingService.showLoaderOS();
        this.order.orderID = new Date().toISOString().substr(2, 8).replace(/-/g, '') + '-' + this.companiesService.company.orderNoCounter;
        this.order.user = this.usersService.currentUser;
        this.order.cart = this.cartService.cart.map((cartItem) => {return Object.assign({}, cartItem)});
        this.order.paymentMethod = this.paymentMethod;
        this.order.totalPrice = this.cartService.totalPrice;
        this.ordersService.saveOrder(this.order)
            .then(() => {
                this.companiesService.incrementOrderNoCounter(this.companiesService.companyID)
                    .then(() => {
                        Swal.fire({
                            type: 'success',
                            title: 'Order Received!',
                            html: 'Successfully placed your order!<br>Your Order ID: <b>' + this.order.orderID + '</b>',
                            confirmButtonColor: '#d33'
                        }).finally();
                    })
                    .catch(error => {
                        Swal.fire({
                            type: 'error',
                            title: 'Error',
                            text: error
                        }).finally();
                    });;
            })
            .catch(error => {
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: error
                }).finally();
            });
    }

}
