import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {FirestoreService} from '../../firestore.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';

@Component({
    selector: 'app-header-os',
    templateUrl: './header-os.component.html',
    styleUrls: ['./header-os.component.css']
})
export class HeaderOSComponent implements OnInit {

    companyID: string;
    company$: Observable<any>;

    constructor(private firestoreService: FirestoreService,
                private afAuth: AngularFireAuth) {
    }

    ngOnInit() {
        this.companyID = this.firestoreService.getCompanyID();
        this.company$ = this.firestoreService.company$;
    }

    signIn() {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    signOut() {
        this.afAuth.auth.signOut();
    }

}
