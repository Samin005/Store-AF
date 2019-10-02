import {Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import {LoadingService} from './loading.service';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {

    companiesCollection: AngularFirestoreCollection;
    companyID: string;
    company;
    companies;
    companiesCount;

    constructor(private firestoreService: FirestoreService) {
        this.companiesCollection = this.firestoreService.getCompaniesCollection();
    }

    setCompanies() {
        this.firestoreService.getCompaniesObservable().subscribe(companies => {
            this.companies = companies;
            this.companiesCount = companies.length;
            LoadingService.closeLoader();
        });
    }

    addCompany(newCompany) {
        Swal.showLoading();
        this.companiesCollection.doc(newCompany.id).set(Object.assign({}, newCompany))
            .then(() => {
                Swal.fire({
                    type: 'success',
                    title: 'Added!',
                    html: 'Successfully added new company: <b>' + newCompany.id + '</b>',
                    timer: 3000
                }).finally();
            })
            .catch(reason => {
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: reason
                }).finally();
            });
    }

    updateCompany(selectedCompany) {
        Swal.showLoading();
        this.companiesCollection.doc(selectedCompany.id).update(Object.assign({}, selectedCompany))
            .then(() => {
                Swal.fire({
                    type: 'success',
                    title: 'Updated!',
                    html: 'Successfully updated company: <b>' + selectedCompany.id + '</b>',
                    timer: 3000
                }).finally();
            })
            .catch(reason => {
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: reason
                }).finally();
            });
    }

    getCompaniesObservable() {
        return this.firestoreService.getCompaniesObservable();
    }

    setCompanyByID(companyID) {
        this.firestoreService.getCompanyObservableByID(companyID).subscribe(comp => {
            this.company = comp;
            LoadingService.closeLoader();
        });
    }

    getCompanyObservableByID(companyID) {
        return this.firestoreService.getCompanyObservableByID(companyID);
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

    getFirestoreCompanyDocById(companyID) {
        return this.firestoreService.getFirestoreCompanyDocById(companyID);
    }

    setCompanyID(value: string) {
        this.companyID = value;
    }
}
