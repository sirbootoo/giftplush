import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

//Wishlist Components
import { WishlistSelectVoucherComponent,
        ShareWishlistComponent, 
        WishlistCustomisationComponent, 
        WishlistPreviewComponent } from './index';

import { ModResolver, MessagePreviewResolver, SignupResolver } from '../../_services/index';


const routes: Routes = [
  { path: '', component: WishlistSelectVoucherComponent },
  { path: 'customize', component: WishlistCustomisationComponent },
  { path: 'preview', component: WishlistPreviewComponent },
  { path: 'share', component: ShareWishlistComponent },
  { path: 'index', component: WishlistSelectVoucherComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class WishlistRoutingModule { }
