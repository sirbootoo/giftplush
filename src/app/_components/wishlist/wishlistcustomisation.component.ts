import { Component, Injectable, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ProductService, PubSubService, AlgoliaService } from '../../_services/index';

// import fade in animation
import { fadeInAnimation, slideUpDownAnimation } from '../../_animations/index';


@Component({
    moduleId: module.id.toString(),
    providers: [AlgoliaService],
    templateUrl: 'wishlistcustomisation.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation, slideUpDownAnimation],

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class WishlistCustomisationComponent implements OnInit, OnDestroy {
    merchants: any;
    brands: any;
    brand: any;
    subscription: Subscription;
    wishlistName: any;
    purposeOfWishlist: any;
    expires: any;
    loading: any;

    hits:any;

    merchant: any;

    search: any;

    itIsPrivate: any = 'btn btn-success';
    itIsPublic: any = 'btn btn-secondary';
    private:any = 1;
    privacyText: any = 'Only you can see this';

    constructor(
        private productService: ProductService,
        private pubSubService: PubSubService,
        private algoliaService: AlgoliaService) {  }

    ngOnInit() {

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    TogglePrivatePublic(){
        if(this.itIsPrivate === 'btn btn-success'){
            this.itIsPrivate = 'btn btn-secondary';
            this.itIsPublic = 'btn btn-success';
            this.privacyText = 'Everyone can see this';
            this.private = 0;
        }else{
            this.itIsPrivate = 'btn btn-success';
            this.itIsPublic = 'btn btn-secondary';
            this.privacyText = 'Only you can see this';
            this.private = 1;
        }
    }

    next(Form:any){
        console.log(Form.value);
    }
    

}