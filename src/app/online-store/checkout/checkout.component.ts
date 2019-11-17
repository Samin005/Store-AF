import {Component, OnInit} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {CompaniesService} from '../../service/companies.service';
import {AuthService} from '../../service/auth.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    constructor(public companiesService: CompaniesService,
                public cartService: CartService,
                public authService: AuthService) {
    }

    ngOnInit() {
    }

    signIn() {
        this.authService.signInOS();
    }

    signOut() {
        this.authService.signOutOS();
    }

}
