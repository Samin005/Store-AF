import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {CompaniesService} from '../../../service/companies.service';
import {ItemsService} from '../../../service/items.service';
import {Item} from '../../../model/item.model';

declare var $;

@Component({
    selector: 'app-current-items',
    templateUrl: './current-items.component.html',
    styleUrls: ['./current-items.component.css']
})
export class CurrentItemsComponent implements OnInit {

    dtTable;
    dataset = [];

    constructor(public companiesService: CompaniesService,
                public itemsService: ItemsService,
                private afStorage: AngularFireStorage) {
        itemsService.itemsList.forEach((item: Item) => {
            this.dataset.push([item.name, '(Loading images...)', item.details, item.stock, item.lastModified.toDate().toISOString().substring(0, 10), item.price]);
        });
    }

    ngOnInit() {
        this.dtTable = $('#dataTable').DataTable({
            dom: 'lfBtipr',
            data: this.dataset,
            buttons: [
                {
                    extend: 'copyHtml5',
                    text: '<i class="fas fa-copy"></i> Copy</button>',
                    titleAttr: 'Copy',
                    className: 'btn btn-primary-custom',
                    title: this.companiesService.company.name,
                    footer: true
                },
                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i> Excel</button>',
                    titleAttr: 'Excel',
                    className: 'btn btn-primary-custom',
                    title: this.companiesService.company.name,
                    footer: true
                },
                {
                    extend: 'pdfHtml5',
                    text: '<i class="fas fa-file-pdf"></i> PDF</button>',
                    titleAttr: 'PDF',
                    className: 'btn btn-primary-custom',
                    title: this.companiesService.company.name,
                    footer: true
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fas fa-file-csv"></i> CSV</button>',
                    titleAttr: 'CSV',
                    className: 'btn btn-primary-custom',
                    title: this.companiesService.company.name,
                    footer: true
                },
                {
                    extend: 'print',
                    text: '<i class="fas fa-print"></i> Print</button>',
                    titleAttr: 'Print',
                    className: 'btn btn-primary-custom',
                    title: this.companiesService.company.name,
                    footer: true
                }
            ],
            footerCallback() {
                const api = this.api();
                const columnNumber = 5;

                // Remove the formatting to get integer data for summation
                const intVal = (i) => {
                    return typeof i === 'string' ?
                        +i.replace(/[\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                            i : 0;
                };

                // Total over all pages
                const total = api
                    .column(5)
                    .data()
                    .reduce((a, b) => {
                        return intVal(a) + intVal(b);
                    }, 0);

                // Total over this page
                const pageTotal = api
                    .column(columnNumber, {page: 'current'})
                    .data()
                    .reduce((a, b) => {
                        return intVal(a) + intVal(b);
                    }, 0);

                // Update footer
                $(api.column(columnNumber).footer()).html(
                    '$' + pageTotal + '<br>( $' + total + ' Total )'
                );
            }
        });
        this.setupDateRangeSearch();
        $('#fromDate, #toDate').change(() => {
            this.dtTable.draw();
        });

        // updating dtTable in realtime
        this.itemsService.getAllItemsObservableByComapnyID(this.companiesService.companyID).subscribe((items) => {
            this.dataset = [];
            items.forEach((item: Item) => {
                let imgPathCount = 0;
                let imgPathsString = '';
                item.imgPaths.forEach((imgPaths) => {
                    this.afStorage.ref(imgPaths).getDownloadURL().subscribe((imgPath) => {
                        imgPathsString = imgPathsString + '<img src="' + imgPath + '" width="40" alt="' + item.name + ' image">';
                        imgPathCount++;
                        if (imgPathCount === item.imgPaths.length) {
                            this.updateDatasetImagePaths(item, imgPathsString);
                        }
                    });
                });
            });
        });
    }

    setupDateRangeSearch() {
        const columnNumber = 4;
        // setting today for toDate
        $('#toDate').val(new Date().toISOString().substring(0, 10));

        // date-range search function
        $.fn.dataTableExt.afnFiltering.push((settings, data, dataIndex) => {
            let min = $('#fromDate').val();
            let max = $('#toDate').val();
            let startDate = new Date(data[columnNumber]).toISOString().substring(0, 10);

            min = min.substring(0, 4) + min.substring(5, 7) + min.substring(8, 10);
            max = max.substring(0, 4) + max.substring(5, 7) + max.substring(8, 10);
            startDate = startDate.substring(0, 4) + startDate.substring(5, 7) + startDate.substring(8, 10);

            if (min === '' && max === '') {
                return true;
            }
            if (min === '' && startDate <= max) {
                return true;
            }
            if (max === '' && startDate >= min) {
                return true;
            }
            if (startDate <= max && startDate >= min) {
                return true;
            }
            return false;
        });
    }

    updateDatasetImagePaths(item, imgPaths) {
        this.dataset.push([item.name, imgPaths, item.details, item.stock, item.lastModified.toDate().toISOString().substring(0, 10), item.price]);
        this.updateDtTable();
    }

    updateDtTable() {
        this.dtTable.clear();
        this.dtTable.rows.add(this.dataset);
        this.dtTable.draw();
    }
}
