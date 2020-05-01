import {Injectable} from '@angular/core';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {MatTableDataSource} from '@angular/material/table';
import {DatePipe} from '@angular/common';
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
    userOrdersLength = 0;
    filteredUserOrders = new MatTableDataSource([]);
    counter;

    constructor(private firestoreService: FirestoreService,
                private companiesService: CompaniesService,
                private datePipe: DatePipe) {
        this.ordersCollection = firestoreService.getCompanyOrdersCollection(companiesService.companyID);
        this.setOrdersCounter();
    }

    setUserOrders(userID) {
        this.firestoreService.getCompanyOrdersByUserCollection(this.companiesService.companyID, userID).valueChanges()
            .subscribe(orders => {
                this.userOrders = orders as any;
                this.userOrdersLength = this.userOrders.length;
                this.filteredUserOrders.data = this.userOrders;
                this.filteredUserOrders.filterPredicate = (data: Order, filter) => {
                    const cartData = [];
                    data.cart.forEach(item => cartData.push({name: item.name, quantity: item.quantity}));
                    const tableData = {orderID: data.orderID, orderDate: this.datePipe.transform(data.orderDate.toDate()), cart: cartData, paymentMethod: data.paymentMethod, totalPrice: data.totalPrice};
                    const dataStr = JSON.stringify(tableData).toLowerCase();
                    return dataStr.indexOf(filter) !== -1;
                };
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
