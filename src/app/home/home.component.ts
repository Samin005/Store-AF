import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {CompaniesService} from '../companies.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = 'Store-AF';
    companies: Observable<any[]>;
    myStyle: object = {};
    myParams: object = {};
    width = 100;
    height = 100;
    typewriterText1 = 'Hi';
    typewriterText2 = 'Welcome to ' + this.title;
    typewriterText3 = 'This is an application for any kind of business';
    typewriterText4 = 'You will get an online shop and a back office to keep track of your business';
    typewriterText = this.typewriterText1;
    eraseLine = false;
    // topClients;
    // sugarlockCompany: Observable<any>;


    constructor(private db: AngularFirestore,
                private router: Router,
                private companiesService: CompaniesService) {
    }

    ngOnInit() {
        this.companies = this.db.collection('companies').valueChanges();
        // console.log('home: ');
        // console.log(this.companiesService.allCompaniesList);
        // this.companiesService.setAllCompaniesList(this.db);
        // this.topClients = this.firestoreService.getCompany('Sugarlock');
        // this.sugarlockCompany = this.firestoreService.getSugarlock();
        // this.firestoreService.getSugarlockDetails();
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

    onComplete() {
        setTimeout(() => {
            this.eraseLine = !this.eraseLine;
            if (this.typewriterText === this.typewriterText1) {
                this.typewriterText = this.typewriterText2;
            } else if (this.typewriterText === this.typewriterText2) {
                this.typewriterText = this.typewriterText3;
            } else if (this.typewriterText === this.typewriterText3) {
                this.typewriterText = this.typewriterText4;
            } else {
                this.typewriterText = this.typewriterText1;
            }
        }, 2000);
    }

    loadOnlineStore(companyName: any) {
        this.companiesService.setCurrentCompany(companyName);
        this.router.navigate(['/' + companyName])
            .catch((error) => console.log(error))
            .then((result) => console.log(result));
    }
}
