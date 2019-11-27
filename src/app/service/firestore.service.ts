import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    // companyID: string;
    // company$: Observable<any>;
    // companies$: Observable<any[]>;

    // sugarlockDetails: string;

    // static showLoader() {
    //     Swal.fire({
    //         title: 'Loading...',
    //         imageUrl: 'assets/img/loader.gif',
    //         showConfirmButton: false,
    //         customClass: {
    //             image: 'my-0'
    //         }
    //     }).finally(() => {
    //     });
    // }

    constructor(private db: AngularFirestore) {
    }

    // getCompanies() {
    //     FirestoreService.showLoader();
    //     this.companies$ = this.db.collection('companies').valueChanges();
    //     this.companies$.subscribe(() => Swal.close());
    //     return this.companies$;
    // }
    //
    // getCompany(companyID) {
    //     FirestoreService.showLoader();
    //     this.company$ = this.db.doc('companies/' + companyID).valueChanges();
    //     this.company$.subscribe(() => Swal.close());
    //     // finding company from db
    //     // this.db.collection('companies/', ref => ref.where('id', '==', companyID)).valueChanges().subscribe(value => console.log(value));
    //     return this.company$;
    // }
    //
    // getCompanyID() {
    //     return this.companyID;
    // }
    //
    // setCompanyID(compID) {
    //     this.companyID = compID;
    // }

    // getCompany(compName) {
    //     return this.db.collection('companies', ref => ref.where('name', '==', compName)).valueChanges();
    // }
    //
    // getSugarlock() {
    //     return this.db.doc('companies/Sugarlock').valueChanges();
    // }
    //
    // getSugarlockDetails() {
    //     this.companies.subscribe(companies => {
    //         companies.forEach(company => {
    //             this.sugarlockDetails = company.details;
    //         });
    //     });
    // }
    getAdminCredentials() {
        return this.db.doc('admin/Store-AF').valueChanges();
    }

    getCompaniesCollection() {
        return this.db.collection('companies');
    }

    getCompanyItemsCollection(companyID) {
        return this.db.collection(companyID + '-items');
    }

    getCompanyOrdersCollection(companyID) {
        return this.db.collection(companyID + '-orders');
    }

    getCompanyItemsObservable(companyID) {
        return this.db.collection(companyID + '-items').valueChanges();
    }

    getCompaniesObservable() {
        return this.db.collection('companies').valueChanges();
    }

    getCompanyObservableByID(companyID) {
        return this.db.doc('companies/' + companyID).valueChanges();
    }

    // used for checking if doc exists
    // getFirestoreCompanyDocById(companyID) {
    //     return this.db.firestore.doc('companies/' + companyID);
    // }

    // adding a doc and setting the auto generated id as a field
    // addAdmin() {
    //     console.log('clicked!');
    //     this.db.collection('admin').add({name: 'YOLO'}).then(ref => {
    //         ref.update({id: ref.id});
    //     }).catch(reason => console.log(reason));
    // }

    // find and delete unnecessary admins created by addAdmin()
    // deleteUnnecessaryAdmins() {
    //     this.db.collection('admin', ref => ref.where('name', '==', 'YOLO')).valueChanges().subscribe(values => {
    //         values.forEach((value: any) => {
    //             this.db.doc('admin/' + value.id).delete().then(() => console.log('delete success')).catch(reason => console.log(reason));
    //         });
    //     });
    // }

    getUserObservableById(userUID) {
        return this.db.doc('users/' + userUID).valueChanges();
    }

    // used for checking if doc exists
    getFirestoreUserDocById(userUID) {
        return this.db.firestore.doc('users/' + userUID);
    }

    getUsersCollection() {
        return this.db.collection('users');
    }
}
