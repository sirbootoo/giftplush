import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment, UrlTree, UrlSegmentGroup } from '@angular/router';

import { AuthenticateService } from '../_services/index';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent implements OnInit {

  cate:Boolean;
  loggedIn: any;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticateService ) {

    this.loggedIn = this.auth.loggedIn;
    
    this.router.events.subscribe((res) => { 
        if( this.router.url === "/d/pick" || this.router.url.includes('mod') || this.router.url === "/d/wishlist" ){
          this.cate = true;
        }else{
          this.cate = false;
        }
    });
  }

  ngOnInit() { 
  }

  logout(){
    this.auth.logout();
  }

}
