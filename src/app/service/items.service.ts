import {Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {CompaniesService} from './companies.service';
import {LoadingService} from './loading.service';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class ItemsService {
    itemsCollection: AngularFirestoreCollection;

    constructor(private companiesService: CompaniesService,
                private firestoreService: FirestoreService) {
        this.itemsCollection = firestoreService.getCompanyItemsCollection(companiesService.companyID);
    }

    addItem(newItem) {
        LoadingService.showLoaderNoAnimation();
        this.itemsCollection.doc(newItem.id).set(Object.assign({}, newItem))
            .then(() => {
                Swal.fire({
                    type: 'success',
                    title: 'Added!',
                    html: 'Successfully added new company: <b>' + newItem.id + '</b>',
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
