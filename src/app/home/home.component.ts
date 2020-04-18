import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {CompaniesService} from '../service/companies.service';
import {LoadingService} from '../service/loading.service';
import {FirestoreService} from '../service/firestore.service';
import Typed from 'typed.js';

declare var tsParticles;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = 'Store-AF';
    myStyle: object = {};
    myParams: object = {};
    typedOptions: object = {};
    typewriterText1 = 'Hi';
    typewriterText2 = 'Welcome to ' + this.title;
    typewriterText3 = 'This is an application to get you started for any kind of business';
    typewriterText4 = 'You will be provided with an online-shop along with a back-office to sell your products and keep track of your business';

    constructor(public companiesService: CompaniesService,
                private firestoreService: FirestoreService,
                private router: Router) {
    }

    ngOnInit() {
        LoadingService.showLoader();
        this.companiesService.setCompanies();

        // setting up typed.js
        this.setOptionsForTyped();
        const typed = new Typed('.typedText', this.typedOptions);
        typed.start();  // not needed, only did it to avoid warning
        // setting up ts particles
        this.setStyleForParticles();
        this.setParamsForParticles();
        tsParticles.load('particlesDiv', this.myParams, null);
    }

    setOptionsForTyped() {
        this.typedOptions = {
            strings: [this.typewriterText1, this.typewriterText2, this.typewriterText3, this.typewriterText4],
            typeSpeed: 40,
            backSpeed: 10,
            backDelay: 2000,
            showCursor: true,
            cursorChar: '_',
            loop: true
        };
    }

    setStyleForParticles() {
        this.myStyle = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            'z-index': -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };
    }

    setParamsForParticles() {
        this.myParams = {
            particles: {
                number: {
                    value: 150,
                    density: {
                        enable: true
                    }
                },
                color: {
                    value: '#ff0000'
                },
                shape: {
                    type: 'triangle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    animation: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    animation: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 70,
                    color: '#ffa3a3',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                },
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onHover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        };
    }

    loadOnlineStore(companyID: any) {
        this.router.navigate(['/' + companyID])
            .catch((error) => console.log(error));
    }

}
