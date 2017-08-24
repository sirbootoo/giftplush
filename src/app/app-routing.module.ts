import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { FullLayoutComponent } from './_layouts/full-layout.component';

import { HomeComponent, ProductListComponent, ProductAddEditComponent,
        LoginComponent, AlertComponent, SignupComponent, DashboardComponent, ActivationComponent } from './_components/index';

import { AuthGuard } from './_guards/index';

import { ModResolver, MessagePreviewResolver, SignupResolver } from './_services/index';

// Routes
const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent},
    {
        path: 'products',
        component: ProductListComponent,
        children: [
            { path: 'add', component: ProductAddEditComponent },
            { path: 'edit/:id', component: ProductAddEditComponent }
        ]
    },
    {
        path: 'd',
        component: FullLayoutComponent,
        children: [
            {
                path: 'pick',
                loadChildren: './_components/pick/pick.module#PickModule'
            },
            { 
                path: 'wishlist',
                loadChildren: './_components/wishlist/wishlist.module#WishlistModule'
            }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'signup/:slug', component: SignupComponent,
        resolve: {
            signup: SignupResolver
        } 
    },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'activate/:id/:code', component: ActivationComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


@NgModule({ 
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

/* List Of Components */

export const routedComponents = [
    HomeComponent, 
ProductListComponent, 
ProductAddEditComponent,
LoginComponent,
AlertComponent,
SignupComponent,
DashboardComponent,
ActivationComponent];