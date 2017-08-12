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
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("../../_services/index");
// import slide in/out animation
var index_2 = require("../../_animations/index");
var ModComponent = (function () {
    function ModComponent(meta, title, route, router, productService, pubSubService, algoliaService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.productService = productService;
        this.pubSubService = pubSubService;
        this.algoliaService = algoliaService;
        this.merchant = {};
        this.transact = {};
        this.loading = false;
        this.route.data.subscribe(function (data) {
            console.log(data);
            _this.merchant = data.merchant[0];
            console.log(_this.merchant);
        });
        title.setTitle(this.merchant.company + " - Giftplush");
        meta.addTags([
            { name: 'author', content: 'Giftplush' },
            { name: 'keywords', content: this.merchant.company + ', ' + this.merchant.company + ' vouchers,' + this.merchant.company + ' gift vouchers' },
            { name: 'description', content: this.merchant.about }
        ]);
    }
    ModComponent.prototype.ngOnInit = function () {
    };
    ModComponent.prototype.saveTransaction = function (modForm) {
        this.loading = true;
        console.log(modForm.controls);
        this.transact = {
            company: modForm.controls.company.value,
            address: modForm.controls.address.value,
            price: modForm.controls.price.value
        };
        console.log(this.transact);
        this.algoliaService.setTransaction(this.transact);
        this.router.navigate(["/selectrecipients"]);
        // publish event so list controller can refresh
        this.pubSubService.publish('transaction-updated');
    };
    return ModComponent;
}());
ModComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        templateUrl: 'mod.component.html',
        // make slide in/out animation available to this component
        animations: [index_2.slideInOutAnimation],
        // attach the slide in/out animation to the host (root) element of this component
        host: { '[@slideInOutAnimation]': '' }
    }),
    __metadata("design:paramtypes", [platform_browser_1.Meta, platform_browser_1.Title,
        router_1.ActivatedRoute,
        router_1.Router,
        index_1.ProductService,
        index_1.PubSubService,
        index_1.AlgoliaService])
], ModComponent);
exports.ModComponent = ModComponent;
//# sourceMappingURL=mod.component.js.map