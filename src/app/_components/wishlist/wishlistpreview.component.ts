import { Component, Injectable, Inject, OnInit, OnDestroy, AfterViewInit,
     style, state, animate, transition, trigger } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService, PubSubService, AlgoliaService, WishlistService, AuthenticateService } from '../../_services/index';

// import fade in animation
import { fadeInAnimation, slideUpDownAnimation } from '../../_animations/index';


@Component({
    moduleId: module.id.toString(),
    providers: [AlgoliaService],
    templateUrl: 'wishlistpreview.component.html',

    // make fade in and FLyIn animations available to this component

    animations: [ fadeInAnimation,
        trigger('flyInOut', [
          state('in', style({transform: 'translateX(0)'})),
          transition('void => *', [
            style({transform: 'translateX(-100%)'}),
            animate(100)
          ]),
          transition('* => void', [
            animate(100, style({transform: 'translateX(100%)'}))
          ])
        ]),
        trigger('slidin', [
            state('inactive', style({opacity: 1, transform: 'translateX(0) scale(1)'})),
            state('active',   style({opacity: 1, transform: 'translateX(0) scale(1)'})),
            state('void',   style({opacity: 0, display: 'none', transform: 'translateX(0) scale(1)'})),
            transition('* => void', [
                animate('.1s ease-out', style({
                    opacity: 0,
                    transform: 'translateX(0) scale(0.5)'
                }))
            ])
        ])
      ],

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class WishlistPreviewComponent implements OnInit, OnDestroy {
    wishlist: any = [];
    wishlistInfo: any;
    edit: any = false;
    subscription: Subscription;
    list: any = {};
    otherInfo: any;
    loggedIn: any;

    constructor(private wishlistService: WishlistService,
        private productService: ProductService,
        private pubSubService: PubSubService,
        private algoliaService: AlgoliaService,
        private router: Router,
        private auth: AuthenticateService) { 

    }

    delete(id: number) {
        this.wishlistService.delete(id);
        console.log('delete');
        this.loadWishlist();
    }

    ngOnInit() {
        this.loadWishlist();

        // reload products when updated
        this.subscription = this.pubSubService.on('products-updated').subscribe(() => this.loadWishlist());
    }

    ngOnDestroy() { 
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    private loadWishlist() {
        this.wishlist = this.wishlistService.getItems();
        this.wishlistInfo = this.wishlistService.getWishlistInfo();
        console.log(this.wishlist);
    }

    editThis(id: any){
        
        this.edit = true;
        let arrlist = this.wishlistService.getById(id);
        this.otherInfo = JSON.parse(localStorage.getItem('wishlistInfo'));

        this.list = arrlist[0];

        console.log(this.list);
        console.log(this.otherInfo);

    }

    editBack(){
        this.edit = false;
    }

    update_(form?: any){
        //console.log(form.value);

        let data = {
            merchantId: this.list.merchantId,
            priority: this.list.priority,
            amount: this.list.amount,
            purposeOfWishlist: this.otherInfo.purposeOfWishlist
        }

        // save product
        this.wishlistService.save(data); 
        
        // redirect to users view
        this.edit = false; 

        //Load Wishlist
        this.loadWishlist();

    }

    next(){
        this.loggedIn = this.auth.loggedIn;
        console.log(this.loggedIn);
        if(this.loggedIn){
            let wishlists = this.wishlistService.getAll();
            let wishlistInfos = this.wishlistService.getWishlistInfo();
    
            wishlistInfos.brands = wishlists;
    
            delete wishlistInfos.purposeOfWishlist;
    
            console.log(wishlistInfos);
    
            let loc = "/wishlist";
            
            this.wishlistService.pushToFirebase(loc, wishlistInfos);
    
            this.router.navigate(["/d/wishlist/share"]);
        }else{
            this.router.navigate(['/login'], { queryParams: { returnUrl: "/d/wishlist/share" }});
        }
        




    }
    

}