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
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("../../_services/index");
// import fade in animation
var index_2 = require("../../_animations/index");
var DashboardComponent = (function () {
    function DashboardComponent(title, dashboard, pubSubService) {
        this.dashboard = dashboard;
        this.pubSubService = pubSubService;
        this.loading = false;
        this.check = true;
        this.charge = false;
        this.alert = false;
        this.tranSuccess = false;
        this.canGoBack = (this.check === true) ? false : true;
        this.emptyTran = true;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userId = currentUser.userid;
        this.groupId = currentUser.user.group_id;
        console.log(this.groupId);
        switch (this.groupId) {
            case '3':
                this.isMerchant = true;
                this.isUser = false;
                break;
            case '2':
                this.isMerchant = false;
                this.isUser = true;
                break;
            default:
                this.isMerchant = false;
                this.isUser = false;
        }
        title.setTitle('Dashboard - Giftplush');
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.listTransactions();
        // reload products when updated
        this.subscription = this.pubSubService.on('products-updated').subscribe(function () { _this.listTransactions(); console.log('working Updated'); });
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    };
    DashboardComponent.prototype.goBack = function () {
        this.charge = false;
        this.check = true;
        this.tranSuccess = false;
        this.alert = false;
    };
    DashboardComponent.prototype.checkValidity = function (voucherForm) {
        var _this = this;
        this.loading = true;
        console.log(voucherForm.value);
        this.dashboard.checkVoucher(voucherForm.value).subscribe(function (data) {
            console.log(data);
            switch (data.status) {
                case true:
                    _this.loading = false;
                    _this.check = false;
                    _this.charge = true;
                    _this.alert = false;
                    _this.vouchId = data.message.id;
                    _this.balance = data.message.balance;
                    break;
                case false:
                    _this.loading = false;
                    _this.alert = true;
                    _this.alerttxt = data.message;
                    _this.alertClass = 'alert-danger';
                    break;
                default:
                    _this.loading = false;
                    _this.alert = true;
                    _this.alerttxt = data.message;
                    _this.alertClass = 'alert-warning';
                    break;
            }
        }, function (error) {
            _this.loading = false;
            _this.alert = true;
            _this.alerttxt = error;
            console.log(error);
        });
    };
    DashboardComponent.prototype.chargeVoucher = function (chargeForm) {
        var _this = this;
        this.loading = true;
        console.log(chargeForm.value);
        if (chargeForm.value.amount > chargeForm.value.balance) {
            this.loading = false;
            this.alert = true;
            this.alerttxt = 'Insufficient Funds';
            this.alertClass = 'alert-danger';
        }
        else {
            var datas = {
                'amount': chargeForm.value.amount,
                'vouchId': chargeForm.value.vouchId,
                'userid': this.userId
            };
            this.dashboard.chargeVoucher(datas).subscribe(function (data) {
                console.log(data);
                switch (data.status) {
                    case true:
                        _this.loading = false;
                        _this.tranSuccess = true;
                        _this.alert = true;
                        _this.alertClass = 'alert-success';
                        _this.alerttxt = 'Transaction Successful... Voucher Successfully Debited';
                        _this.charge = false;
                        break;
                    case false:
                        _this.loading = false;
                        _this.alert = true;
                        _this.alertClass = 'alert-danger';
                        _this.alerttxt = data.message;
                        break;
                }
                // publish event so list controller can refresh
                _this.pubSubService.publish('voucher-redeemed');
            });
        }
    };
    DashboardComponent.prototype.listTransactions = function () {
        var _this = this;
        this.dashboard.listTransactions(this.userId).subscribe(function (data) {
            switch (data.status) {
                case false:
                    _this.tableData = data.message;
                    _this.emptyTran = true;
                    console.log(_this.tableData);
                    break;
                default:
                    _this.tableData = data;
                    _this.emptyTran = false;
                    console.log(_this.tableData);
            }
        }, function (error) {
            console.log("Error: " + error);
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        templateUrl: 'dashboard.component.html',
        // make fade in animation available to this component
        animations: [index_2.fadeInAnimation],
        // attach the fade in animation to the host (root) element of this component
        host: { '[@fadeInAnimation]': '' }
    }),
    __metadata("design:paramtypes", [platform_browser_1.Title, index_1.DashboardService, index_1.PubSubService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map