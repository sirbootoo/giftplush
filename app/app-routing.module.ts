import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent, WishlistSelectVoucherComponent, 
        ShareWishlistComponent, 
        WishlistCustomisationComponent, 
        WishlistPreviewComponent, ProductListComponent, ProductAddEditComponent,
        SelectVoucherComponent, SelectRecipientsComponent, 
        MessageComposeComponent, MessagePreviewComponent, 
        ModComponent, PlaceOrderComponent, 
        LoginComponent, AlertComponent, SignupComponent, DashboardComponent } from './_components/index';

import { AuthGuard } from './_guards/index';

import { ModResolver, MessagePreviewResolver, SignupResolver } from './_services/index';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'products',
        component: ProductListComponent,
        children: [
            { path: 'add', component: ProductAddEditComponent },
            { path: 'edit/:id', component: ProductAddEditComponent }
        ]
    },
    {
        path: 'pick',
        component: SelectVoucherComponent,
        children: [
            { path: 'mod/:id', component: ModComponent,
                resolve: {
                    merchant: ModResolver
                }
            },
            
        ]
    },
    { path: 'selectrecipients', component: SelectRecipientsComponent },
    { path: 'composemessage', component: MessageComposeComponent },
    { path: 'messagepreview', component: MessagePreviewComponent,
        resolve: {
            info: MessagePreviewResolver
        }
    },
    { path: 'placeorder', component: PlaceOrderComponent,
        resolve: {
            info: MessagePreviewResolver
        }
    },
    { path: 'wishlist', component: WishlistSelectVoucherComponent,
        children: [
            { path: 'customize', component: WishlistCustomisationComponent },
            { path: 'wishlistpreview', component: WishlistPreviewComponent },
            { path: 'sharewishlist', component: ShareWishlistComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'signup/:slug', component: SignupComponent,
        resolve: {
            signup: SignupResolver
        } 
    },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


@NgModule({ 
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [
    HomeComponent, 
ProductListComponent, 
ProductAddEditComponent, 
SelectVoucherComponent, 
SelectRecipientsComponent,
ModComponent,
MessageComposeComponent,
MessagePreviewComponent,
PlaceOrderComponent,
WishlistSelectVoucherComponent,
WishlistCustomisationComponent,
WishlistPreviewComponent,
ShareWishlistComponent,
LoginComponent,
AlertComponent,
SignupComponent,
DashboardComponent];