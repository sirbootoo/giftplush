import { Component } from '@angular/core';

import {AlgoliaService } from '../../_services/index';


@Component({
  selector: 'search-box',
  template: `
    <div class="form-group">
        <div class="icon-addon addon-lg"  style="z-index: 1 !important; text-align: center">
            <input type="text" placeholder="{{placeholder}}" class="form-control" id="searchInput" (keyup)="search()" [(ngModel)]="query">
            <label for="searchInput" class="fa fa-search" rel="tooltip" title="searchInput"></label>
        </div>
        <small class="text-right">Powered By Algolia</small>
    </div>
   `
})
export class SearchBoxComponent {
  query = '';
  placeholder = 'Search...';
  constructor(private algoliaService: AlgoliaService) {
    this.algoliaService = algoliaService;
    this.algoliaService.helper.setQuery(this.query).search();
  }
  search() {
    this.algoliaService.helper.setQuery(this.query).search();
  }
}

@Component({
  selector: 'refinement-list',
  template: `
    <div class="filter-list" [class.no-results]="facets.length === 0">
      <p *ngFor="let facet of facets" [class.active]="facet.isRefined" (click)="toggleFacet(facet.name)">
        <label class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" [name]="facet.name">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description">{{facet.name}}</span>
        </label>
      </p>
      <p *ngIf="facets.length === 0">No results.></p>
    </div>
    <hr>
  `
})
export class RefinementListComponent {
  facets: any = [];
  results: any;

  constructor(private algoliaService: AlgoliaService) {
    this.algoliaService = algoliaService;

    algoliaService.helper.on('result', results => {
      this.facets = results.getFacetValues(['category','location'], ['selected', 'count:desc']);
    });
  }

  toggleFacet(facetName: string) {
    this.algoliaService.helper.toggleRefinement('category,location', facetName).search();
  }
}

@Component({
  selector: 'results',
  template: `
    <div class="col-3 col-sm-3" *ngFor="let hit of hits" >
      <a [routerLink]="['mod', hit.id]">
        <div class="card">
          <img class="card-img-top img-fluid" src="{{hit.profile_img}}" alt="{{hit.company}} Gift Voucher">
          <div class="card-block">
            <p class="card-text">{{hit.company}} Gift Voucher</p>
          </div>
        </div>
      </a>
    </div>
  `
})
export class ResultsComponent {
  hits: any = [];
  results:any;
  
  constructor(private algoliaService: AlgoliaService) {
    algoliaService.helper.on('result', results => {
      this.hits = results.hits
    });
  }
}

@Component({
  selector: 'pager',
  template: `

    <a (click)="prevPage()" class="prev-btn"> <i class="fa fa-chevron-left" aria-hidden="true"></i> </a>
    <span class="current=page">Showing Page {{currentPage+1}}</span>
    <a (click)="nextPage()" class="next-btn"> <i class="fa fa-chevron-right" aria-hidden="true"></i> </a>

  `
})
export class PagerComponent {
  currentPage = 0;

  constructor(private algoliaService: AlgoliaService) {
    this.algoliaService = algoliaService;

    this.algoliaService.helper.on('change', () => {
      this.currentPage = algoliaService.helper.getPage();
    });
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.algoliaService.helper.previousPage().search();
    }
  }

  nextPage() {
    this.algoliaService.helper.nextPage().search();
  }
}
