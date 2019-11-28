import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../../service/companies.service';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

    constructor(public companiesService: CompaniesService) {
    }

    ngOnInit() {
    }

}
