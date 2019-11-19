import {Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import {User} from '../model/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    usersCollection: AngularFirestoreCollection;
    authorizedUser = false;
    currentUser = new User();

    constructor(public firestoreService: FirestoreService) {
        this.usersCollection = firestoreService.getUsersCollection();
    }

    getUserObservableByID(userID) {
        return this.firestoreService.getUserObservableById(userID);
    }

    getFirestoreUserDocByID(userID) {
        return this.firestoreService.getFirestoreUserDocById(userID);
    }

    // userExists(userID) {
    //     this.firestoreService.getFirestoreUserDocById(userID).get().then(docSnapshot => {
    //         if (docSnapshot.exists) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    // }

    addDefaultUser(user) {
        this.usersCollection.doc(user.uid).set({
            name: user.displayName,
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            role: 'guest',
            roleOS: 'guest',
            companyIDOS: 'Demo Comp',
            roleBO: 'guest',
            companyIDBO: 'Demo Comp',
            createdDate: new Date()
        }).catch(error => {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: error
            }).finally();
        });
    }

    // updateDefaultUser(user) {
    //     this.usersCollection.doc(user.uid).update({
    //         name: user.displayName,
    //         emailVerified: user.emailVerified,
    //         photoURL: user.photoURL,
    //         role: 'guest',
    //         roleOS: 'guest',
    //         companyIDOS: 'Demo Comp',
    //         roleBO: 'guest',
    //         companyIDBO: 'Demo Comp',
    //         modifiedDate: new Date()
    //     }).catch(error => {
    //         Swal.fire({
    //             type: 'error',
    //             title: 'Error',
    //             text: error
    //         }).finally();
    //     });
    // }

    addBackOfficeUser(user, companyID: string) {
        this.usersCollection.doc(user.uid).set({
            name: user.displayName,
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            role: 'guest',
            roleOS: 'guest',
            companyIDOS: 'Demo Comp',
            roleBO: 'guest',
            companyIDBO: companyID,
            createdDate: new Date()
        }).catch(error => {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: error
            }).finally();
        });
    }

    // updateBackOfficeUser(user, companyID: string) {
    //     this.usersCollection.doc(user.uid).update({
    //         name: user.displayName,
    //         emailVerified: user.emailVerified,
    //         photoURL: user.photoURL,
    //         roleBO: 'guest',
    //         companyIDBO: companyID,
    //         modifiedDate: new Date()
    //     }).catch(error => {
    //         Swal.fire({
    //             type: 'error',
    //             title: 'Error',
    //             text: error
    //         }).finally();
    //     });
    // }

    setCurrentUser(userID) {
        this.firestoreService.getUserObservableById(userID).subscribe((user) => {
            this.currentUser = (user as User);
        });
    }

    updateCurrentUser() {
        this.usersCollection.doc(this.currentUser.uid).update(Object.assign({}, this.currentUser))
            .then(() => {
                Swal.fire({
                    type: 'success',
                    title: 'Info Updated!',
                    html: 'Successfully updated info for <b>' + this.currentUser.name + '</b>',
                    timer: 2000
                }).finally();
            })
            .catch(error => {
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: error
                }).finally();
            });
    }
}
