import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AlgoliaService } from '../_services/index';

@Injectable()
export class SignupResolver implements Resolve<any> {
  constructor(private algoliaService: AlgoliaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let signupUrl = route.params['slug'];

    return signupUrl;
    
  }
}
