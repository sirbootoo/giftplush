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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/catch");
var DashboardService = (function () {
    function DashboardService(http) {
        this.http = http;
        this.base_url = 'http://localhost/white/api/';
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    DashboardService.prototype.checkVoucher = function (user) {
        return this.http.get(this.base_url + 'autho/checkvoucher?vouchercode=' + user.voucher + '&userid=' + this.currentUser.userid, this.jwt())
            .map(function (response) { return response.json(); })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    DashboardService.prototype.chargeVoucher = function (info) {
        return this.http.get(this.base_url + 'autho/chargevoucher?amount=' + info.amount + '&vouchId=' + info.vouchId + '&userid=' + info.userIid, this.jwt())
            .map(function (response) { return response.json(); })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    DashboardService.prototype.listTransactions = function (userid) {
        return this.http.get(this.base_url + 'autho/listtransactions/id/' + userid, this.jwt())
            .map(function (response) { return response.json(); })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    // private helper methods
    DashboardService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers();
            headers.append('Authorization', 'Bearer ' + currentUser.token);
            headers.append('Content-Type', 'application/json; charset=tf-8');
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return DashboardService;
}());
DashboardService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map