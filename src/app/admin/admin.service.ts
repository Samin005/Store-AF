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

    // returns if login failed
    onLogIn(user: string, pass: string) {
        if (user === this.userName && pass === this.password) {
            this.loggedIn = true;
            return false;
        } else {
            return true;
        }
    }

    onLogOut() {
        this.loggedIn = false;
    }
}
