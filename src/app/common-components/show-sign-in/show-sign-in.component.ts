import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
    selector: 'app-show-sign-in',
    templateUrl: './show-sign-in.component.html',
    styleUrls: ['./show-sign-in.component.css']
})
export class ShowSignInComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    signIn() {
        this.authService.signInOS();
    }

}
