import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CompaniesService} from '../../service/companies.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {UsersService} from '../../service/users.service';
import Swal from 'sweetalert2';

declare var $;

@Component({
    selector: 'app-layout-bo',
    templateUrl: './layout-bo.component.html',
    styleUrls: ['./layout-bo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutBoComponent implements OnInit {

    constructor(public companiesService: CompaniesService,
                public angularFireAuth: AngularFireAuth,
                public usersService: UsersService) {
    }

    ngOnInit() {
        // Toggle the side navigation
        $('#sidebarToggleTop').on('click', () => {
            $('body').toggleClass('sidebar-toggled');
            $('.sidebar').toggleClass('toggled');
            $('#fixedSidebar').toggleClass('position-sticky');
            if ($('.sidebar').hasClass('toggled')) {
                $('.sidebar .collapse').collapse('hide');
            }
        });
        $('#sidebarToggle').on('click', () => {
            $('body').toggleClass('sidebar-toggled');
            $('.sidebar').toggleClass('toggled');
            if ($('.sidebar').hasClass('toggled')) {
                $('.sidebar .collapse').collapse('hide');
            }
        });

        // Scroll to top button appear
        $(document).on('scroll', function() {
            const scrollDistance = $(this).scrollTop();
            if (scrollDistance > 100) {
                $('.scroll-to-top').fadeIn();
            } else {
                $('.scroll-to-top').fadeOut();
            }
        });
    }

    navigateToTop() {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    navigateToColors() {
        window.scroll({
            top: $('#colorsContainer').offset().top,
            behavior: 'smooth'
        });
    }

    scrollDown() {
        window.scroll({
            top: 500,
            behavior: 'smooth'
        });
    }

    showUtilitiesCollapseItemsOnSmallScreen() {
        if ($('#collapseUtilities').attr('class') === 'collapse') {
            $('#fixedSidebar').css('overflow-y', 'visible');
        } else {
            $('#fixedSidebar').css('overflow-y', 'scroll');
        }
    }

    showComponentsCollapseItemsOnSmallScreen() {
        if ($('#collapseTwo').attr('class') === 'collapse') {
            $('#fixedSidebar').css('overflow-y', 'visible');
        } else {
            $('#fixedSidebar').css('overflow-y', 'scroll');
        }
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
                this.usersService.authorizedUser = false;
                Swal.close();
            }).catch(reason => {
            Swal.fire({
                type: 'error',
                title: 'Sign Out Failed...',
                text: reason
            }).finally();
        });
    }
}
