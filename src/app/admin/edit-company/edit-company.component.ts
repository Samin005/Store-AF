import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../service/admin.service';

declare var $;

@Component({
    selector: 'app-edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

    isLoggedIn = false;
    selectedCompany: string;
    companySelected = false;

    constructor(public adminService: AdminService) {
    }

    ngOnInit() {
        this.isLoggedIn = this.adminService.loggedIn;
        $(document).ready(() => $('.selectpicker').selectpicker('refresh'));
    }

    onCompanySelect(value) {
        this.selectedCompany = value;
        this.companySelected = true;
        console.log(this.selectedCompany);
    }

}
