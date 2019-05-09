import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {
    currentCompanyName: string;
    allCompaniesList = [];
    inCompanyList = false;
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
        this.companiesObservable = db.collection('companies').valueChanges();
        const tempArr = [];
        this.companiesObservable.subscribe(items => {
            items.forEach(item => {
                tempArr.push(item.name);
            });
            console.log('Middle: ');
            console.log(this.allCompaniesList);
            this.updateAllCompanies(tempArr);
            // return this.allCompaniesList;
        });
        // console.log('outside: ');
        // console.log(this.allCompaniesList);
        // return this.allCompaniesList;
    }

    setAllCompaniesListAndContains(db: AngularFirestore, companyName) {
        this.companiesObservable = db.collection('companies').valueChanges();
        this.allCompaniesList = [];
        this.companiesObservable.subscribe(items => {
            items.forEach(item => {
                this.allCompaniesList.push(item.name);
            });
            this.contains(companyName);
        });
    }

    contains(companyName) {
        if (this.allCompaniesList.indexOf(companyName) > -1) {
            this.inCompanyList = true;
        } else {
            this.inCompanyList = false;
        }
    }

    updateAllCompanies(tempArr) {
        this.allCompaniesList = tempArr;
        console.log('updated: ');
        console.log(this.allCompaniesList);
    }

    allCompnaiesListContains(item): boolean {
        console.log('item: ' + item);
        console.log(this.allCompaniesList.indexOf('Sugarlock') > -1);
        return this.allCompaniesList.indexOf(item) > -1;
    }
}
