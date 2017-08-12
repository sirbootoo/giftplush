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
var index_1 = require("../../_services/index");
var SignupComponent = (function () {
    function SignupComponent(route, router, authService, alertService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.alertService = alertService;
        this.merchant = false;
        this.user = true;
        this.loading = false;
        this.route.data.subscribe(function (data) {
            console.log(data);
            switch (data.signup) {
                case 'user':
                    _this.merchant = false;
                    _this.user = true;
                    break;
                case 'merchant':
                    _this.merchant = true;
                    _this.user = false;
                    break;
                default:
                    _this.router.navigate(['/signup/user']);
            }
        });
    }
    SignupComponent.prototype.register = function (signupForm) {
        var _this = this;
        this.loading = true;
        this.authService.signup(signupForm.value)
            .subscribe(function (data) {
            console.log(data);
            // set success message and pass true paramater to persist the message after redirecting to the login page
            //this.alertService.success('Registration successful', true);
            _this.router.navigate(['/login']);
        }, function (error) {
            console.log(error);
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'signup.component.html',
        styleUrls: [
            '../../_content/css/style.css'
        ]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        index_1.AuthenticateService,
        index_1.AlertService])
], SignupComponent);
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map