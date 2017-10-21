import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

//Service
import {AuthenticateService} from '../_services/index';

@Injectable()
export class EmailVerifyGuard implements CanActivate {
  constructor(private auth: AuthenticateService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      let emailCode = next.params['code'];

      this.auth.verifyEmail(emailCode);
    
      return true;
  }
}
