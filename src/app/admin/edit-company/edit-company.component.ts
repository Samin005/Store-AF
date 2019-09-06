import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../service/admin.service';

@Component({
    selector: 'app-edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

    isLoggedIn = false;

    constructor(private adminService: AdminService) {
        this.isLoggedIn = adminService.loggedIn;
    }

    ngOnInit() {
    }

}
