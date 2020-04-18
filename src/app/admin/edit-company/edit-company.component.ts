import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AdminService} from '../../service/admin.service';
import {CompaniesService} from '../../service/companies.service';
import {Company} from '../../model/company.model';


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
    myControl = new FormControl();

    constructor(public adminService: AdminService,
                public companiesService: CompaniesService) {
    }

    ngOnInit() {
        this.isLoggedIn = this.adminService.loggedIn;
        // for bootstrap-select
        // $(document).ready(() => {
        //     this.refreshSelect();
        //     $('.bs-placeholder').click(() => this.refreshSelect());
        // });
        this.companiesService.setCompaniesNoLoadingWithFilteredCompanies();
    }

    selectCompaniesOnInput(event) {
        this.companiesService.updateFilteredCompanies(event.target.value);
    }

    onCompanySelect(event) {
        this.selectedCompanyID = event.option.value;
        this.selectedCompany = this.companiesService.companies.filter(comp => comp.id === this.selectedCompanyID)[0];
        this.companySelected = true;
        // this.companiesService.getCompanyObservableByID(this.selectedCompanyID).subscribe(company => {
        //     this.selectedCompany = (company as Company);
        //     this.companySelected = true;
        // });
    }

    // for bootstrap-select
    // refreshSelect() {
    //     $('.selectpicker').selectpicker('refresh');
    // }

    updateCompany() {
        // this.selectedCompany.Create_date = new Date();
        this.companiesService.updateCompany(this.selectedCompany);
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
}
