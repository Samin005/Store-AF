import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ItemsService} from '../../service/items.service';
import {Item} from '../../model/item.model';
import {CartService} from '../../service/cart.service';

@Component({
    selector: 'app-selected-item',
    templateUrl: './selected-item.component.html',
    styleUrls: ['./selected-item.component.css']
})
export class SelectedItemComponent implements OnInit {

    @ViewChild('displayImage') displayImage: ElementRef;
    quantity = 1;

    constructor(private activatedRoute: ActivatedRoute,
                public itemsService: ItemsService,
                private cartService: CartService) {
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

    addToCart(item: Item) {
        this.cartService.addToCart(item, this.quantity);
    }

}
