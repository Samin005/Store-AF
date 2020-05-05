import {Injectable} from '@angular/core';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {DatePipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {FirestoreService} from './firestore.service';
import {CompaniesService} from './companies.service';
import {LoadingService} from './loading.service';
import {Item} from '../model/item.model';
import Swal from 'sweetalert2';

declare var $;

@Injectable({
    providedIn: 'root'
})
export class ItemsService {
    itemsCollection: AngularFirestoreCollection;
    currentItemsDataset = [];
    currentItemsDtTable;
    companyItems;
    filteredItems = [];
    filteredItemsSearchTable = new MatTableDataSource([]);
    companyItemsLoadingComplete = false;
    tempItems;
    selectedItemID;
    selectedItem;
    selectedItemExists = true;

    constructor(private companiesService: CompaniesService,
                private firestoreService: FirestoreService,
                private afStorage: AngularFireStorage,
                private datePipe: DatePipe) {
        this.itemsCollection = firestoreService.getCompanyItemsCollection(companiesService.companyID);
        this.currentItemsDtTable = $('#dataTable').DataTable();
        this.selectedItem = new Item();
    }

    addItem(newItem) {
        LoadingService.showLoaderNoAnimation();
        this.itemsCollection.doc(newItem.id).set(Object.assign({}, newItem))
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Added!',
                    html: 'Successfully added new company: <b>' + newItem.id + '</b>',
                    timer: 3000
                }).finally();
            })
            .catch(reason => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: reason.message
                }).finally();
            });
    }

    setAllItemsByCompanyID(companyID, inBO: boolean) {
        this.companyItemsLoadingComplete = false;
        this.firestoreService.getCompanyItemsObservable(companyID).subscribe((items) => {
            if (items.length === 0) {
                this.companyItems = items;
                this.companyItemsLoadingComplete = true;
                this.selectedItemExists = false;
            } else {
                this.tempItems = items;
                // setting mat autocomplete data
                this.filteredItems = this.companyItems;
            }
            let itemsCount = 0;
            this.currentItemsDataset = [];
            items.forEach((item: Item, itemIndex) => {
                let imgPathCount = 0;
                let imgPathsString = '';
                item.imgPaths.forEach((imgPaths, imgIndex) => {
                    this.afStorage.ref(imgPaths).getDownloadURL().subscribe((imgPath) => {
                        imgPathsString = imgPathsString + '<img src="' + imgPath + '" width="40" alt="' + item.name + ' image">';
                        imgPathCount++;
                        this.tempItems[itemIndex].imgPaths[imgIndex] = imgPath;
                        if (imgPathCount === item.imgPaths.length) {
                            itemsCount++;
                            if (itemsCount === items.length) {
                                this.companyItems = this.tempItems;
                                if (this.selectedItemID !== undefined) {
                                    this.setSelectedItemIfExists(this.selectedItemID);
                                }
                                this.companyItemsLoadingComplete = true;

                                // setting filter items for advanced search
                                this.setFilteredItemsSearchTable(items);
                            }
                            if (inBO) {
                                this.currentItemsDataset.push([item.name, imgPathsString, item.details, item.stock, this.datePipe.transform(item.lastModified.toDate(), 'dd MMM y, h:mm:ss a'), item.price]);
                                this.updateDtTable();
                            }
                        }
                    });
                });
            });
        });
    }

    // setting up current-items datatable
    initializeDtTable() {
        this.currentItemsDtTable = $('#dataTable').DataTable({
            dom: 'lfBtipr',
            data: this.currentItemsDataset,
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

    updateDtTable() {
        this.currentItemsDtTable.clear();
        this.currentItemsDtTable.rows.add(this.currentItemsDataset);
        this.currentItemsDtTable.draw();
    } // done with current-items datatable

    setSelectedItemIfExists(itemID) {
        if (this.companyItems !== undefined) {
            this.companyItems.forEach((item: Item) => {
                if (item.id === itemID) {
                    this.selectedItem = item;
                    this.selectedItemExists = true;
                }
            });
            if (this.selectedItem.id === undefined) {
                this.selectedItemExists = false;
            }
        }
    }

    updateFilteredItems(inputValue) {
        this.filteredItems = this.companyItems.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()));
    }

    setFilteredItemsSearchTable(items) {
        this.filteredItemsSearchTable.data = items;
        this.filteredItemsSearchTable.filterPredicate = (data: Item, filter) => {
            const tableData = {name: data.name, details: data.details, price: data.price, stock: data.stock, discount: data.discount, createDate: this.datePipe.transform(data.createDate.toDate())};
            const dataStr = JSON.stringify(tableData).toLowerCase();
            return dataStr.indexOf(filter) !== -1;
        };
    }
}
