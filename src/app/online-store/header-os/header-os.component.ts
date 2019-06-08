import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {FirestoreService} from '../../firestore.service';

@Component({
    selector: 'app-header-os',
    templateUrl: './header-os.component.html',
    styleUrls: ['./header-os.component.css']
})
export class HeaderOSComponent implements OnInit {

    companyID: string;
    company$: Observable<any>;

    constructor(private firestoreService: FirestoreService) {
    }

    ngOnInit() {
        this.companyID = this.firestoreService.getCompanyID();
        this.company$ = this.firestoreService.company$;
    }

}
