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

    constructor(private adminService: AdminService) {
    }

    ngOnInit() {
    }

    onLogIn() {
        this.adminService.onLogIn(this.userName, this.password);
        if (this.adminService.loggedIn) {
            this.showWelcomeDiv = true;
        }
    }

}
