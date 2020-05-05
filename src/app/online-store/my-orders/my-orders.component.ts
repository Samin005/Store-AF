import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CompaniesService} from '../../service/companies.service';
import {OrdersService} from '../../service/orders.service';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

    displayedColumns: string[] = ['orderID', 'orderDate', 'cart', 'paymentMethod', 'totalPrice'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    // private paginator: MatPaginator;
    // private sort: MatSort;
    //
    // @ViewChild(MatSort) set matSort(ms: MatSort) {
    //     this.sort = ms;
    //     this.setDataSourceAttributes();
    // }
    //
    // @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    //     this.paginator = mp;
    //     this.setDataSourceAttributes();
    // }

    constructor(public companiesService: CompaniesService,
                public ordersService: OrdersService,
                public authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        // set up paginator and sort for mat table
        this.ordersService.filteredUserOrders.paginator = this.paginator;
        this.ordersService.filteredUserOrders.sort = this.sort;

        this.authService.afAuth.user.subscribe((user) => {
            if (user !== null) {
                this.ordersService.setUserOrders(user.uid);
            } else {
                this.ordersService.userOrders = [];
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.ordersService.filteredUserOrders.filter = filterValue.trim().toLowerCase();

        if (this.ordersService.filteredUserOrders.paginator) {
            this.ordersService.filteredUserOrders.paginator.firstPage();
        }
    }

    // setDataSourceAttributes() {
    //     this.ordersService.filteredUserOrders.paginator = this.paginator;
    //     this.ordersService.filteredUserOrders.sort = this.sort;
    //
    //     if (this.paginator && this.sort) {
    //         this.applyFilterString('');
    //     }
    // }
    // applyFilterString(value: string) {
    //     this.ordersService.filteredUserOrders.filter = value.trim().toLowerCase();
    // }

    navigateToItem(itemID) {
        this.router.navigate(['/' + this.companiesService.companyID, itemID])
            .catch(reason => console.log(reason));
    }
}
