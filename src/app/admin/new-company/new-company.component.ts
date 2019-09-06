import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../service/admin.service';

@Component({
    selector: 'app-new-company',
    templateUrl: './new-company.component.html',
    styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent implements OnInit {

    isLoggedIn = false;

    constructor(private adminService: AdminService) {
        this.isLoggedIn = adminService.loggedIn;
    }

    ngOnInit() {
    }

}
