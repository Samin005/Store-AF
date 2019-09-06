import {Component, OnInit} from '@angular/core';
import {AdminService} from '../service/admin.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
    }

}
