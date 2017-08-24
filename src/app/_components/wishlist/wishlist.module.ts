import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

//Wishlist Routing Module
import { WishlistRoutingModule } from './wishlist-routing.module';

//Wishlist Components
import { WishlistSelectVoucherComponent,
        ShareWishlistComponent, 
        WishlistCustomisationComponent, 
        WishlistPreviewComponent } from './index';


@NgModule({
  imports: [
    CommonModule,
    WishlistRoutingModule,
    FormsModule
  ],
  declarations: [
    WishlistSelectVoucherComponent,
    ShareWishlistComponent, 
    WishlistCustomisationComponent, 
    WishlistPreviewComponent
  ]
})
export class WishlistModule { }
