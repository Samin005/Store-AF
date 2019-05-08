import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {
    currentCompanyName: string;
    allCompaniesList = [];
    allcompaniesString: string;
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

    addToCompanies(companyName) {
        this.allCompaniesList.push(companyName);
    }

    getAllCompaniesList() {
        return this.allCompaniesList;
    }

    initializeAllCompaniesList() {
        this.allCompaniesList = [];
    }

    setAllCompaniesList(db: AngularFirestore) {
        this.companiesObservable = db.collection('companies').snapshotChanges();
        this.allCompaniesList = [];
        this.companiesObservable.subscribe(items => {
            this.allCompaniesList = items;
            console.log('Middle: ');
            console.log(this.allCompaniesList);
            // return this.allCompaniesList;
        });
        console.log('outside: ');
        console.log(this.allCompaniesList);
        // return this.allCompaniesList;
    }

    allCompnaiesListContains(item): boolean {
        console.log('item: ' + item);
        console.log(this.allCompaniesList.indexOf('Sugarlock') > -1);
        return this.allCompaniesList.indexOf(item) > -1;
    }
}
