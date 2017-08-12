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
var SignupResolver = (function () {
    function SignupResolver(algoliaService, router) {
        this.algoliaService = algoliaService;
        this.router = router;
    }
    SignupResolver.prototype.resolve = function (route, state) {
        var signupUrl = route.params['slug'];
        return signupUrl;
    };
    return SignupResolver;
}());
SignupResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [index_1.AlgoliaService, router_1.Router])
], SignupResolver);
exports.SignupResolver = SignupResolver;
//# sourceMappingURL=signup.resolver.js.map