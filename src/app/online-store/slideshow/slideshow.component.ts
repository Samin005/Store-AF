import {Component, OnInit} from '@angular/core';
import {FirestoreService} from '../../service/firestore.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-slideshow',
    templateUrl: './slideshow.component.html',
    styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

    company$: Observable<any>;

    constructor(private firestoreService: FirestoreService) {
    }

    ngOnInit() {
        this.company$ = this.firestoreService.company$;
    }

}
