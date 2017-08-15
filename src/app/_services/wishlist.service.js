"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WishlistService = (function () {
    function WishlistService() {
    }
    WishlistService.prototype.getAll = function () {
        return this.getItems();
    };
    WishlistService.prototype.getById = function (id) {
        return this.getItems().find(function (item) { return item.merchantId === id; });
    };
    WishlistService.prototype.save = function (product) {
        var wishlist = this.getItems();
        if (product.id) {
            // update existing product
            for (var i = 0; i < wishlist.length; i++) {
                if (wishlist[i].merchantId === product.merchantId) {
                    wishlist[i] = product;
                    break;
                }
            }
            this.setItems(wishlist);
        }
        else {
            // create new product
            // save to local storage
            wishlist.push(product);
            this.setItems(wishlist);
        }
    };
    WishlistService.prototype.delete = function (id) {
        var wishlist = this.getItems();
        for (var i = 0; i < wishlist.length; i++) {
            var product = wishlist[i];
            if (product.merchantId === id) {
                wishlist.splice(i, 1);
                break;
            }
        }
        this.setItems(wishlist);
    };
    WishlistService.prototype.getItems = function () {
        if (!localStorage.getItem('wishlist')) {
            localStorage.setItem('wishlist', JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem('wishlist'));
    };
    WishlistService.prototype.setItems = function (wishlist) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    };
    return WishlistService;
}());
WishlistService = __decorate([
    core_1.Injectable()
], WishlistService);
exports.WishlistService = WishlistService;
//# sourceMappingURL=wishlist.service.js.map