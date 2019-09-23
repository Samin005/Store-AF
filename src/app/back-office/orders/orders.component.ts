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
      $('#dataTable').DataTable();
  }

}
