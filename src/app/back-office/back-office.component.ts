import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {CompaniesService} from '../service/companies.service';
import Swal from 'sweetalert2';
import {UsersService} from '../service/users.service';

@Component({
    selector: 'app-back-office',
    templateUrl: './back-office.component.html',
    styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent implements OnInit {
    companyID: string;
    inCompanyList = true;
    company$: Observable<any>;
    user$: Observable<any>;
    authorizedUser = false;

    constructor(public companiesService: CompaniesService,
                public usersService: UsersService,
                private activatedRoute: ActivatedRoute,
                public angularFireAuth: AngularFireAuth) {
    }

    ngOnInit() {
        Swal.showLoading();
        // checking if company exists
        this.activatedRoute.params.subscribe((params: Params) => {
            this.companyID = params.companyID;
            this.companiesService.setCompanyID(this.companyID);
            this.companiesService.getFirestoreCompanyDocById(this.companyID).get().then(docSnapshot => {
                if (!docSnapshot.exists) {
                    this.inCompanyList = false;
                }
            });
        });
        // getting company observable
        this.company$ = this.companiesService.getCompanyObservableByID(this.companyID);
        this.company$.subscribe(() => Swal.close());
        // checking if user exists
        this.angularFireAuth.user.subscribe((user) => {
            if (user != null && user.emailVerified) {
                this.usersService.getFirestoreUserDocByID(user.uid).get().then(docSnapshot => {
                    if (!docSnapshot.exists) {
                        this.usersService.addBackOfficeUser(user, this.companyID);
                    }
                });
                // checking user roles for authorization
                this.user$ = this.usersService.getUserObservableByID(user.uid);
                this.user$.subscribe(u => {
                    if (((u.companyIDBO === this.companyID || u.companyIDBO === 'Store-AF') && (u.roleBO === 'admin' || u.roleBO === 'editor')) || this.companyID === 'Demo Comp') {
                        this.authorizedUser = true;
                        console.log('authorized');
                    } else {
                        this.authorizedUser = false;
                        console.log('not authorized');
                    }
                });
            }
        });
    }

    signIn() {
        Swal.fire({
            title: 'Signing In...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        }).finally();
        this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
            Swal.close();
        }).catch(reason => {
                Swal.fire({
                    type: 'error',
                    title: 'Sign In Failed!',
                    text: reason
                }).finally();
            });
    }
    signOut() {
        Swal.fire({
            title: 'Signing Out...',
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        }).finally();
        this.angularFireAuth.auth.signOut()
            .then(() => {
                Swal.close();
            }).catch(reason => {
            Swal.fire({
                type: 'error',
                title: 'Sign Out Failed...',
                text: reason
            }).finally();
        });
    }

    // listAndFind(companyID) {
    //     this.companies$ = this.firestoreService.getCompanies();
    //     this.allCompaniesList = [];
    //     this.companies$.subscribe(items => {
    //         items.forEach(item => {
    //             this.allCompaniesList.push(item.id);
    //         });
    //         this.findInCompanyList(companyID);
    //     }, error => console.log(error),
    //         () => console.log('Complete!')
    //     );
    // }

    // findInCompanyList(companyName) {
    //     this.inCompanyList = this.allCompaniesList.indexOf(companyName) > -1;
    // }

    // onFileSelected(event) {
    //     this.selectedFile = event.target.files[0];
    //     console.log(this.selectedFile);
    //     const fd = new FormData();
    //     fd.append('image', this.selectedFile, this.selectedFile.name);
    //     this.http.post('https://github.com/Samin005/Store-AF/tree/master/src/assets/img', fd)
    //         .subscribe(
    //             response => console.log(response),
    //             error => console.log(error)
    //         );
    // }
}
