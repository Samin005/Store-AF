import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ItemsService} from '../../service/items.service';

@Component({
    selector: 'app-selected-item',
    templateUrl: './selected-item.component.html',
    styleUrls: ['./selected-item.component.css']
})
export class SelectedItemComponent implements OnInit {

    @ViewChild('displayImage') displayImage: ElementRef;

    constructor(private activatedRoute: ActivatedRoute,
                public itemsService: ItemsService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.itemsService.selectedItemID = params.itemID;
            this.itemsService.setSelectedItemIfExists(params.itemID);
        });
    }

    viewImage(url) {
        this.displayImage.nativeElement.src = url;
    }

}
