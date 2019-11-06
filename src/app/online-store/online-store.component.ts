import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CompaniesService} from '../service/companies.service';
import {ItemsService} from '../service/items.service';
import {LoadingService} from '../service/loading.service';

@Component({
    selector: 'app-online-store',
    templateUrl: './online-store.component.html',
    styleUrls: ['./online-store.component.css']
})
export class OnlineStoreComponent implements OnInit {

    companyID: string;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                public companiesService: CompaniesService,
                private itemsService: ItemsService) {
    }

    ngOnInit() {
        LoadingService.showLoader();
        this.activatedRoute.params.subscribe((params: Params) => {
            this.companyID = params.companyID;
            this.companiesService.setCompanyID(this.companyID);
            this.companiesService.setCompanyByID(this.companyID);
            this.itemsService.setAllItemsByCompanyID(this.companyID, false);
        });
    }

    loadBackOffice() {
        this.router.navigate([this.companiesService.companyID + '/back-office'])
            .catch(error => console.log(error));
    }
}
