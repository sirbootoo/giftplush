import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

//Wishlist Components
import { WishlistSelectVoucherComponent,
        ShareWishlistComponent, 
        WishlistCustomisationComponent, 
        WishlistPreviewComponent } from './index';
        import { ShowComponent } from './show.component';

import { ModResolver, MessagePreviewResolver, SignupResolver, WishlistshowResolverService } from '../../_services/index';


const routes: Routes = [
  { path: '', component: WishlistSelectVoucherComponent },
  { path: 'customize', component: WishlistCustomisationComponent },
  { path: 'preview', component: WishlistPreviewComponent },
  { path: 'share', component: ShareWishlistComponent },
  { path: 'index', component: WishlistSelectVoucherComponent },
  { path: 'show/:slug', component: ShowComponent, 
    resolve: {
      slug: WishlistshowResolverService
    } 
  }
  
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class WishlistRoutingModule { }
