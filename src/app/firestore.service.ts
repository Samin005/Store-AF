import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    companies: Observable<any[]>;
    sugarlockDetails: string;

    constructor(private db: AngularFirestore) {
        this.companies = db.collection('companies').valueChanges();
    }

    // getCompany(companyName) {
    // this.companies.subscribe(companies => {
    //     companies.forEach(company => {
    //         if (company.name === companyName) {
    //             // this.company.name = company.name;
    //             // this.company.id = company.id;
    //             // this.company.details = company.details;
    //             this.company = new CompanyModel(company.name, company.id, company.details);
    //         }
    //     });
    // });
    // console.log('Company name: ' + this.company.name);
    // }
    getCompany(compName) {
        return this.db.collection('companies', ref => ref.where('name', '==', compName)).valueChanges();
    }

    getSugarlock() {
        return this.db.doc('companies/Sugarlock').valueChanges();
    }

    getSugarlockDetails() {
        this.companies.subscribe(companies => {
            companies.forEach(company => {
                this.sugarlockDetails = company.details;
            });
        });
    }
}
