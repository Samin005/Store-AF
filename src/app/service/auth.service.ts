import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    afAuth: AngularFireAuth;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.afAuth = angularFireAuth;
    }

    signInOS() {
        Swal.fire({
            title: 'Signing In...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        }).finally();
        this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Sign In Successful!',
                    html: 'Welcome, <b>' + response.user.displayName + '</b>',
                    confirmButtonText: 'Great!',
                    timer: 3000
                }).finally();
            }).catch(reason => {
            Swal.fire({
                icon: 'error',
                title: 'Sign In Failed!',
                text: reason
            }).finally();
        });
    }

    signOutOS() {
        Swal.fire({
            title: 'Signing Out...',
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        }).finally();
        this.afAuth.signOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Signed Out!',
                    timer: 1500
                }).finally();
            }).catch(reason => {
            Swal.fire({
                icon: 'error',
                title: 'Sign Out Failed...',
                text: reason
            }).finally();
        });
    }

}
