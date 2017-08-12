import { Component, Injectable, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ProductService, PubSubService, AlgoliaService } from '../../_services/index';

// import fade in animation
import { fadeInAnimation, slideUpDownAnimation } from '../../_animations/index';


@Component({
    moduleId: module.id.toString(),
    providers: [AlgoliaService],
    templateUrl: 'selectvoucher.component.html',

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

    hits:any;

    merchant: any;

    search: any;

    isPrivate:Boolean = true;
    isPublic:Boolean = false;
    private:any = 1;

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
        if(this.isPrivate){
            this.isPrivate = false;
            this.isPublic = true;
            this.private = 0;
        }else{
            this.isPrivate = true;
            this.isPublic = false;
            this.private = 1;
        }
    }

    next(Form:any){
        console.log(Form.value);
    }
    

}