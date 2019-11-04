import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../../service/companies.service';
import {ItemsService} from '../../service/items.service';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

    constructor(public companiesService: CompaniesService,
                public itemsService: ItemsService) {
    }

    ngOnInit() {
        this.companiesService.setCompanies();
    }

    navigateToItem(itemID) {
        console.log(itemID);
    }

}
