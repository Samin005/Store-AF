import {Component, OnInit} from '@angular/core';
import {AdminService} from './admin.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    admin$: Observable<any>;
    constructor(private adminService: AdminService) {
        this.admin$ = adminService.getAdminCredentials();
    }

    ngOnInit() {
        this.admin$.subscribe(admin => {
            this.adminService.userName = admin.username;
            this.adminService.password = admin.password;
        });
    }

}
