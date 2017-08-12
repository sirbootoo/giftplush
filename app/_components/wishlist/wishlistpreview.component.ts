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

export class WishlistPreviewComponent implements OnInit, OnDestroy {
    merchants: any;
    brands: any;
    brand: any;
    subscription: Subscription;

    hits:any;

    merchant: any;

    search: any;

    constructor(
        private productService: ProductService,
        private pubSubService: PubSubService,
        private algoliaService: AlgoliaService) { 

    }

    ngOnInit() {

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    private loadMerchants() {
        this.merchants = this.productService.getAllMerchants();
        console.log(this.merchants);
    }
    

}