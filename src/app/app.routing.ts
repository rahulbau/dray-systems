import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './_auth/guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

/*
* Routing for the items feature are stored in the items module file
*/

const routes: Routes = [
    { path: '',  redirectTo: '/login', pathMatch: 'full' }, // catch all route
    { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
   

];
export const routingModule: ModuleWithProviders<any> = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' , useHash: true});
