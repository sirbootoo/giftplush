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
var index_1 = require("../../_services/index");
// import fade in animation
var index_2 = require("../../_animations/index");
var WishlistCustomisationComponent = (function () {
    function WishlistCustomisationComponent(productService, pubSubService, algoliaService) {
        this.productService = productService;
        this.pubSubService = pubSubService;
        this.algoliaService = algoliaService;
        this.isPrivate = true;
        this.isPublic = false;
        this.private = 1;
    }
    WishlistCustomisationComponent.prototype.ngOnInit = function () {
    };
    WishlistCustomisationComponent.prototype.ngOnDestroy = function () {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    };
    WishlistCustomisationComponent.prototype.TogglePrivatePublic = function () {
        if (this.isPrivate) {
            this.isPrivate = false;
            this.isPublic = true;
            this.private = 0;
        }
        else {
            this.isPrivate = true;
            this.isPublic = false;
            this.private = 1;
        }
    };
    WishlistCustomisationComponent.prototype.next = function (Form) {
        console.log(Form.value);
    };
    return WishlistCustomisationComponent;
}());
WishlistCustomisationComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        providers: [index_1.AlgoliaService],
        templateUrl: 'selectvoucher.component.html',
        // make fade in animation available to this component
        animations: [index_2.fadeInAnimation, index_2.slideUpDownAnimation],
        // attach the fade in animation to the host (root) element of this component
        host: { '[@fadeInAnimation]': '' }
    }),
    __metadata("design:paramtypes", [index_1.ProductService,
        index_1.PubSubService,
        index_1.AlgoliaService])
], WishlistCustomisationComponent);
exports.WishlistCustomisationComponent = WishlistCustomisationComponent;
//# sourceMappingURL=wishlistcustomisation.component.js.map