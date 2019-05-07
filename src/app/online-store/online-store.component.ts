import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../companies.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'app-online-store',
    templateUrl: './online-store.component.html',
    styleUrls: ['./online-store.component.css']
})
export class OnlineStoreComponent implements OnInit {
    companyName: string;

    constructor(private companiesService: CompaniesService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.companyName = params.companyName;
        } );
        this.companiesService.setCurrentCompany(this.companyName);
    }

    loadBackoffice() {
        this.router.navigate(['back-office'], {relativeTo: this.activatedRoute});
    }
}
