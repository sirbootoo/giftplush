import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//services
import { ModResolver, MessagePreviewResolver, SignupResolver, WishlistshowResolverService } from '../../_services/index';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  providers: [WishlistshowResolverService]
})
export class ShowComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe( (data) => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
