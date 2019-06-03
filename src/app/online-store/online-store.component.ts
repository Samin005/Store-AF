import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Observable} from 'rxjs';
import {FirestoreService} from '../firestore.service';
import Swal from 'sweetalert2';

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
                private firestoreService: FirestoreService) {
    }

    ngOnInit() {
        Swal.fire({
            title: 'Loading...',
            imageUrl: 'assets/img/loader.gif',
            showConfirmButton: false,
            customClass: {
                image: 'my-0'
            }
        }).finally(() => {});
        this.activatedRoute.params.subscribe((params: Params) => {
            this.companyID = params.companyID;
        });
        this.listAndFind(this.companyID);
        this.company$ = this.firestoreService.getCompany(this.companyID);
        this.company$.subscribe(() => Swal.close());
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
