import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CompaniesService} from '../../service/companies.service';
import {OrdersService} from '../../service/orders.service';
import {AuthService} from '../../service/auth.service';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

    displayedColumns: string[] = ['orderID', 'orderDate', 'cart', 'paymentMethod', 'totalPrice'];
    private paginator: MatPaginator;
    private sort: MatSort;

    @ViewChild(MatSort) set matSort(ms: MatSort) {
        this.sort = ms;
        this.setDataSourceAttributes();
    }

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.setDataSourceAttributes();
    }

    constructor(public companiesService: CompaniesService,
                public ordersService: OrdersService,
                public authService: AuthService) {
    }

    ngOnInit() {
        this.authService.afAuth.user.subscribe((user) => {
            if (user !== null) {
                this.ordersService.setUserOrders(user.uid);
            } else {
                this.ordersService.userOrders = [];
            }
        });
    }

    setDataSourceAttributes() {
        this.ordersService.filteredUserOrders.paginator = this.paginator;
        this.ordersService.filteredUserOrders.sort = this.sort;

        if (this.paginator && this.sort) {
            this.applyFilter('');
        }
    }

    applyFilter(value: string) {
        this.ordersService.filteredUserOrders.filter = value.trim().toLowerCase();
    }
}
