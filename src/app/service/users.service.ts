import {Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import Swal from 'sweetalert2';

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
        this.usersCollection.doc(user.uid).set({
            name: user.displayName,
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            role: 'guest',
            createdDate: new Date()
        }).catch(error => {
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: error
                }).finally();
            });
    }
}
