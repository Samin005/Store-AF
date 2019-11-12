import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../service/cart.service';
import {CompaniesService} from '../../service/companies.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    constructor(private router: Router,
                private companiesService: CompaniesService,
                public cartService: CartService) {
    }

    ngOnInit() {
    }

    navigateToItem(itemID) {
        this.router.navigate(['/' + this.companiesService.companyID + '/' + itemID])
            .catch(reason => console.log(reason));
    }

    removeItemFromCart(item) {
        Swal.fire({
            title: 'Are you sure?',
            html: 'Remove <b>' + item.name + '</b> from cart?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                this.cartService.removeItemFromCart(item);
            }
        });
    }

}
