import { Component, Injectable, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Meta, Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService, PubSubService, AlgoliaService } from '../../_services/index';

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

    event: EventTarget;

    constructor( meta: Meta, title: Title,
        private productService: ProductService,
        private pubSubService: PubSubService,
        private algoliaService: AlgoliaService,
        private route: ActivatedRoute,
        private router: Router) { 

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

        this.algoliaService.getMerchants()
                .subscribe(data => {
                    console.log(data);
                    this.hits = data;

                    this.merchant = this.algoliaService.setbrandds(this.hits);
                    console.log(this.merchant);
                },
                error => {
                    console.log(error);
                });

        // reload products when updated
        this.subscription = this.pubSubService.on('transactions-updated').subscribe(() => this.loadMerchants());

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
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
                <a class="acard" routerLink="/pick/mod/{{id}}" ng-reflect-router-link="/pick/mod/{{id}}" [href]="/pick/mod/{{id}}">
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


        document.querySelector('div#hits').addEventListener('click', function(event) {
            let evnt: any= event.target;
            if ((evnt.tagName.toLowerCase() === 'img' && evnt.className === 'card-img-top img-fluid') || (evnt.tagName.toLowerCase() === 'p' && evnt.className === 'card-text') || (evnt.tagName.toLowerCase() === 'div' && evnt.className === 'card-block' )) {
                this.router.navigate(["/selectrecipients"]);
                this.clo = evnt.closest(".acard").getAttribute('routerLink');
            }
        });


        this.router.navigate([this.clo]);



    }

    private loadMerchants() {
        this.merchants = this.productService.getAllMerchants();
        console.log(this.merchants);
    }
    

}

interface targ { 
    tagName: any,
    closest: any,
    className: any,
    target: any
}