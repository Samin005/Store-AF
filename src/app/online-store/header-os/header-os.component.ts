import {Component, OnInit} from '@angular/core';

import {OnlineStoreComponent} from '../online-store.component';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-header-os',
    templateUrl: './header-os.component.html',
    styleUrls: ['./header-os.component.css']
})
export class HeaderOSComponent implements OnInit {

    companyID: string;
    company$: Observable<any>;

    constructor(private onlineStoreComponent: OnlineStoreComponent) {
    }

    ngOnInit() {
        this.companyID = this.onlineStoreComponent.companyID;
        this.company$ = this.onlineStoreComponent.company$;
    }

}
