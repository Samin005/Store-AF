import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CompaniesService} from '../../service/companies.service';

@Component({
    selector: 'app-slideshow',
    templateUrl: './slideshow.component.html',
    styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

    constructor(private companiesService: CompaniesService) {}

    ngOnInit() {}

}
