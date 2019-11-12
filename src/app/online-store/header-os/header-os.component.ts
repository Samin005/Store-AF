import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {CompaniesService} from '../../service/companies.service';
import {auth} from 'firebase/app';
import Swal from 'sweetalert2';
import {CartService} from '../../service/cart.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header-os',
    templateUrl: './header-os.component.html',
    styleUrls: ['./header-os.component.css']
})
export class HeaderOSComponent implements OnInit {

    constructor(private router: Router,
                public afAuth: AngularFireAuth,
                public companiesService: CompaniesService,
                private cartService: CartService) {
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
    signOut() {
        Swal.fire({
            title: 'Signing Out...',
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        }).finally();
        this.afAuth.auth.signOut()
            .then(() => {
                Swal.fire({
                    type: 'success',
                    title: 'Signed Out!',
                    timer: 1500
                }).finally();
            }).catch(reason => {
                Swal.fire({
                    type: 'error',
                    title: 'Sign Out Failed...',
                    text: reason
                }).finally();
        });
    }

    viewCart() {
        this.router.navigate(['/' + this.companiesService.companyID + '/cart']);
    }

}
