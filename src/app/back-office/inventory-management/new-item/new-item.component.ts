import {Component, OnInit} from '@angular/core';
import {Item} from '../../../model/item.model';
import {ItemsService} from '../../../service/items.service';

@Component({
    selector: 'app-new-item',
    templateUrl: './new-item.component.html',
    styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

    item = new Item();
    imgPaths: string;

    constructor(public itemsService: ItemsService) {
    }

    ngOnInit() {
    }

    addItem() {
        this.item.id = this.item.name;
        this.item.imgPaths = [];
        this.item.imgPaths.push(this.imgPaths);
        this.item.createDate = new Date();
        this.item.lastModified = new Date();
        this.itemsService.addItem(this.item);
    }

}
