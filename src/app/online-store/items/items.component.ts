import {Component, OnInit} from '@angular/core';
import {ItemsService} from '../../service/items.service';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

    constructor(public itemsService: ItemsService) {}

    ngOnInit() {}

    navigateToItem(itemID) {
        console.log(itemID);
    }

}
