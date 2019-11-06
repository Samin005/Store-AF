import {Component, OnInit} from '@angular/core';
import {ItemsService} from '../../../service/items.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

    constructor(public itemsService: ItemsService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {}

    ngOnInit() {}

    navigateToItem(itemID) {
        this.router.navigate([itemID], {relativeTo: this.activatedRoute})
            .catch(error => console.log(error));
    }

}
