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
var index_1 = require("../../_services/index");
var SearchBoxComponent = (function () {
    function SearchBoxComponent(algoliaService) {
        this.algoliaService = algoliaService;
        this.query = '';
        this.placeholder = 'Search...';
        this.algoliaService = algoliaService;
        this.algoliaService.helper.setQuery(this.query).search();
    }
    SearchBoxComponent.prototype.search = function () {
        this.algoliaService.helper.setQuery(this.query).search();
    };
    return SearchBoxComponent;
}());
SearchBoxComponent = __decorate([
    core_1.Component({
        selector: 'search-box',
        template: "\n    <div class=\"form-group\">\n        <div class=\"icon-addon addon-lg\"  style=\"z-index: 1 !important; text-align: center\">\n            <input type=\"text\" placeholder=\"{{placeholder}}\" class=\"form-control\" id=\"searchInput\" (keyup)=\"search()\" [(ngModel)]=\"query\">\n            <label for=\"searchInput\" class=\"fa fa-search\" rel=\"tooltip\" title=\"searchInput\"></label>\n        </div>\n        <small class=\"text-right\">Powered By Algolia</small>\n    </div>\n   "
    }),
    __metadata("design:paramtypes", [index_1.AlgoliaService])
], SearchBoxComponent);
exports.SearchBoxComponent = SearchBoxComponent;
var RefinementListComponent = (function () {
    function RefinementListComponent(algoliaService) {
        var _this = this;
        this.algoliaService = algoliaService;
        this.facets = [];
        this.algoliaService = algoliaService;
        algoliaService.helper.on('result', function (results) {
            _this.facets = results.getFacetValues(['category', 'location'], ['selected', 'count:desc']);
        });
    }
    RefinementListComponent.prototype.toggleFacet = function (facetName) {
        this.algoliaService.helper.toggleRefinement('category,location', facetName).search();
    };
    return RefinementListComponent;
}());
RefinementListComponent = __decorate([
    core_1.Component({
        selector: 'refinement-list',
        template: "\n    <div class=\"filter-list\" [class.no-results]=\"facets.length === 0\">\n      <p *ngFor=\"let facet of facets\" [class.active]=\"facet.isRefined\" (click)=\"toggleFacet(facet.name)\">\n        <label class=\"custom-control custom-checkbox\">\n          <input type=\"checkbox\" class=\"custom-control-input\" [name]=\"facet.name\">\n          <span class=\"custom-control-indicator\"></span>\n          <span class=\"custom-control-description\">{{facet.name}}</span>\n        </label>\n      </p>\n      <p *ngIf=\"facets.length === 0\">No results.></p>\n    </div>\n    <hr>\n  "
    }),
    __metadata("design:paramtypes", [index_1.AlgoliaService])
], RefinementListComponent);
exports.RefinementListComponent = RefinementListComponent;
var ResultsComponent = (function () {
    function ResultsComponent(algoliaService) {
        var _this = this;
        this.algoliaService = algoliaService;
        this.hits = [];
        algoliaService.helper.on('result', function (results) {
            _this.hits = results.hits;
        });
    }
    return ResultsComponent;
}());
ResultsComponent = __decorate([
    core_1.Component({
        selector: 'results',
        template: "\n    <div class=\"col-3 col-sm-3\" *ngFor=\"let hit of hits\" >\n      <a [routerLink]=\"['mod', hit.id]\">\n        <div class=\"card\">\n          <img class=\"card-img-top img-fluid\" src=\"{{hit.profile_img}}\" alt=\"{{hit.company}} Gift Voucher\">\n          <div class=\"card-block\">\n            <p class=\"card-text\">{{hit.company}} Gift Voucher</p>\n          </div>\n        </div>\n      </a>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [index_1.AlgoliaService])
], ResultsComponent);
exports.ResultsComponent = ResultsComponent;
var PagerComponent = (function () {
    function PagerComponent(algoliaService) {
        var _this = this;
        this.algoliaService = algoliaService;
        this.currentPage = 0;
        this.algoliaService = algoliaService;
        this.algoliaService.helper.on('change', function () {
            _this.currentPage = algoliaService.helper.getPage();
        });
    }
    PagerComponent.prototype.prevPage = function () {
        if (this.currentPage > 0) {
            this.algoliaService.helper.previousPage().search();
        }
    };
    PagerComponent.prototype.nextPage = function () {
        this.algoliaService.helper.nextPage().search();
    };
    return PagerComponent;
}());
PagerComponent = __decorate([
    core_1.Component({
        selector: 'pager',
        template: "\n\n    <a (click)=\"prevPage()\" class=\"prev-btn\"> <i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i> </a>\n    <span class=\"current=page\">Showing Page {{currentPage+1}}</span>\n    <a (click)=\"nextPage()\" class=\"next-btn\"> <i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i> </a>\n\n  "
    }),
    __metadata("design:paramtypes", [index_1.AlgoliaService])
], PagerComponent);
exports.PagerComponent = PagerComponent;
//# sourceMappingURL=algolia.component.js.map