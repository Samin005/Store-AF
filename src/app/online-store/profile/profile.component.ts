import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {UsersService} from '../../service/users.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    constructor(public authService: AuthService,
                public usersService: UsersService) {
    }

    ngOnInit() {
    }

    signIn() {
        this.authService.signInOS();
    }

}
