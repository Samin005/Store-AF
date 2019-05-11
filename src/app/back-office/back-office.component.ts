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
    // selectedFile: File = null;

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
