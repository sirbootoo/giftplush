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
var LoginComponent = (function () {
    function LoginComponent(meta, title, route, router, authenticateService, alertService) {
        this.route = route;
        this.router = router;
        this.authenticateService = authenticateService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
        title.setTitle('Login - Giftplush');
        meta.addTags([
            { name: 'author', content: 'Giftplush' },
            { name: 'keywords', content: 'wishlist, weddings wishlist, birthday wishlist, gifts' },
            { name: 'description', content: "Tired of getting gifts you don't need ? Giftplush wishlist helps you eradicate unneeded gifts" }
        ]);
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticateService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function (loginForm) {
        var _this = this;
        this.loading = true;
        console.log("Username - " + loginForm.value.username + " Password - " + loginForm.value.password);
        this.authenticateService.login(loginForm.value.username, loginForm.value.password)
            .subscribe(function (data) {
            _this.alertService.success('Login Succesful');
            _this.loading = false;
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
            console.log(error);
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'login.component.html',
        styleUrls: [
            '../../_content/css/style.css'
        ]
    }),
    __metadata("design:paramtypes", [platform_browser_1.Meta, platform_browser_1.Title,
        router_1.ActivatedRoute,
        router_1.Router,
        index_1.AuthenticateService,
        index_1.AlertService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map