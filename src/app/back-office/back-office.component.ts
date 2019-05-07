import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../companies.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-back-office',
    templateUrl: './back-office.component.html',
    styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent implements OnInit {
    companyName: string;

    constructor(private companiesService: CompaniesService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (this.companiesService.getCurrentCompany() === undefined) {
            this.activatedRoute.params.subscribe((params: Params) => {
                this.companyName = params.companyName;
            });
        } else {
            this.companyName = this.companiesService.getCurrentCompany();
        }
    }

}
