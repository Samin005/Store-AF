import {Injectable} from '@angular/core';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {FirestoreService} from './firestore.service';
import {CompaniesService} from './companies.service';
import {Order} from '../model/order.model';
import * as firebase from 'firebase/app';
import {MatTableDataSource} from '@angular/material/table';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    ordersCollection: AngularFirestoreCollection;
    userOrders: Order[];
    filteredUserOrders;
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
                this.filteredUserOrders = new MatTableDataSource(this.userOrders);
                this.filteredUserOrders.filterPredicate = (data: Order, filter) => {
                    const cartData = [];
                    data.cart.forEach(item => cartData.push({name: item.name, quantity: item.quantity}));
                    const tableData = {orderID: data.orderID, orderDate: data.orderDate, cart: cartData, paymentMethod: data.paymentMethod, totalPrice: data.totalPrice};
                    const dataStr =JSON.stringify(tableData).toLowerCase();
                    return dataStr.indexOf(filter) !== -1;
                }
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
