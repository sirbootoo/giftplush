import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AlgoliaService, AuthenticateService } from '../_services/index';

@Injectable()
export class ModResolver implements Resolve<any> {
  merchants: any;
  constructor(private algoliaService: AlgoliaService, private router: Router, public afAuth: AngularFireAuth, 
    private db: AngularFireDatabase, private auth: AuthenticateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    let Merchantslug = route.params['slug'];

    return this.auth.getMerchantBySlug(Merchantslug);

    /* return this.algoliaService.getMerchant(MerchantId).map( merchant => { 

        console.log(merchant);
      if (merchant) {
        return merchant;
      } else {
        this.router.navigate(['/pick']);
        console.log(this.router.navigate(['/pick']));
        return null;
      }
    }); */


  }
}
