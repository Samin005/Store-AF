import {Component, OnInit} from '@angular/core';

declare var tsParticles;

@Component({
    selector: 'app-ts-particles',
    templateUrl: './ts-particles.component.html',
    styleUrls: ['./ts-particles.component.css']
})
export class TsParticlesComponent implements OnInit {

    myStyle: object = {};
    myParams: object = {};

    constructor() {
    }

    ngOnInit(): void {
        this.setStyleForParticles();
        this.setParamsForParticles();
        tsParticles.load('particlesDiv', this.myParams, null);
    }

    setStyleForParticles() {
        this.myStyle = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            // 'z-index': -1,
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

}
