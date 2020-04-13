import {Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from '../model/user.model';
import Swal from 'sweetalert2';

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
                icon: 'error',
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
    //             icon: 'error',
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
                icon: 'error',
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
    //             icon: 'error',
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
                    icon: 'success',
                    title: 'Info Updated!',
                    html: 'Successfully updated info for <b>' + this.currentUser.name + '</b>',
                    showConfirmButton: false,
                    timer: 2000
                }).finally();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error
                }).finally();
            });
    }

    updateCurrentUserPhoneNo() {
        this.usersCollection.doc(this.currentUser.uid).update({ phoneNo: this.currentUser.phoneNo })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Phone No Updated!',
                    html: 'Successfully updated Phone No for <b>' + this.currentUser.name + '</b>',
                    showConfirmButton: false,
                    timer: 1000
                }).finally();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error
                }).finally();
            });
    }

    updateCurrentUserAddress() {
        this.usersCollection.doc(this.currentUser.uid).update({ address: this.currentUser.address })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Address Updated!',
                    html: 'Successfully updated Address for <b>' + this.currentUser.name + '</b>',
                    showConfirmButton: false,
                    timer: 1000
                }).finally();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error
                }).finally();
            });
    }

}
