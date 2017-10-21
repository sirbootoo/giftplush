import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AuthenticateService } from '../_services/index';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auths: AuthenticateService, private af: AngularFireAuth, private db: AngularFireDatabase) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /* if (localStorage.getItem('firebase:authUser:AIzaSyCjcD3VQg18WVQn1zu-yf8aKrho6ebl8mM:heisenberg-dev')) {
            // logged in so return true
            return true;
        }else{
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        } */

        return this.af.authState.map((auth) => {
            if (!auth) {
                console.log(auth);
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
              return false;
            }
            return true;
        }).take(1);


    }
}