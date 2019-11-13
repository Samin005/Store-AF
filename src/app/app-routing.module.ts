import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OnlineStoreComponent} from './online-store/online-store.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BackOfficeComponent} from './back-office/back-office.component';
import {AdminComponent} from './admin/admin.component';
import {NewCompanyComponent} from './admin/new-company/new-company.component';
import {EditCompanyComponent} from './admin/edit-company/edit-company.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {DashboardComponent} from './back-office/dashboard/dashboard.component';
import {OrdersComponent} from './back-office/orders/orders.component';
import {InventoryManagementComponent} from './back-office/inventory-management/inventory-management.component';
import {NewItemComponent} from './back-office/inventory-management/new-item/new-item.component';
import {CurrentItemsComponent} from './back-office/inventory-management/current-items/current-items.component';
import {UpdateExistingItemComponent} from './back-office/inventory-management/update-existing-item/update-existing-item.component';
import {HomeOsComponent} from './online-store/home-os/home-os.component';
import {SelectedItemComponent} from './online-store/selected-item/selected-item.component';
import {CartComponent} from './online-store/cart/cart.component';
import {CheckoutComponent} from './online-store/checkout/checkout.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'page-not-found', component: PageNotFoundComponent},
    {path: 'admin', component: AdminComponent, children: [
            {path: '', component: AdminHomeComponent},
            {path: 'newCompany', component: NewCompanyComponent},
            {path: 'editCompany', component: EditCompanyComponent}
        ]},
    {path: ':companyID/back-office', component: BackOfficeComponent, children: [
            {path: '', component: DashboardComponent},
            {path: 'orders', component: OrdersComponent},
            {path: 'inventory-management', component: InventoryManagementComponent, children: [
                    {path: '', component: CurrentItemsComponent},
                    {path: 'new-item', component: NewItemComponent},
                    {path: 'update-existing-item', component: UpdateExistingItemComponent}
                ]}
        ]},
    {path: ':companyID', component: OnlineStoreComponent, children: [
            {path: '', component: HomeOsComponent},
            {path: 'cart', component: CartComponent},
            {path: 'checkout', component: CheckoutComponent},
            {path: ':itemID', component: SelectedItemComponent}
        ]},
    {path: '**', redirectTo: 'page-not-found'}
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
