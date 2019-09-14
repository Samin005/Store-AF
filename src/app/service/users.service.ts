import {Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(public firestoreService: FirestoreService) {
    }

    getUserDocByID(userID) {
        return this.firestoreService.getUsersDocById(userID);
    }
}
