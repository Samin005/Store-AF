import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../../service/companies.service';

@Component({
    selector: 'app-inventory-management',
    templateUrl: './inventory-management.component.html',
    styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit {

    constructor(public companiesService: CompaniesService) {
    }

    ngOnInit() {
    }

}
