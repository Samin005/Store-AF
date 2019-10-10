import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../../service/companies.service';

declare var $;

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    dtTable;
    constructor(public companiesService: CompaniesService) {
    }

    ngOnInit() {
        this.dtTable = $('#dataTable').DataTable({
            dom: 'lfBtipr',
            buttons: [
                {
                    extend: 'copyHtml5',
                    text: '<i class="fas fa-copy"></i> Copy</button>',
                    titleAttr: 'Copy',
                    className: 'btn btn-primary-custom',
                    title: this.companiesService.company.name
                },
                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i> Excel</button>',
                    titleAttr: 'Excel',
                    className: 'btn btn-primary-custom',
                    title: this.companiesService.company.name
                },
                {
                    extend: 'pdfHtml5',
                    text: '<i class="fas fa-file-pdf"></i> PDF</button>',
                    titleAttr: 'PDF',
                    className: 'btn btn-primary-custom',
                    title: this.companiesService.company.name
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fas fa-file-csv"></i> CSV</button>',
                    titleAttr: 'CSV',
                    className: 'btn btn-primary-custom',
                    title: this.companiesService.company.name
                },
                {
                    extend: 'print',
                    text: '<i class="fas fa-print"></i> Print</button>',
                    titleAttr: 'Print',
                    className: 'btn btn-primary-custom',
                    title: this.companiesService.company.name
                }
            ],
            footerCallback() {
                const api = this.api();

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
                    .column(5, {page: 'current'})
                    .data()
                    .reduce((a, b) => {
                        return intVal(a) + intVal(b);
                    }, 0);

                // Update footer
                $(api.column(5).footer()).html(
                    '$' + pageTotal + '<br>( $' + total + ' Total )'
                );
            }
        });

        // setting today for toDate
        $('#toDate').val(new Date().toISOString().substring(0, 10));

        // date-range search function
        $.fn.dataTableExt.afnFiltering.push((settings, data, dataIndex) => {
            let min = $('#fromDate').val();
            let max = $('#toDate').val();
            let startDate = new Date(data[4]).toISOString().substring(0, 10);

            min = min.substring(0, 4) + min.substring(5, 7) + min.substring(8, 10);
            max = max.substring(0, 4) + max.substring(5, 7) + max.substring(8, 10);
            startDate = startDate.substring(0, 4) + startDate.substring(5, 7) + startDate.substring(8, 10);

            if (min === '' && max === '') { return true; }
            if (min === '' && startDate <= max) { return true; }
            if (max === '' && startDate >= min) { return true; }
            if (startDate <= max && startDate >= min) { return true; }
            return false;
        });
        $('#fromDate, #toDate').change(() => {
            console.log('drawing table');
            this.dtTable.draw();
        });
    }

}
