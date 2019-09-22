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

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'page-not-found', component: PageNotFoundComponent},
    {path: 'admin', component: AdminComponent, children: [
            {path: '', component: AdminHomeComponent},
            {path: 'newCompany', component: NewCompanyComponent},
            {path: 'editCompany', component: EditCompanyComponent}
        ]},
    {path: ':companyID', component: OnlineStoreComponent},
    {path: ':companyID/back-office', component: BackOfficeComponent, children: [
            {path: '', component: DashboardComponent}
        ]},
    {path: '**', redirectTo: 'page-not-found'}
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
