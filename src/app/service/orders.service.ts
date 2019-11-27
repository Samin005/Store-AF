import {Injectable} from '@angular/core';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {FirestoreService} from './firestore.service';
import {CompaniesService} from './companies.service';
import {Order} from '../model/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    ordersCollection: AngularFirestoreCollection;

    constructor(private firestoreService: FirestoreService,
                private companiesService: CompaniesService) {
        this.ordersCollection = firestoreService.getCompanyOrdersCollection(companiesService.companyID);
    }

    saveOrder(newOrder: Order) {
        return this.ordersCollection.add(Object.assign({}, newOrder));
    }
}
