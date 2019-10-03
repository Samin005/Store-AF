import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor() {
    }

    static showLoader() {
        Swal.fire({
            title: 'Loading...',
            imageUrl: 'assets/img/loader.gif',
            showConfirmButton: false,
            customClass: {
                image: 'my-0'
            }
        }).finally();
    }

    static showLoaderNoAnimation() {
        Swal.fire({animation: false});
        Swal.showLoading();
    }

    static showLoaderNoEscapeNoOutsideClick() {
        Swal.fire({
            allowEscapeKey: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        }).finally();
    }

    static showLoaderNoOutsideClick() {
        Swal.fire({
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        }).finally();
    }

    static closeLoader() {
        if (Swal.isVisible()) {
            Swal.close();
        }
    }
}
