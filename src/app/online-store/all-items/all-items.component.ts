import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from '../../service/items.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {CompaniesService} from '../../service/companies.service';

@Component({
    selector: 'app-all-items',
    templateUrl: './all-items.component.html',
    styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent implements OnInit {

    displayedColumns: string[] = ['name', 'details', 'price', 'stock', 'discount', 'createDate'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(public itemsService: ItemsService,
                private companiesService: CompaniesService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.itemsService.filteredItemsSearchTable.sort = this.sort;
        this.itemsService.filteredItemsSearchTable.paginator = this.paginator;
    }

    applyFilter(event: KeyboardEvent) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.itemsService.filteredItemsSearchTable.filter = filterValue.trim().toLowerCase();

        if (this.itemsService.filteredItemsSearchTable.paginator) {
            this.itemsService.filteredItemsSearchTable.paginator.firstPage();
        }
    }

    navigateToItem(itemID) {
        this.router.navigate(['/' + this.companiesService.companyID, itemID])
            .catch(reason => console.log(reason));
    }
}
