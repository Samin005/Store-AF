import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {CartService} from '../../service/cart.service';
import {CompaniesService} from '../../service/companies.service';
import Swal from "sweetalert2";
import {auth} from 'firebase';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    constructor(public companiesService: CompaniesService,
                public cartService: CartService,
                public afAuth: AngularFireAuth) {
    }

    ngOnInit() {
    }

    signIn() {
        Swal.fire({
            title: 'Signing In...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        }).finally();
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
            .then(response => {
                Swal.fire({
                    type: 'success',
                    title: 'Sign In Successful!',
                    html: 'Welcome, <b>' + response.user.displayName + '</b>',
                    confirmButtonText: 'Great!',
                    timer: 3000
                }).finally();
            }).catch(reason => {
            Swal.fire({
                type: 'error',
                title: 'Sign In Failed!',
                text: reason
            }).finally();
        });
    }

}
