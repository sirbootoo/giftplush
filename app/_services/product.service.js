"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProductService = (function () {
    function ProductService() {
    }
    ProductService.prototype.getAll = function () {
        return this.getProducts();
    };
    ProductService.prototype.getAllMerchants = function () {
        return this.getMerchants();
    };
    ProductService.prototype.getById = function (id) {
        return this.getProducts().find(function (product) { return product.id === id; });
    };
    ProductService.prototype.getByMerchantId = function (id) {
        return this.getMerchants().find(function (merchant) { return merchant.id === id; });
    };
    ProductService.prototype.transact = function (transaction) {
        var transactions = this.getTransactions();
        // create new transaction
        // save to local storage
        transactions.push(transaction);
        this.setTransactions(transactions);
    };
    ProductService.prototype.saveMerchants = function (merchant) {
        var merchants = this.getMerchants();
        // create new merchant
        // assign id
        var lastmerchant = merchants[merchants.length - 1] || { id: 0 };
        merchant.id = lastmerchant.id + 1;
        // save to local storage
        merchants.push(merchant);
        this.setMerchants(merchants);
    };
    ProductService.prototype.save = function (product) {
        var products = this.getProducts();
        if (product.id) {
            // update existing product
            for (var i = 0; i < products.length; i++) {
                if (products[i].id === product.id) {
                    products[i] = product;
                    break;
                }
            }
            this.setProducts(products);
        }
        else {
            // create new product
            // assign id
            var lastProduct = products[products.length - 1] || { id: 0 };
            product.id = lastProduct.id + 1;
            // save to local storage
            products.push(product);
            this.setProducts(products);
        }
    };
    ProductService.prototype.delete = function (id) {
        var products = this.getProducts();
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            if (product.id === id) {
                products.splice(i, 1);
                break;
            }
        }
        this.setProducts(products);
    };
    // private helper methods
    ProductService.prototype.getMerchants = function () {
        if (!localStorage.getItem('merchants')) {
            localStorage.setItem('merchants', JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem('merchants'));
    };
    ProductService.prototype.getTransactions = function () {
        if (!localStorage.getItem('transactions')) {
            localStorage.setItem('transactions', JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem('transactions'));
    };
    ProductService.prototype.setTransactions = function (transactions) {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    };
    ProductService.prototype.setMerchants = function (merchants) {
        localStorage.setItem('merchants', JSON.stringify(merchants));
    };
    ProductService.prototype.getProducts = function () {
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem('products'));
    };
    ProductService.prototype.setProducts = function (products) {
        localStorage.setItem('products', JSON.stringify(products));
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable()
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map