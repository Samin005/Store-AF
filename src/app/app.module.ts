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
import { AdminComponent } from './admin/admin.component';
import { NewCompanyComponent } from './admin/new-company/new-company.component';
import { EditCompanyComponent } from './admin/edit-company/edit-company.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import {FormsModule} from '@angular/forms';
import { DashboardComponent } from './back-office/dashboard/dashboard.component';
import { LayoutBoComponent } from './back-office/layout-bo/layout-bo.component';
import { OrdersComponent } from './back-office/orders/orders.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        OnlineStoreComponent,
        BackOfficeComponent,
        PageNotFoundComponent,
        HeaderOSComponent,
        SlideshowComponent,
        AdminComponent,
        NewCompanyComponent,
        EditCompanyComponent,
        AdminHomeComponent,
        DashboardComponent,
        LayoutBoComponent,
        OrdersComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ParticlesModule,
        TypingAnimationModule,
        AngularFirestoreModule.enablePersistence({experimentalTabSynchronization: true}),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
