import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CompaniesService} from '../../service/companies.service';
import {CartService} from '../../service/cart.service';
import {AuthService} from '../../service/auth.service';
import {UsersService} from '../../service/users.service';

@Component({
    selector: 'app-header-os',
    templateUrl: './header-os.component.html',
    styleUrls: ['./header-os.component.css']
})
export class HeaderOSComponent implements OnInit {

    constructor(private router: Router,
                public authService: AuthService,
                public companiesService: CompaniesService,
                public cartService: CartService,
                private usersService: UsersService) {
    }

    ngOnInit() {
        this.authService.afAuth.user.subscribe((user) => {
            if (user !== null) {
                this.usersService.setCurrentUser(user.uid);
            }
        });
    }

    signIn() {
        this.authService.signInOS();
    }

    signOut() {
        this.authService.signOutOS();
    }

    viewCart() {
        this.router.navigate(['/' + this.companiesService.companyID + '/cart'])
            .catch(reason => console.log(reason));
    }

}
