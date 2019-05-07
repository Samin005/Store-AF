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

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        OnlineStoreComponent,
        BackOfficeComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ParticlesModule,
        TypingAnimationModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
