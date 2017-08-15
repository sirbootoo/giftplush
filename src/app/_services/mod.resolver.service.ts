import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AlgoliaService } from '../_services/index';

@Injectable()
export class ModResolver implements Resolve<any> {
  constructor(private algoliaService: AlgoliaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let MerchantId = Number(route.params['id']);

    console.log(MerchantId); 

    return this.algoliaService.getMerchant(MerchantId).map( merchant => { 

        console.log(merchant);
      if (merchant) {
        return merchant;
      } else {
        this.router.navigate(['/pick']);
        console.log(this.router.navigate(['/pick']));
        return null;
      }
    });
  }
}
