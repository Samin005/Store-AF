import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {CompaniesService} from '../../service/companies.service';
import {AuthService} from '../../service/auth.service';
import {UsersService} from '../../service/users.service';
import {LoadingService} from '../../service/loading.service';
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

    constructor(public companiesService: CompaniesService,
                public cartService: CartService,
                public authService: AuthService,
                public usersService: UsersService) {
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
        console.log('order placed!');
    }

}
