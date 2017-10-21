import { Component, Injectable, Inject, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Meta, Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as instantsearch from 'instantsearch.js';
import {connectHits} from "instantsearch.js/es/connectors/index";



import { ProductService, PubSubService, AlgoliaService } from '../../_services/index';

// import fade in animation
import { fadeInAnimation, slideUpDownAnimation } from '../../_animations/index';

declare var instantsearch: any;
declare var connectors: any;
@Component({
    moduleId: module.id.toString(),
    templateUrl: 'selectvoucher.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation, slideUpDownAnimation],

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class SelectVoucherComponent implements OnInit, OnDestroy, AfterViewInit {
    merchants: any;
    brands: any;
    brand: any;
    subscription: Subscription;

    hits:any;

    merchant: any;

    search: any;
    
    clo: string;
    query: any;

    cate:Boolean = true;

    event: EventTarget;

    hitts = new BehaviorSubject(null);

    constructor( meta: Meta, title: Title,
        private productService: ProductService,
        private pubSubService: PubSubService,
        private algoliaService: AlgoliaService,
        private route: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef) { 

            title.setTitle('Search For Voucher - Giftplush');

            meta.addTags([
                { name: 'author',   content: 'Giftplush'},
                { name: 'keywords', content: 'search for vouchers, gift vouchers, vouchers, gifts'},
                { name: 'description', content: 'Make that special person happy today send the person a Giftplush gift voucher.' },
                { name: 'og:title', content: 'Search For Voucher - Giftplush'},
                { name: 'og:description', content: 'Make that special person happy today send the person a Giftplush gift voucher.' }
            ]);

    }

    ngOnInit() {

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        /* this.subscription.unsubscribe(); */
    }

    ngAfterViewInit(){

        this.search = instantsearch({
            appId: 'APP ID',
            apiKey: 'API KEY',
            indexName: 'INDEX NAME'
        });

        this.search.addWidget(
            instantsearch.widgets.searchBox({
                container: '#searchInput',
                poweredBy: true
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
        
        let customHits = connectHits(this.renderFn);
        
        this.search.addWidget(
            customHits({
            subject: this.hitts
            }) 
        );


        this.search.start();

        console.log('ngAfterViewInit works');

        this.cdr.detectChanges();

    }

    private loadMerchants() {
        this.merchants = this.productService.getAllMerchants();
        console.log(this.merchants);
    }

    renderFn(HitsRenderingOptions) {
        
        HitsRenderingOptions.widgetParams.subject.next(HitsRenderingOptions.hits)
        
    }
    

}

interface targ { 
    tagName: any,
    closest: any,
    className: any,
    target: any
}
