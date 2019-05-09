import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../companies.service';
import {ActivatedRoute, Params} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-back-office',
    templateUrl: './back-office.component.html',
    styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent implements OnInit {
    companyName: string;

    constructor(private db: AngularFirestore,
                public companiesService: CompaniesService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.companyName = this.companiesService.getCurrentCompany();
        if (this.companyName === undefined) {
            this.activatedRoute.params.subscribe((params: Params) => {
                this.companyName = params.companyName;
            });
        } else {
            this.companyName = this.companiesService.getCurrentCompany();
        }
        this.companiesService.listAndFind(this.db, this.companyName);
    }

}
