import {Component, ViewEncapsulation} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {fromEvent, merge, Observable, of} from 'rxjs';
import {mapTo} from 'rxjs/operators';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    online$: Observable<boolean>;
    connectionWasLost = false;

    constructor(private snackbar: MatSnackBar) {
        this.checkInternetStatus();
    }

    checkInternetStatus() {
        this.online$ = merge(
            of(navigator.onLine),
            fromEvent(window, 'online').pipe(mapTo(true)),
            fromEvent(window, 'offline').pipe(mapTo(false))
        );

        this.online$.subscribe(status => {
            if (!status) {
                this.connectionWasLost = true;
                this.showSnackbarDisconnected();
            } else {
                if(this.connectionWasLost) {
                    this.showSnackbarConnected();
                }
            }
        });
    }

    showSnackbarDisconnected() {
        this.snackbar.open('Internet disconnected...', '', {
            duration: Infinity,
            panelClass: ['snackbar-red']
        });
    }

    showSnackbarConnected() {
        this.snackbar.open('Internet Connected!', '', {
            duration: 2000,
            panelClass: ['bg-success']
        });
    }

}
