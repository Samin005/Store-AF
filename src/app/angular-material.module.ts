import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
    declarations: [],
    imports: [
        MatTableModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatSortModule
    ],
    exports: [
        MatTableModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatSortModule
    ]
})
export class AngularMaterialModule {
}
