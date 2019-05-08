import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../companies.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-online-store',
    templateUrl: './online-store.component.html',
    styleUrls: ['./online-store.component.css']
})
export class OnlineStoreComponent implements OnInit {
    companyName: string;
    allCompanies = [];
    companies: Observable<any[]>;

    constructor(private companiesService: CompaniesService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private db: AngularFirestore) {
    }

    ngOnInit() {
        this.companiesService.setAllCompaniesList(this.db);
        this.activatedRoute.params.subscribe((params: Params) => {
            this.companyName = params.companyName;
        });
        this.companiesService.setCurrentCompany(this.companyName);
        if (this.companiesService.allCompnaiesListContains(this.companyName)) {
            this.router.navigate(['page-not-found'], {relativeTo: this.activatedRoute});
        }
    }

    loadBackoffice() {
        this.router.navigate(['back-office'], {relativeTo: this.activatedRoute});
    }
}
