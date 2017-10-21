import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticateService } from '../_services/index';

@Injectable()
export class EmailVerifyResolverService {

  constructor(private auth: AuthenticateService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let emailCode = route.queryParams['oobCode'];
    let mode = route.queryParams['mode'];


    return this.auth.verifyEmail(emailCode);


  }

}
