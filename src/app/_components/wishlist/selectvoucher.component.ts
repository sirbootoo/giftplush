import { Component, Injectable, Inject, OnInit, OnDestroy, AfterViewInit, AfterContentInit ,ElementRef, Renderer } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Meta, Title } from "@angular/platform-browser";

import { ProductService, PubSubService, AlgoliaService, WishlistService } from '../../_services/index';

// import fade in animation
import { fadeInAnimation, slideUpDownAnimation } from '../../_animations/index';


declare var instantsearch: any;

@Component({
    moduleId: module.id.toString(),
    providers: [AlgoliaService],
    templateUrl: 'selectvoucher.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation, slideUpDownAnimation],

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class WishlistSelectVoucherComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
    merchants: any;
    brands: any;
    brand: any;
    subscription: Subscription;
    query: any;
    btnList: any[];
    hits:any;
    merchant: any;
    search: any;
    clo:any;
    wishlistItems: any;

    constructor( meta: Meta, title: Title,
        private wishlistService: WishlistService,
        private productService: ProductService,
        private pubSubService: PubSubService,
        private algoliaService: AlgoliaService, public el: ElementRef, public renderer: Renderer) { 

            title.setTitle('Wishlist - Giftplush');

            meta.addTags([
            { name: 'author',   content: 'Giftplush'},
            { name: 'keywords', content: 'wishlist, weddings wishlist, birthday wishlist, gifts'},
            { name: 'description', content: "Tired of getting gifts you don't need ? Giftplush wishlist helps you eradicate unneeded gifts" }
            ]);

    }

    ngOnInit() {

        this.loadList();

        

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        // this.subscription.unsubscribe();
    }

    ngAfterViewInit(){

        this.search = instantsearch({
            appId: 'BEIACNUX0H',
            apiKey: 'c4d9810352b9bd42d0a6975265330624',
            indexName: 'giftplush_merchants'
        });

        this.search.addWidget(
            instantsearch.widgets.searchBox({
                container: '#searchInput',
                poweredBy: true
            })
        );

        this.search.addWidget(
            instantsearch.widgets.hits({
                container: '#hits',
                hitsPerPage: 8,
                cssClasses: {
                root: 'row brandlist',
                item: 'col-3 col-sm-3'
                },
                templates: {
                item: `            
            <div class="hit">
                <a  class="cardBox" id="card{{id}}" info='{"merchantId": "{{id}}", "merchantName": "{{company}}", "profile_img": "{{profile_img}}" }'>
                    <div class="card">
                    <img class="card-img-top img-fluid" src="{{profile_img}}" alt="{{company}} Gift Voucher">
                    <div class="card-block">
                        <p class="card-text">{{company}} Gift Voucher</p>
                    </div>
                    </div>
                </a>
            </div>
            
            `,
                empty: '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>'
                }
            })
        );

        this.search.addWidget(
            instantsearch.widgets.pagination({
                container: '#pagination',
                showFirstLast: false,
                cssClasses: {
                root: 'pagination justify-content-center',
                active: 'active',
                item: 'page-item',
                link: 'page-link'
                }
            })
        );


        this.search.addWidget(
            instantsearch.widgets.refinementList({
                container: '#brands',
                attributeName: 'category',
                operator: 'and',
                limit: 5,
                showMore: {
                    limit: 7
                },
                templates: {
                    item: ` <div class="filter-list" [class.no-results]="{{length === 0}}">
                                <p *ngFor="let facet of facets" [class.active]="{{isRefined}}" >
                                    <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" [name]="{{name}}">
                                    <span class="custom-control-indicator"></span>
                                    <span class="custom-control-description">{{name}}</span>
                                    </label>
                                </p>
                            </div> ` 
                }
            })
        );

        this.search.addWidget(
            instantsearch.widgets.menu({
                container: '#location',
                attributeName: 'location',
                limit: 10,
                templates: {
                    item: ` <div class="filter-list" [class.no-results]="{{length === 0}}">
                                <p *ngFor="let facet of facets" [class.active]="{{isRefined}}" >
                                    <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" [name]="{{name}}">
                                    <span class="custom-control-indicator"></span>
                                    <span class="custom-control-description">{{name}}</span>
                                    </label>
                                </p>
                            </div> ` 
                }
            })
        );

        this.search.addWidget(
            instantsearch.widgets.rangeSlider({
                container: '#price',
                attributeName: 'price',
                min: '500',
                max: '500000',
                templates: {
                header: 'Price'
                },
                tooltips: {
                format: function(rawValue:any) {
                    return '₦' + Math.round(rawValue).toLocaleString();
                }
                }
            })
        );

        this.search.start();

        console.log('ngAfterViewInit works');

        // Vanilla Javascript for selecting items in wishlist merchant search

            document.querySelector('div#hits').addEventListener('click', function(event) {
                let evnt:any = event.target;
                if ((evnt.tagName.toLowerCase() === 'img' && evnt.className === 'card-img-top img-fluid') || (evnt.tagName.toLowerCase() === 'p' && evnt.className === 'card-text') || (evnt.tagName.toLowerCase() === 'div' && evnt.className === 'card-block' )) {
                    
                    var tco = []; 

                    var slo = evnt.closest(".cardBox").getAttribute('info');

                    var slc = JSON.parse(slo);

                    var wshl = JSON.parse(localStorage.getItem('wishlist')) || [];

                    if(wshl.find(item => item.merchantId === slc.merchantId)){

                        for (var i = 0; i < wshl.length; i++) {
                            if (wshl[i].merchantId === slc.merchantId) {
                                wshl[i] = slc;
                                break;
                            }
                        }

                        wshl.push(slc);

                        localStorage.setItem('wishlist', JSON.stringify(wshl));

                        console.log('wishlist: '+wshl);

                    }else{

                        wshl.push(slc);

                        localStorage.setItem('wishlist', JSON.stringify(wshl));

                    }

                    console.log(slc);

                    

                }
            });

        // End Vanilla Script

        

    }

    ngAfterContentInit() {
    
  }

    private loadMerchants() {
        this.merchants = this.productService.getAllMerchants();

        console.log(this.merchants);
    }

    public selectVoucher(formData: any){
        if(this.btnList.length >= 5){
            alert('Sorry You Cannot Add Moe Than 5 Vouchers To Your Wishlist At The Moment');
        }else{

            this.btnList.push(formData);

            console.log(this.btnList);

        }
        
    }

    public test(){
            console.log('test');
        }

        // public findAncestor (el:any, cls:any) {
        //     while ((el = el.parentElement) && !el.classList.contains(cls));
        //     return el;
        // }

        remove(id:any){
            this.wishlistService.delete(id);

            this.loadList();
        }

        private loadList(){
            this.wishlistItems = this.wishlistService.getAll();
        }
    

}