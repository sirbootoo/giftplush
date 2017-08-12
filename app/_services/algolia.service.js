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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var AlgoliaService = (function () {
    function AlgoliaService(http) {
        this.http = http;
    }
    AlgoliaService.prototype.setbrandds = function (brands) {
        this.setbrands(brands);
        //return this.getMerchants().find(merchant => merchant.id === id);
    };
    AlgoliaService.prototype.getMerchants = function () {
        var url = 'http://localhost/white/home/getMerchants';
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    AlgoliaService.prototype.getMerchant = function (id) {
        var url = 'http://localhost/white/home/get_company/' + id;
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    AlgoliaService.prototype.getTransactions = function () {
        if (!localStorage.getItem('transaction')) {
            return null;
        }
        return JSON.parse(localStorage.getItem('transaction'));
    };
    AlgoliaService.prototype.setbrands = function (brands) {
        localStorage.setItem('brands', JSON.stringify(brands));
    };
    AlgoliaService.prototype.setTransaction = function (formData) {
        if (!localStorage.getItem('transaction')) {
            return localStorage.setItem('transaction', JSON.stringify(formData));
        }
        else {
            var sRF = formData.value; // Get the object of the form values.
            var trn = this.getTransactions(); // Get the object from the local storage.
            var mrgObj = Object.assign(sRF, trn); // Merge the two objects (the form data and the object from the local storage)
            return localStorage.setItem('transaction', JSON.stringify(mrgObj)); // Set the form data into the local storage.
        }
    };
    return AlgoliaService;
}());
AlgoliaService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AlgoliaService);
exports.AlgoliaService = AlgoliaService;
//# sourceMappingURL=algolia.service.js.map