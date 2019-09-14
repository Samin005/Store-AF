import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../service/admin.service';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import Swal from 'sweetalert2';
import {UsersService} from '../../service/users.service';
declare var $;

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

    admin$: Observable<any>;
    userName: string;
    password: string;
    showWelcomeDiv = false;
    loginFailed = false;

    constructor(public adminService: AdminService,
                public angularFireAuth: AngularFireAuth,
                public usersService: UsersService) {
    }

    ngOnInit() {
        this.admin$ = this.adminService.getAdminCredentials();
        this.showWelcomeDiv = this.adminService.loggedIn;
        // to keep username on input after logout
        if (this.showWelcomeDiv) {
            this.userName = this.adminService.userName;
        }
        this.angularFireAuth.user.subscribe((response) => {
            if (response != null && response.emailVerified) {
                $('#loginButton').attr('disabled', false);
                console.log(response.uid);
                this.usersService.getUserDocByID(response.uid).get().then(docSnapshot => {
                    if (docSnapshot.exists) {
                        console.log('Exists!');
                    } else {
                        console.log('does not exist');
                        this.usersService.addUser(response);
                    }
                });
            } else {
                $('#loginButton').attr('disabled', true);
            }
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
        this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
            .then(response => {
                Swal.fire({
                    type: 'success',
                    title: 'Sign In Successful!',
                    html: 'Welcome, <b>' + response.user.displayName + '</b>',
                    confirmButtonText: 'Great!',
                    timer: 3000
                }).finally(() => {
                });
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
            title: 'Signing In...',
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        }).finally();
        this.angularFireAuth.auth.signOut()
            .then(() => {
                Swal.fire({
                    type: 'success',
                    title: 'Signed Out!',
                    timer: 1500
                }).finally();
                $('#loginButton').attr('disabled', true);
            }).catch(reason => {
            Swal.fire({
                type: 'error',
                title: 'Sign Out Failed...',
                text: reason
            }).finally();
        });
    }

}
