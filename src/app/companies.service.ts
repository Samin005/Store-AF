import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {
    currentCompanyName: string;
    allCompaniesList = [];
    companiesObservable: Observable<any[]>;

    constructor() {
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
        this.companiesObservable = db.collection('companies').valueChanges();
        this.allCompaniesList = [];
        this.companiesObservable.subscribe(items => {
            items.forEach(item => {
                this.allCompaniesList.push(item.name);
                console.log('inside: ');
                console.log(this.allCompaniesList);
            });
        });
        console.log('outside: ');
        console.log(this.allCompaniesList);
    }

    allCompnaiesListContains(item): boolean {
        console.log('item: ' + item);
        console.log(this.allCompaniesList.indexOf('Sugarlock') > -1);
        return this.allCompaniesList.indexOf(item) > -1;
    }
}
