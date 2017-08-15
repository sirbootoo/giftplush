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
var index_1 = require("./_services/index");
var AppComponent = (function () {
    function AppComponent(meta, title, productService, router) {
        this.productService = productService;
        this.router = router;
        // add some initial products
        if (productService.getAll().length === 0) {
            productService.save({ name: 'Boardies', price: '25.00' });
            productService.save({ name: 'Singlet', price: '9.50' });
            productService.save({ name: 'Thongs (Flip Flops)', price: '12.95' });
        }
        if (productService.getAllMerchants().length === 0) {
            productService.saveMerchants({ name: 'Amazon', address: '23 Gbajumo Street', min: '500', profileImg: 'app/_content/assets/img/i-21-1346844962951-42_hd.png' });
            productService.saveMerchants({ name: 'Bestbuy', address: '23 Gbajumo Street', min: '500', profileImg: 'app/_content/assets/img/i-64-1346844965204-49_hd.png' });
            productService.saveMerchants({ name: 'Shoprite', address: '23 Gbajumo Street', min: '500', profileImg: 'app/_content/assets/img/i-21-1346844962951-42_hd.png' });
            productService.saveMerchants({ name: 'Babies R Us', address: '23 Gbajumo Street', min: '500', profileImg: 'app/_content/assets/img/i-46-1346844963989-16_hd.png' });
        }
        title.setTitle('Welcome To Giftplush');
        meta.addTags([
            { name: 'author', content: 'Giftplush' },
            { name: 'keywords', content: 'search for vouchers, gift vouchers, vouchers, gifts, wishlist' },
            { name: 'description', content: 'Make that special person happy today send the person a Giftplush gift voucher.' },
            { name: 'og:title', content: 'Welcome To Giftplush' },
            { name: 'og:description', content: 'Make that special person happy today send the person a Giftplush gift voucher.' }
        ]);
    }
    AppComponent.prototype.back = function (pageURL) {
        this.router.navigate([pageURL]);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        selector: 'app',
        templateUrl: 'app.component.html'
    }),
    __metadata("design:paramtypes", [platform_browser_1.Meta, platform_browser_1.Title, index_1.ProductService, router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map