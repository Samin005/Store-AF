import {Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    admin$: Observable<any>;
    userName: string;
    password: string;
    loggedIn = false;

    constructor(private firestoreService: FirestoreService) {
        this.admin$ = this.firestoreService.getAdminCredentials();
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
        return this.admin$;
    }
}
