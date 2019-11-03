import {Component, OnInit} from '@angular/core';
import {ItemsService} from '../../../service/items.service';

declare var $;

@Component({
    selector: 'app-current-items',
    templateUrl: './current-items.component.html',
    styleUrls: ['./current-items.component.css']
})
export class CurrentItemsComponent implements OnInit {

    dtTable;

    constructor(public itemsService: ItemsService) {
    }

    ngOnInit() {
        this.itemsService.initializeDtTable();
        this.itemsService.setupDateRangeSearch();
        this.dtTable = this.itemsService.currentItemsDtTable;
        $('#fromDate, #toDate').change(() => {
            this.dtTable.draw();
        });
    }

}
