import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Observable} from 'rxjs';
import {FirestoreService} from '../service/firestore.service';
import {CompaniesService} from '../service/companies.service';
import {ItemsService} from '../service/items.service';

@Component({
    selector: 'app-online-store',
    templateUrl: './online-store.component.html',
    styleUrls: ['./online-store.component.css']
})
export class OnlineStoreComponent implements OnInit {
    companyID: string;
    allCompaniesList = [];
    inCompanyList = true;
    company$: Observable<any>;
    companies$: Observable<any[]>;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private companiesService: CompaniesService,
                private itemsService: ItemsService,
                private firestoreService: FirestoreService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.companyID = params.companyID;
            this.companiesService.setCompanyID(this.companyID);
            this.companiesService.setCompanyByID(this.companyID);
            this.itemsService.setAllItemsByCompanyID(this.companyID);
        });
        // should be removed
        this.listAndFind(this.companyID);
        this.company$ = this.firestoreService.getCompany(this.companyID);
    }

    listAndFind(companyID) {
        this.companies$ = this.firestoreService.getCompanies();
        this.allCompaniesList = [];
        this.companies$.subscribe(items => {
            items.forEach(item => {
                this.allCompaniesList.push(item.id);
            });
            this.findInCompanyList(companyID);
        }, error => console.log(error),
            () => console.log('Complete!')
        );
    }

    findInCompanyList(companyID) {
        this.inCompanyList = this.allCompaniesList.indexOf(companyID) > -1;
    }

    loadBackOffice() {
        this.router.navigate(['back-office'], {relativeTo: this.activatedRoute})
            .catch(error => console.log(error));
    }
}
