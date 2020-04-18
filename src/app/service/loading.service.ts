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

    static showLoaderOS() {
        Swal.fire({
            allowOutsideClick: false,
            html: '<div class="d-flex justify-content-center my-3">\n' +
            '    <div class="lds-dual-ring"></div>\n' +
            '</div>',
            showConfirmButton: false
        }).finally();
    }

    static showLoaderOSNoAnimation() {
        Swal.fire({
            allowOutsideClick: false,
            html: '<div class="d-flex justify-content-center my-3">\n' +
            '    <div class="lds-dual-ring"></div>\n' +
            '</div>',
            showConfirmButton: false,
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            hideClass: {
                popup: '',
                backdrop: ''
            }
        }).finally();
    }

    static showLoaderNoAnimation() {
        Swal.fire({
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            hideClass: {
                popup: '',
                backdrop: ''
            }
        }).finally();
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
