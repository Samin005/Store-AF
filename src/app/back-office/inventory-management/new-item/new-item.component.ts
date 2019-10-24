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

    constructor(public itemsService: ItemsService) {
    }

    ngOnInit() {
        // Add the following code if you want the name of the file appear on select
        $('.custom-file-input').on('change', function() {
            const fileName = $(this).val().split('\\').pop();
            $(this).siblings('.custom-file-label').addClass('selected').html(fileName);
        });
    }

    addItem() {
        this.item.id = this.item.name;
        this.item.imgPaths = [];
        const imgList = $('#imgPaths')[0].files;
        for (const img of imgList) {
            this.item.imgPaths.push(img.name);
        }
        this.item.createDate = new Date();
        this.item.lastModified = new Date();
        this.itemsService.addItem(this.item);
    }

}
