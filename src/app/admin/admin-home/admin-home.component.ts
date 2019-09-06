import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

    admin$: Observable<any>;
    userName: string;
    password: string;
    showWelcomeDiv = false;
    loginFailed = false;

    constructor(public adminService: AdminService) {
    }

    ngOnInit() {
        this.admin$ = this.adminService.getAdminCredentials();
        this.showWelcomeDiv = this.adminService.loggedIn;
        // to keep username on input after logout
        if (this.showWelcomeDiv) {
            this.userName = this.adminService.userName;
        }
    }

    onLogIn() {
        this.loginFailed = this.adminService.onLogIn(this.userName, this.password);
        if (this.adminService.loggedIn) {
            this.showWelcomeDiv = true;
        }
    }

    onLogOut() {
        this.adminService.onLogOut();
        if (!this.adminService.loggedIn) {
            this.showWelcomeDiv = false;
        }
    }

}
