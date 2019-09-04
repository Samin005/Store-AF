import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    userName = 'Samin';
    password = 'samin005';
    loggedIn = false;

    constructor() {
    }

    onLogIn(user: string, pass: string) {
        if (user === this.userName && pass === this.password) {
            this.loggedIn = true;
            console.log('Login Successful');
        } else {
            console.log('Login Failed');
        }
    }

    onLogOut() {
        this.loggedIn = false;
    }
}
