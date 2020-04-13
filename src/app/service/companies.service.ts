import {Injectable} from '@angular/core';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {FirestoreService} from './firestore.service';
import {LoadingService} from './loading.service';
import {Company} from '../model/company.model';
import * as firebase from 'firebase/app';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {

    companiesCollection: AngularFirestoreCollection;
    companyID: string;
    company;
    companyExists = true;
    companies;
    companiesCount;

    constructor(private firestoreService: FirestoreService) {
        this.companiesCollection = this.firestoreService.getCompaniesCollection();
        this.company = new Company();
    }

    setCompanies() {
        this.firestoreService.getCompaniesObservable().subscribe(companies => {
            this.companies = companies;
            this.companiesCount = companies.length;
            LoadingService.closeLoader();
        });
    }

    setCompaniesNoLoading() {
        this.firestoreService.getCompaniesObservable().subscribe(companies => {
            this.companies = companies;
            this.companiesCount = companies.length;
        });
    }

    addCompany(newCompany) {
        LoadingService.showLoaderNoAnimation();
        this.companiesCollection.doc(newCompany.id).set(Object.assign({}, newCompany))
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Added!',
                    html: 'Successfully added new company: <b>' + newCompany.id + '</b>',
                    timer: 3000
                }).finally();
            })
            .catch(reason => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: reason.message
                }).finally();
            });
    }

    updateCompany(selectedCompany) {
        LoadingService.showLoaderNoAnimation();
        this.companiesCollection.doc(selectedCompany.id).update(Object.assign({}, selectedCompany))
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    html: 'Successfully updated company: <b>' + selectedCompany.id + '</b>',
                    timer: 3000
                }).finally();
            })
            .catch(reason => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: reason.message
                }).finally();
            });
    }

    // getCompaniesObservable() {
    //     return this.firestoreService.getCompaniesObservable();
    // }

    setCompanyByID(companyID) {
        this.firestoreService.getCompanyObservableByID(companyID).subscribe(comp => {
            if (comp === undefined) {
                this.companyExists = false;
            } else {
                this.company = comp;
                this.companyExists = true;
            }
            LoadingService.closeLoader();
        });
    }

    getCompanyObservableByID(companyID) {
        return this.firestoreService.getCompanyObservableByID(companyID);
    }

    incrementOrderNoCounter(companyID) {
        return this.companiesCollection.doc(companyID).update({ orderNoCounter: firebase.firestore.FieldValue.increment(1) });
    }

    // companyExists(companyID) {
    //     this.firestoreService.getFirestoreCompanyDocById(companyID).get().then(docSnapshot => {
    //         if (docSnapshot.exists) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    // }

    // getFirestoreCompanyDocById(companyID) {
    //     return this.firestoreService.getFirestoreCompanyDocById(companyID);
    // }

    setCompanyID(value: string) {
        this.companyID = value;
    }
}
