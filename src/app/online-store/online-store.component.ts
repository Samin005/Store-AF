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
    companies: Observable<any[]>;
    allCompaniesList = [];
    inCompanyList = true;
    companiesObservable: Observable<any[]>;

    constructor(private companiesService: CompaniesService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private db: AngularFirestore) {
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
        }, error => console.log(error),
            () => console.log('Complete!')
        );
    }

    findInCompanyList(companyName) {
        this.inCompanyList = this.allCompaniesList.indexOf(companyName) > -1;
    }

    loadBackOffice() {
        this.router.navigate(['back-office'], {relativeTo: this.activatedRoute})
            .catch(error => console.log(error));
    }
}
