import {Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {

    companiesCollection: AngularFirestoreCollection;
    companies$: Observable<any>;

    constructor(firestoreService: FirestoreService) {
        this.companiesCollection = firestoreService.getCompaniesCollection();
        this.companies$ = this.companiesCollection.valueChanges();
    }

    addCompany(newCompany) {
        Swal.showLoading();
        this.companiesCollection.doc(newCompany.id)
            .set(Object.assign({}, newCompany))
            .then(() => {
                Swal.fire({
                    type: 'success',
                    title: 'Success!',
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
}
