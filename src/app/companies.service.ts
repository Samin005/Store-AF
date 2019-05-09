import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {
    currentCompanyName: string;
    allCompaniesList = [];
    inCompanyList = true;
    companiesObservable: Observable<any[]>;

    constructor(private db: AngularFirestore) {
        this.companiesObservable = db.collection('companies').valueChanges();
    }

    setCurrentCompany(companyName) {
        this.currentCompanyName = companyName;
    }

    getCurrentCompany() {
        return this.currentCompanyName;
    }

    // addToCompanies(companyName) {
    //     this.allCompaniesList.push(companyName);
    // }
    //
    // getAllCompaniesList() {
    //     return this.allCompaniesList;
    // }
    //
    // initializeAllCompaniesList() {
    //     this.allCompaniesList = [];
    // }

    listAndFind(db: AngularFirestore, companyName) {
        this.companiesObservable = db.collection('companies').valueChanges();
        this.allCompaniesList = [];
        this.companiesObservable.subscribe(items => {
            items.forEach(item => {
                this.allCompaniesList.push(item.name);
            });
            this.findInCompanyList(companyName);
        });
    }

    findInCompanyList(companyName) {
        this.inCompanyList = this.allCompaniesList.indexOf(companyName) > -1;
    }
}
