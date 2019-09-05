import {Injectable} from '@angular/core';
import {FirestoreService} from '../firestore.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    userName: string;
    password: string;
    loggedIn = false;

    constructor(private firestoreService: FirestoreService) {
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

    getAdminCredentials() {
        return this.firestoreService.getAdminCredentials();
    }
}
