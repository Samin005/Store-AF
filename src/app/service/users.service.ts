import {Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    usersCollection: AngularFirestoreCollection;
    constructor(public firestoreService: FirestoreService) {
        this.usersCollection = firestoreService.getUsersCollection();
    }

    getUserDocByID(userID) {
        return this.firestoreService.getUsersDocById(userID);
    }

    addUser(user) {
        this.usersCollection.doc(user.uid).set({name: user.displayName, id: user.uid, role: 'guest'});
    }
}
