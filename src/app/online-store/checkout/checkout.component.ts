import {Component, OnInit} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {CompaniesService} from '../../service/companies.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    constructor(public companiesService: CompaniesService,
                public cartService: CartService) {
    }

    ngOnInit() {
    }

}
