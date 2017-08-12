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
var index_1 = require("../_services/index");
var ModResolver = (function () {
    function ModResolver(algoliaService, router) {
        this.algoliaService = algoliaService;
        this.router = router;
    }
    ModResolver.prototype.resolve = function (route, state) {
        var _this = this;
        var MerchantId = Number(route.params['id']);
        console.log(MerchantId);
        return this.algoliaService.getMerchant(MerchantId).map(function (merchant) {
            console.log(merchant);
            if (merchant) {
                return merchant;
            }
            else {
                _this.router.navigate(['/pick']);
                console.log(_this.router.navigate(['/pick']));
                return null;
            }
        });
    };
    return ModResolver;
}());
ModResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [index_1.AlgoliaService, router_1.Router])
], ModResolver);
exports.ModResolver = ModResolver;
//# sourceMappingURL=mod.resolver.service.js.map