import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CompaniesService} from '../../service/companies.service';
import {CartService} from '../../service/cart.service';
import {AuthService} from '../../service/auth.service';
import {UsersService} from '../../service/users.service';
import {FormControl} from '@angular/forms';
import {ItemsService} from '../../service/items.service';

@Component({
    selector: 'app-header-os',
    templateUrl: './header-os.component.html',
    styleUrls: ['./header-os.component.css']
})
export class HeaderOSComponent implements OnInit {

    formControl = new FormControl();

    constructor(private router: Router,
                public authService: AuthService,
                public companiesService: CompaniesService,
                public cartService: CartService,
                private usersService: UsersService,
                public itemsService: ItemsService) {
    }

    ngOnInit() {
        this.authService.afAuth.user.subscribe((user) => {
            if (user !== null) {
                this.usersService.getFirestoreUserDocByID(user.uid).get().then(docSnapshot => {
                    if (!docSnapshot.exists) {
                        this.usersService.addDefaultUser(user);
                    }
                    this.usersService.setCurrentUser(user.uid);
                });
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

    onItemSelect(event) {
        if(event.option.value !== undefined) {
            this.router.navigate(['/' + this.companiesService.companyID, event.option.value])
                .catch(reason => console.log(reason));
        }
    }

    filterItemsOnInput(event) {
        this.itemsService.updateFilteredItems(event.target.value);
    }

    navigateToAllItems() {
        this.router.navigate(['/' + this.companiesService.companyID + '/all-items'])
            .catch(reason => console.log(reason));
    }
}
