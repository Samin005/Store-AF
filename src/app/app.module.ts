import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import {AngularFireStorageModule} from '@angular/fire/storage';

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
import { SlideshowComponent } from './online-store/home-os/slideshow/slideshow.component';
import { AdminComponent } from './admin/admin.component';
import { NewCompanyComponent } from './admin/new-company/new-company.component';
import { EditCompanyComponent } from './admin/edit-company/edit-company.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { DashboardComponent } from './back-office/dashboard/dashboard.component';
import { LayoutBoComponent } from './back-office/layout-bo/layout-bo.component';
import { OrdersComponent } from './back-office/orders/orders.component';
import { InventoryManagementComponent } from './back-office/inventory-management/inventory-management.component';
import { NewItemComponent } from './back-office/inventory-management/new-item/new-item.component';
import { CurrentItemsComponent } from './back-office/inventory-management/current-items/current-items.component';
import { UpdateExistingItemComponent } from './back-office/inventory-management/update-existing-item/update-existing-item.component';
import { ItemsComponent } from './online-store/home-os/items/items.component';
import { LoadingComponent } from './online-store/loading/loading.component';
import { HomeOsComponent } from './online-store/home-os/home-os.component';
import { SelectedItemComponent } from './online-store/selected-item/selected-item.component';
import { CartComponent } from './online-store/cart/cart.component';
import { CheckoutComponent } from './online-store/checkout/checkout.component';
import { ProfileComponent } from './online-store/profile/profile.component';

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
        OrdersComponent,
        InventoryManagementComponent,
        NewItemComponent,
        CurrentItemsComponent,
        UpdateExistingItemComponent,
        ItemsComponent,
        LoadingComponent,
        HomeOsComponent,
        SelectedItemComponent,
        CartComponent,
        CheckoutComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ParticlesModule,
        TypingAnimationModule,
        AngularFirestoreModule.enablePersistence({experimentalTabSynchronization: true}),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
