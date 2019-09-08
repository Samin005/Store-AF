import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../service/admin.service';
import {CompaniesService} from '../../service/companies.service';
import {Observable} from 'rxjs';
import {Company} from '../../model/company.model';

declare var $;

@Component({
    selector: 'app-edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

    isLoggedIn = false;
    selectedCompanyID: string;
    companySelected = false;
    companies$: Observable<any>;
    selectedCompany: Company;

    constructor(public adminService: AdminService,
                public companiesService: CompaniesService) {
    }

    ngOnInit() {
        this.isLoggedIn = this.adminService.loggedIn;
        $(document).ready(() => $('.selectpicker').selectpicker('refresh'));
        this.companies$ = this.companiesService.getCompanies();
    }

    onCompanySelect(value) {
        this.selectedCompanyID = value;
        this.companySelected = true;
        this.companiesService.getCompanyObservableByID(this.selectedCompanyID).subscribe(company => {
                this.selectedCompany = (company as Company);
            });
    }

    refreshSelect() {
        $('.selectpicker').selectpicker('refresh');
    }
}
