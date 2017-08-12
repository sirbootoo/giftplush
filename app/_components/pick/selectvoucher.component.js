"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var index_1 = require("../../_services/index");
// import fade in animation
var index_2 = require("../../_animations/index");
var SelectVoucherComponent = (function () {
    function SelectVoucherComponent(meta, title, productService, pubSubService, algoliaService, route, router) {
        this.productService = productService;
        this.pubSubService = pubSubService;
        this.algoliaService = algoliaService;
        this.route = route;
        this.router = router;
        title.setTitle('Search For Voucher - Giftplush');
        meta.addTags([
            { name: 'author', content: 'Giftplush' },
            { name: 'keywords', content: 'search for vouchers, gift vouchers, vouchers, gifts' },
            { name: 'description', content: 'Make that special person happy today send the person a Giftplush gift voucher.' },
            { name: 'og:title', content: 'Search For Voucher - Giftplush' },
            { name: 'og:description', content: 'Make that special person happy today send the person a Giftplush gift voucher.' }
        ]);
    }
    SelectVoucherComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.algoliaService.getMerchants()
            .subscribe(function (data) {
            console.log(data);
            _this.hits = data;
            _this.merchant = _this.algoliaService.setbrandds(_this.hits);
            console.log(_this.merchant);
        }, function (error) {
            console.log(error);
        });
        // reload products when updated
        this.subscription = this.pubSubService.on('transactions-updated').subscribe(function () { return _this.loadMerchants(); });
    };
    SelectVoucherComponent.prototype.ngOnDestroy = function () {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    };
    SelectVoucherComponent.prototype.ngAfterViewInit = function () {
        this.search = instantsearch({
            appId: 'BEIACNUX0H',
            apiKey: 'c4d9810352b9bd42d0a6975265330624',
            indexName: 'giftplush_merchants'
        });
        this.search.addWidget(instantsearch.widgets.searchBox({
            container: '#searchInput',
            poweredBy: true
        }));
        this.search.addWidget(instantsearch.widgets.hits({
            container: '#hits',
            hitsPerPage: 8,
            cssClasses: {
                root: 'row brandlist',
                item: 'col-3 col-sm-3'
            },
            templates: {
                item: "            \n            <div class=\"hit\">\n                <a class=\"acard\" routerLink=\"/pick/mod/{{id}}\" ng-reflect-router-link=\"/pick/mod/{{id}}\" [href]=\"/pick/mod/{{id}}\">\n                    <div class=\"card\">\n                    <img class=\"card-img-top img-fluid\" src=\"{{profile_img}}\" alt=\"{{company}} Gift Voucher\">\n                    <div class=\"card-block\">\n                        <p class=\"card-text\">{{company}} Gift Voucher</p>\n                    </div>\n                    </div>\n                </a>\n            </div>\n            \n            ",
                empty: '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>'
            }
        }));
        this.search.addWidget(instantsearch.widgets.pagination({
            container: '#pagination',
            showFirstLast: false,
            cssClasses: {
                root: 'pagination justify-content-center',
                active: 'active',
                item: 'page-item',
                link: 'page-link'
            }
        }));
        this.search.addWidget(instantsearch.widgets.refinementList({
            container: '#brands',
            attributeName: 'category',
            operator: 'and',
            limit: 5,
            showMore: {
                limit: 7
            },
            templates: {
                item: " <div class=\"filter-list\" [class.no-results]=\"{{length === 0}}\">\n                                <p *ngFor=\"let facet of facets\" [class.active]=\"{{isRefined}}\" >\n                                    <label class=\"custom-control custom-checkbox\">\n                                    <input type=\"checkbox\" class=\"custom-control-input\" [name]=\"{{name}}\">\n                                    <span class=\"custom-control-indicator\"></span>\n                                    <span class=\"custom-control-description\">{{name}}</span>\n                                    </label>\n                                </p>\n                            </div> "
            }
        }));
        this.search.addWidget(instantsearch.widgets.menu({
            container: '#location',
            attributeName: 'location',
            limit: 10,
            templates: {
                item: " <div class=\"filter-list\" [class.no-results]=\"{{length === 0}}\">\n                                <p *ngFor=\"let facet of facets\" [class.active]=\"{{isRefined}}\" >\n                                    <label class=\"custom-control custom-checkbox\">\n                                    <input type=\"checkbox\" class=\"custom-control-input\" [name]=\"{{name}}\">\n                                    <span class=\"custom-control-indicator\"></span>\n                                    <span class=\"custom-control-description\">{{name}}</span>\n                                    </label>\n                                </p>\n                            </div> "
            }
        }));
        this.search.addWidget(instantsearch.widgets.rangeSlider({
            container: '#price',
            attributeName: 'price',
            min: '500',
            max: '500000',
            templates: {
                header: 'Price'
            },
            tooltips: {
                format: function (rawValue) {
                    return '₦' + Math.round(rawValue).toLocaleString();
                }
            }
        }));
        this.search.start();
        console.log('ngAfterViewInit works');
        document.querySelector('div#hits').addEventListener('click', function (event) {
            if ((event.target.tagName.toLowerCase() === 'img' && event.target.className === 'card-img-top img-fluid') || (event.target.tagName.toLowerCase() === 'p' && event.target.className === 'card-text') || (event.target.tagName.toLowerCase() === 'div' && event.target.className === 'card-block')) {
                this.router.navigate(["/selectrecipients"]);
                this.clo = event.target.closest(".acard").getAttribute('routerLink');
            }
        });
        this.router.navigate([this.clo]);
    };
    SelectVoucherComponent.prototype.loadMerchants = function () {
        this.merchants = this.productService.getAllMerchants();
        console.log(this.merchants);
    };
    return SelectVoucherComponent;
}());
SelectVoucherComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        providers: [index_1.AlgoliaService],
        templateUrl: 'selectvoucher.component.html',
        // make fade in animation available to this component
        animations: [index_2.fadeInAnimation, index_2.slideUpDownAnimation],
        // attach the fade in animation to the host (root) element of this component
        host: { '[@fadeInAnimation]': '' }
    }),
    __metadata("design:paramtypes", [platform_browser_1.Meta, platform_browser_1.Title,
        index_1.ProductService,
        index_1.PubSubService,
        index_1.AlgoliaService,
        router_1.ActivatedRoute,
        router_1.Router])
], SelectVoucherComponent);
exports.SelectVoucherComponent = SelectVoucherComponent;
//# sourceMappingURL=selectvoucher.component.js.map