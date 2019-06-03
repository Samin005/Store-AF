import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable} from 'rxjs';
import {FirestoreService} from '../firestore.service';
import Swal from 'sweetalert2';

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
