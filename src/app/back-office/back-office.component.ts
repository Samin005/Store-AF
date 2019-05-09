import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../companies.service';
import {ActivatedRoute, Params} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-back-office',
    templateUrl: './back-office.component.html',
    styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent implements OnInit {
    companyName: string;
    allCompaniesList = [];
    inCompanyList = true;
    companiesObservable: Observable<any[]>;

    constructor(private db: AngularFirestore,
                private companiesService: CompaniesService,
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
        this.listAndFind(this.companyName);
    }

    listAndFind(companyName) {
        this.companiesObservable = this.db.collection('companies').valueChanges();
        this.allCompaniesList = [];
        this.companiesObservable.subscribe(items => {
            items.forEach(item => {
                this.allCompaniesList.push(item.name);
            });
            this.findInCompanyList(companyName);
        });
    }

    findInCompanyList(companyName) {
        this.inCompanyList = this.allCompaniesList.indexOf(companyName) > -1;
    }
}
