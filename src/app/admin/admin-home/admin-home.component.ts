import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../service/admin.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {UsersService} from '../../service/users.service';
import Swal from 'sweetalert2';

declare var $;

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

    userName: string;
    password: string;
    showWelcomeDiv = false;
    loginFailed = false;

    constructor(public adminService: AdminService,
                public angularFireAuth: AngularFireAuth,
                public usersService: UsersService) {
    }

    ngOnInit() {
        Swal.fire({animation: false});
        Swal.showLoading();
        this.showWelcomeDiv = this.adminService.loggedIn;
        // to keep username on input after logout
        if (this.showWelcomeDiv) {
            this.userName = this.adminService.userName;
        }
        this.angularFireAuth.user.subscribe((user) => {
            if (user != null && user.emailVerified) {
                $('#loginButton').attr('disabled', false);
                // if (!this.usersService.userExists(user.uid)) {
                //     this.usersService.addDefaultUser(user);
                // }
                this.usersService.getFirestoreUserDocByID(user.uid).get().then(docSnapshot => {
                    if (!docSnapshot.exists) {
                        this.usersService.addDefaultUser(user);
                    }
                    // else {
                    //     this.usersService.updateDefaultUser(user);
                    // }
                });
            } else {
                $('#loginButton').attr('disabled', true);
            }
            Swal.close();
        });
    }

    onLogIn() {
        this.loginFailed = this.adminService.onLogIn(this.userName, this.password);
        if (this.adminService.loggedIn) {
            this.showWelcomeDiv = true;
        }
    }

    onLogOut() {
        this.adminService.onLogOut();
        if (!this.adminService.loggedIn) {
            this.showWelcomeDiv = false;
        }
        this.password = '';
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
        this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => Swal.close())
            .catch(reason => {
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
        this.angularFireAuth.auth.signOut()
            .then(() => {
                Swal.close();
            }).catch(reason => {
            Swal.fire({
                type: 'error',
                title: 'Sign Out Failed...',
                text: reason
            }).finally();
        });
    }

}
