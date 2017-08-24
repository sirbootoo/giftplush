import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  cate:Boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((res) => { 
        if( this.router.url == "/d/pick" || this.router.url == "/d/wishlist" ){
          this.cate = true;
        }else{
          this.cate = false;
        }
    });
  }

  ngOnInit() { 
  }

}
