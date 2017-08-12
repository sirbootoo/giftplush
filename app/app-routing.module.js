"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("./_components/index");
var index_2 = require("./_guards/index");
var index_3 = require("./_services/index");
var routes = [
    { path: '', pathMatch: 'full', component: index_1.HomeComponent, canActivate: [index_2.AuthGuard] },
    {
        path: 'products',
        component: index_1.ProductListComponent,
        children: [
            { path: 'add', component: index_1.ProductAddEditComponent },
            { path: 'edit/:id', component: index_1.ProductAddEditComponent }
        ]
    },
    {
        path: 'pick',
        component: index_1.SelectVoucherComponent,
        children: [
            { path: 'mod/:id', component: index_1.ModComponent,
                resolve: {
                    merchant: index_3.ModResolver
                }
            },
        ]
    },
    { path: 'selectrecipients', component: index_1.SelectRecipientsComponent },
    { path: 'composemessage', component: index_1.MessageComposeComponent },
    { path: 'messagepreview', component: index_1.MessagePreviewComponent,
        resolve: {
            info: index_3.MessagePreviewResolver
        }
    },
    { path: 'placeorder', component: index_1.PlaceOrderComponent,
        resolve: {
            info: index_3.MessagePreviewResolver
        }
    },
    { path: 'wishlist', component: index_1.WishlistSelectVoucherComponent,
        children: [
            { path: 'customize', component: index_1.WishlistCustomisationComponent },
            { path: 'wishlistpreview', component: index_1.WishlistPreviewComponent },
            { path: 'sharewishlist', component: index_1.ShareWishlistComponent }
        ]
    },
    { path: 'login', component: index_1.LoginComponent },
    { path: 'signup/:slug', component: index_1.SignupComponent,
        resolve: {
            signup: index_3.SignupResolver
        }
    },
    { path: 'dashboard', component: index_1.DashboardComponent, canActivate: [index_2.AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
exports.routedComponents = [
    index_1.HomeComponent,
    index_1.ProductListComponent,
    index_1.ProductAddEditComponent,
    index_1.SelectVoucherComponent,
    index_1.SelectRecipientsComponent,
    index_1.ModComponent,
    index_1.MessageComposeComponent,
    index_1.MessagePreviewComponent,
    index_1.PlaceOrderComponent,
    index_1.WishlistSelectVoucherComponent,
    index_1.WishlistCustomisationComponent,
    index_1.WishlistPreviewComponent,
    index_1.ShareWishlistComponent,
    index_1.LoginComponent,
    index_1.AlertComponent,
    index_1.SignupComponent,
    index_1.DashboardComponent
];
//# sourceMappingURL=app-routing.module.js.map