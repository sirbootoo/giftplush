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
// import fade in animation
var index_1 = require("../../_animations/index");
var HomeComponent = (function () {
    function HomeComponent(meta, title) {
        title.setTitle('Welcome To Giftplush');
        meta.addTags([
            { name: 'author', content: 'Giftplush' },
            { name: 'keywords', content: 'search for vouchers, gift vouchers, vouchers, gifts, wishlist' },
            { name: 'description', content: 'Make that special person happy today send the person a Giftplush gift voucher.' },
            { name: 'og:title', content: 'Welcome To Giftplush Giftplush' },
            { name: 'og:description', content: 'Make that special person happy today send the person a Giftplush gift voucher.' }
        ]);
    }
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        templateUrl: 'home.component.html',
        styleUrls: ['../../_content/indexassets/css/animate.css',
            '../../_content/indexassets/css/icomoon.css',
            '../../_content/indexassets/css/simple-line-icons.css',
            '../../_content/indexassets/css/owl.carousel.min.css',
            '../../_content/indexassets/css/owl.theme.default.min.css',
            '../../_content/indexassets/css/bootstrap.css',
            '../../_content/indexassets/css/style.css',
            '../../_content/indexassets/css/custom.css'
        ],
        // make fade in animation available to this component
        animations: [index_1.fadeInAnimation],
        // attach the fade in animation to the host (root) element of this component
        host: { '[@fadeInAnimation]': '' }
    }),
    __metadata("design:paramtypes", [platform_browser_1.Meta, platform_browser_1.Title])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map