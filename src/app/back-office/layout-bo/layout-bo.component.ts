import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CompaniesService} from '../../service/companies.service';

declare var $;

@Component({
    selector: 'app-layout-bo',
    templateUrl: './layout-bo.component.html',
    styleUrls: ['./layout-bo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutBoComponent implements OnInit {

    constructor(public companiesService: CompaniesService) {
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
}
