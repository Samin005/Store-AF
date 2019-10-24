import {Component, OnInit} from '@angular/core';
import {Item} from '../../../model/item.model';
import {ItemsService} from '../../../service/items.service';

declare var $;

@Component({
    selector: 'app-new-item',
    templateUrl: './new-item.component.html',
    styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

    item = new Item();
    imgUrls = [];

    constructor(public itemsService: ItemsService) {
    }

    ngOnInit() {
        this.item.imgPaths = [];
    }

    updateImgPaths(event) {
        const files = event.target.files;
        if (files) {
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.imgUrls.push(e.target.result);
                };
                reader.readAsDataURL(file);
                this.item.imgPaths.push(file.name);
            }
        }
    }

    removeFromImgPaths(url) {
        const index = this.imgUrls.indexOf(url);
        if (index !== -1) {
            this.imgUrls.splice(index, 1);
            this.item.imgPaths.splice(index, 1);
        }
    }

    addItem() {
        this.item.id = this.item.name;
        this.item.createDate = new Date();
        this.item.lastModified = new Date();
        this.itemsService.addItem(this.item);
    }

}
