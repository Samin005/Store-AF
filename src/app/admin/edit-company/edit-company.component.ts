import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../service/admin.service';
import {CompaniesService} from '../../service/companies.service';
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
    selectedCompany = new Company();

    constructor(public adminService: AdminService,
                public companiesService: CompaniesService) {
    }

    ngOnInit() {
        this.isLoggedIn = this.adminService.loggedIn;
        $(document).ready(() => {
            $('.selectpicker').selectpicker('refresh');
            $('.bs-placeholder').click(() => this.refreshSelect());
        });
        this.companiesService.setCompanies();
    }

    onCompanySelect(value) {
        this.selectedCompanyID = value;
        this.companiesService.getCompanyObservableByID(this.selectedCompanyID).subscribe(company => {
            this.selectedCompany = (company as Company);
            this.companySelected = true;
        });
    }

    refreshSelect() {
        $('.selectpicker').selectpicker('refresh');
    }

    updateCompany() {
        // this.selectedCompany.Create_date = new Date();
        this.companiesService.updateCompany(this.selectedCompany);
        this.resetCompanyValues();
    }

    setDefaultValues() {
        this.selectedCompany.name = this.selectedCompany.id;
        this.selectedCompany.details = 'A ' + this.selectedCompany.id;
        this.selectedCompany.img_path = 'assets/img/' + this.selectedCompany.id + '.png';
        this.selectedCompany.slideshow_imgPath_1 = 'assets/img/' + this.selectedCompany.id + '/' + this.selectedCompany.id + '-slideshow-1.jpg';
        this.selectedCompany.slideshow_imgPath_2 = 'assets/img/' + this.selectedCompany.id + '/' + this.selectedCompany.id + '-slideshow-2.jpg';
        this.selectedCompany.slideshow_imgPath_3 = 'assets/img/' + this.selectedCompany.id + '/' + this.selectedCompany.id + '-slideshow-3.jpg';
        this.selectedCompany.slideshow_imgPath_4 = 'assets/img/' + this.selectedCompany.id + '/' + this.selectedCompany.id + '-slideshow-4.jpg';
        this.selectedCompany.slideshow_imgPath_5 = 'assets/img/' + this.selectedCompany.id + '/' + this.selectedCompany.id + '-slideshow-5.jpg';
    }

    resetCompanyValues() {
        this.selectedCompany = new Company();
    }
}
