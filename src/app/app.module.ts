import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ParticlesModule} from 'angular-particle';
import {TypingAnimationModule} from 'angular-typing-animation';
import {environment} from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { OnlineStoreComponent } from './online-store/online-store.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderOSComponent } from './online-store/header-os/header-os.component';
import { SlideshowComponent } from './online-store/slideshow/slideshow.component';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        OnlineStoreComponent,
        BackOfficeComponent,
        PageNotFoundComponent,
        HeaderOSComponent,
        SlideshowComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ParticlesModule,
        TypingAnimationModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
