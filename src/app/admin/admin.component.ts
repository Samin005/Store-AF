import {Component, OnInit} from '@angular/core';
import {AdminService} from '../service/admin.service';
import {merge, Observable, of, fromEvent} from 'rxjs';
import {mapTo} from 'rxjs/operators';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    public isOnline: boolean;
    online$: Observable<boolean>;
    admin$: Observable<any>;
    constructor(public adminService: AdminService) {
    }

    ngOnInit() {
        this.admin$ = this.adminService.getAdminCredentials();
        this.admin$.subscribe(admin => {
            this.adminService.userName = admin.username;
            this.adminService.password = admin.password;
            // console.table({Username: admin.username, Pass: admin.password});
        });

        // to check internet status
        this.online$ = merge(
            of(navigator.onLine),
            fromEvent(window, 'online').pipe(mapTo(true)),
            fromEvent(window, 'offline').pipe(mapTo(false))
        );
        this.online$.subscribe(status => {
            this.isOnline = status;
            // console.log('Internet connected: ' + this.isOnline);
        });
    }
}
