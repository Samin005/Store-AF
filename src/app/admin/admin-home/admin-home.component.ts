import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

    userName: string;
    password: string;
    showWelcomeDiv = false;
    loginFailed = false;

    constructor(private adminService: AdminService) {
    }

    ngOnInit() {
        this.showWelcomeDiv = this.adminService.loggedIn;
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
        console.log('Logged out');
        if (!this.adminService.loggedIn) {
            this.showWelcomeDiv = false;
        }
    }

}
