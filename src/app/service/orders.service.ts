import {Injectable} from '@angular/core';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {FirestoreService} from './firestore.service';
import {CompaniesService} from './companies.service';
import {Order} from '../model/order.model';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    ordersCollection: AngularFirestoreCollection;
    userOrders: Order[];
    counter;

    constructor(private firestoreService: FirestoreService,
                private companiesService: CompaniesService) {
        this.ordersCollection = firestoreService.getCompanyOrdersCollection(companiesService.companyID);
        this.setOrdersCounter();
    }

    setUserOrders(userID) {
        this.firestoreService.getCompanyOrdersByUserCollection(this.companiesService.companyID, userID).valueChanges()
            .subscribe(orders => {
                this.userOrders = orders as any;
                console.log(this.userOrders);
            });
    }

    saveOrder(newOrder: Order) {
        return this.ordersCollection.add(Object.assign({}, newOrder));
    }

    setOrdersCounter() {
        this.ordersCollection.doc('Counter').valueChanges().subscribe(counter => this.counter = counter);
    }

    incrementOrderNoCounter() {
        return this.ordersCollection.doc('Counter').update({orderNo: firebase.firestore.FieldValue.increment(1)});
    }
}
