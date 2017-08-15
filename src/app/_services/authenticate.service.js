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
var AuthenticateService = (function () {
    function AuthenticateService(http) {
        this.http = http;
        this.base_url = 'http://localhost/white/api/';
    }
    AuthenticateService.prototype.login = function (username, password) {
        return this.http.get(this.base_url + 'autho/login/?identity=' + username + '&password=' + password, this.jwt())
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            // if (user && user.token) {
            //     // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            // }
            console.log(user);
        });
    };
    AuthenticateService.prototype.signup = function (user) {
        return this.http.get(this.base_url + 'autho/register/?user=' + JSON.stringify(user)).map(function (response) { return response.json(); });
    };
    AuthenticateService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    // private helper methods
    AuthenticateService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return AuthenticateService;
}());
AuthenticateService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthenticateService);
exports.AuthenticateService = AuthenticateService;
//# sourceMappingURL=authenticate.service.js.map