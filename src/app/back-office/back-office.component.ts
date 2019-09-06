import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable} from 'rxjs';
import {FirestoreService} from '../service/firestore.service';

@Component({
    selector: 'app-back-office',
    templateUrl: './back-office.component.html',
    styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent implements OnInit {
    companyID: string;
    allCompaniesList = [];
    inCompanyList = true;
    company$: Observable<any>;
    companies$: Observable<any[]>;
    // selectedFile: File = null;

    constructor(private firestoreService: FirestoreService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.companyID = params.companyID;
            this.firestoreService.setCompanyID(this.companyID);
        });
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

    findInCompanyList(companyName) {
        this.inCompanyList = this.allCompaniesList.indexOf(companyName) > -1;
    }

    // onFileSelected(event) {
    //     this.selectedFile = event.target.files[0];
    //     console.log(this.selectedFile);
    //     const fd = new FormData();
    //     fd.append('image', this.selectedFile, this.selectedFile.name);
    //     this.http.post('https://github.com/Samin005/Store-AF/tree/master/src/assets/img', fd)
    //         .subscribe(
    //             response => console.log(response),
    //             error => console.log(error)
    //         );
    // }
}
