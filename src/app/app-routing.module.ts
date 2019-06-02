import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OnlineStoreComponent} from './online-store/online-store.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BackOfficeComponent} from './back-office/back-office.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'page-not-found', component: PageNotFoundComponent},
    {path: ':companyID', component: OnlineStoreComponent},
    {path: ':companyID/back-office', component: BackOfficeComponent},
    {path: '**', redirectTo: 'page-not-found'}
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
