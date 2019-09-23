import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('#dataTable').DataTable({
          dom: 'lBfrtip',
          buttons: [
              {
                  extend: 'copyHtml5',
                  text: '<i class="fas fa-copy"></i> Copy</button>',
                  titleAttr: 'Copy',
                  className: 'btn btn-primary-custom',
              },
              {
                  extend: 'excelHtml5',
                  text: '<i class="fas fa-file-excel"></i> Excel</button>',
                  titleAttr: 'Excel',
                  className: 'btn btn-primary-custom',
              },
              {
                  extend: 'pdfHtml5',
                  text: '<i class="fas fa-file-pdf"></i> PDF</button>',
                  titleAttr: 'PDF',
                  className: 'btn btn-primary-custom',
              },
              {
                  extend: 'csvHtml5',
                  text: '<i class="fas fa-file-csv"></i> CSV</button>',
                  titleAttr: 'CSV',
                  className: 'btn btn-primary-custom',
              },
              {
                  extend: 'print',
                  text: '<i class="fas fa-print"></i> Print</button>',
                  titleAttr: 'Print',
                  className: 'btn btn-primary-custom',
              }
          ]
      });
  }

}
