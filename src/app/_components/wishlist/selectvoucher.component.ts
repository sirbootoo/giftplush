import { Component, Injectable, Inject, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Meta, Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as instantsearch from 'instantsearch.js';
import {connectHits} from "instantsearch.js/es/connectors/index";

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

export class WishlistSelectVoucherComponent implements OnInit, OnDestroy, AfterViewInit {
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
    hitts:any = new BehaviorSubject(null);
    items: any = {};
    selected: any;

    constructor( meta: Meta, title: Title, private router:Router,
        private wishlistService: WishlistService,
        private productService: ProductService,
        private pubSubService: PubSubService,
        private algoliaService: AlgoliaService, private cdr: ChangeDetectorRef) { 

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

        let customHits = connectHits(this.renderFn);
        
        this.search.addWidget(
            customHits({
            subject: this.hitts
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

        this.cdr.detectChanges();

        var innerEditor = document.getElementById("inner-editor") ;
        innerEditor.innerHTML = "tele";
        console.log(innerEditor.innerHTML = "tele");
        

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

        addDown(hit:any){

            this.selected = true;

            var slo = {
                merchantId: hit.id,
                profile_img: hit.profile_img,
                merchantName: hit.company 
            }

            console.log(slo);
            
            var wshl = JSON.parse(localStorage.getItem('wishlist')) || [];

            var el = wshl.filter(function(el) {
                return el.merchantId === slo.merchantId;
            });

            console.log(el.length);

            if(el.length){
                
                return true;

            }else{

                wshl.push(slo);

                localStorage.setItem('wishlist', JSON.stringify(wshl));

                this.loadList();

            }

        }

        renderFn(HitsRenderingOptions) {
            
            HitsRenderingOptions.widgetParams.subject.next(HitsRenderingOptions.hits)
            
        }

        remove(id:any){
            this.wishlistService.delete(id);

            this.loadList();
        }

        private loadList(){
            this.wishlistItems = this.wishlistService.getAll();
        }

        next(){
            this.router.navigate(["/d/wishlist/customize"]);
        }

        scroll(el:any) {
            el.scrollIntoView();
            this.selected = false;
        }

        
    

}