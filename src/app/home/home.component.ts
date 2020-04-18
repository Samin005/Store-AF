import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {CompaniesService} from '../service/companies.service';
import {LoadingService} from '../service/loading.service';
import {FirestoreService} from '../service/firestore.service';
import Typed from 'typed.js';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = 'Store-AF';
    typedOptions: object = {};
    typewriterText1 = 'Hi';
    typewriterText2 = 'Welcome to ' + this.title;
    typewriterText3 = 'This is an application to get you started for any kind of business';
    typewriterText4 = 'You will be provided with an online-shop along with a back-office to sell your products and keep track of your business';

    constructor(public companiesService: CompaniesService,
                private firestoreService: FirestoreService,
                private router: Router) {
    }

    ngOnInit() {
        LoadingService.showLoader();
        this.companiesService.setCompanies();

        // setting up typed.js
        this.setOptionsForTyped();
        const typed = new Typed('.typedText', this.typedOptions);
        typed.start();  // not needed, only did it to avoid warning
    }

    setOptionsForTyped() {
        this.typedOptions = {
            strings: [this.typewriterText1, this.typewriterText2, this.typewriterText3, this.typewriterText4],
            typeSpeed: 40,
            backSpeed: 10,
            backDelay: 2000,
            showCursor: true,
            cursorChar: '_',
            loop: true
        };
    }

    loadOnlineStore(companyID: any) {
        this.router.navigate(['/' + companyID])
            .catch((error) => console.log(error));
    }

}
