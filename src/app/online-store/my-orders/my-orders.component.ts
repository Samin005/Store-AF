import {Component, OnInit} from '@angular/core';
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.ordersService.filteredUserOrders.filter = filterValue.trim().toLowerCase();
    }

}
