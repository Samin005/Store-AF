import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../service/admin.service';
import {Company} from '../../model/company.model';
import {CompaniesService} from '../../service/companies.service';

@Component({
    selector: 'app-new-company',
    templateUrl: './new-company.component.html',
    styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent implements OnInit {

    newCompany = new Company();
    isLoggedIn = false;

    constructor(public adminService: AdminService,
                public companiesService: CompaniesService) {
    }

    ngOnInit() {
        this.isLoggedIn = this.adminService.loggedIn;
    }

    addCompany() {
        this.newCompany.Create_date = new Date();
        this.newCompany.orderNoCounter = 1;
        this.companiesService.addCompany(this.newCompany);
        this.resetCompanyValues();
    }

    setDefaultValues() {
        this.newCompany.name = this.newCompany.id;
        this.newCompany.details = 'A ' + this.newCompany.id;
        this.newCompany.img_path = 'assets/img/' + this.newCompany.id + '.png';
        this.newCompany.slideshow_imgPath_1 = 'assets/img/' + this.newCompany.id + '/' + this.newCompany.id + '-slideshow-1.jpg';
        this.newCompany.slideshow_imgPath_2 = 'assets/img/' + this.newCompany.id + '/' + this.newCompany.id + '-slideshow-2.jpg';
        this.newCompany.slideshow_imgPath_3 = 'assets/img/' + this.newCompany.id + '/' + this.newCompany.id + '-slideshow-3.jpg';
        this.newCompany.slideshow_imgPath_4 = 'assets/img/' + this.newCompany.id + '/' + this.newCompany.id + '-slideshow-4.jpg';
        this.newCompany.slideshow_imgPath_5 = 'assets/img/' + this.newCompany.id + '/' + this.newCompany.id + '-slideshow-5.jpg';
    }

    resetCompanyValues() {
        this.newCompany = new Company();
    }
}
