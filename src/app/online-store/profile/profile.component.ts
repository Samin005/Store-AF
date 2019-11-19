import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {UsersService} from '../../service/users.service';
import {LoadingService} from '../../service/loading.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    @ViewChild('phoneNo') phoneNo: ElementRef;
    @ViewChild('address') address: ElementRef;

    constructor(public authService: AuthService,
                public usersService: UsersService) {
    }

    ngOnInit() {
    }

    signIn() {
        this.authService.signInOS();
    }

    updateUserInfo() {
        LoadingService.showLoaderOS();
        this.usersService.currentUser.phoneNo = this.phoneNo.nativeElement.value;
        this.usersService.currentUser.address = this.address.nativeElement.value;
        this.usersService.currentUser.modifiedDate = new Date();
        console.log(this.usersService.currentUser);
        this.usersService.updateCurrentUser();
    }

}
