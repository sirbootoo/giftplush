import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {ShareModule} from 'ng2share/share.module';
import { ClipboardModule } from 'ngx-clipboard';

//Wishlist Routing Module
import { WishlistRoutingModule } from './wishlist-routing.module';

//Wishlist Components
import { WishlistSelectVoucherComponent,
        ShareWishlistComponent, 
        WishlistCustomisationComponent, 
        WishlistPreviewComponent } from './index';
import { ShowComponent } from './show.component';


@NgModule({
  imports: [
    CommonModule,
    WishlistRoutingModule,
    FormsModule,
    ShareModule,
    ClipboardModule
  ],
  declarations: [
    WishlistSelectVoucherComponent,
    ShareWishlistComponent, 
    WishlistCustomisationComponent, 
    WishlistPreviewComponent, ShowComponent
  ]
})
export class WishlistModule { }
