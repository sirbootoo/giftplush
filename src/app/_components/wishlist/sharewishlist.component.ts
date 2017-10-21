import { Component, Injectable, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService, PubSubService, AlgoliaService, AuthenticateService } from '../../_services/index';

// import fade in animation
import { fadeInAnimation, slideUpDownAnimation } from '../../_animations/index';



@Component({
    moduleId: module.id.toString(),
    providers: [AlgoliaService],
    templateUrl: 'sharewishlist.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation, slideUpDownAnimation],

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class ShareWishlistComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    copied: Boolean = false;
    timer: any;
    link: any;

    constructor(
        private productService: ProductService,
        private pubSubService: PubSubService,
        private algoliaService: AlgoliaService,
        private auth: AuthenticateService,
        private router: Router) { 

            if(!this.auth.loggedIn){
                this.router.navigate(['/login'], { queryParams: { returnUrl: "/d/wishlist/share" }});
            }

            if(localStorage.getItem('wishlistLink')){
                this.link = JSON.parse(localStorage.getItem('wishlistLink'));
            }else{
                this.link = "";
            }
            

    }

    ngOnInit() {

    }

    ngOnDestroy() {
        
    }

    copyText(){
        console.log("copied");
        this.copied = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.copied = false;
        }, 2000);
    }
    

}