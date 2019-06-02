import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    // companies$: Observable<any[]>;
    // sugarlockDetails: string;

    constructor(private db: AngularFirestore) {
    }

    getCompanies() {
        return this.db.collection('companies').valueChanges();
    }

    getCompany(companyID) {
        // console.log('given comp name = ' + companyID);
        return this.db.doc('companies/' + companyID).valueChanges();
    }

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
}
