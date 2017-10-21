import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Meta, Title } from "@angular/platform-browser";

import { ProductService, PubSubService, AlgoliaService, AuthenticateService } from '../../_services/index';

// import slide in/out animation
import { slideInOutAnimation } from '../../_animations/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'mod.component.html',

    // make slide in/out animation available to this component
    animations: [slideInOutAnimation],

    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
})

export class ModComponent implements OnInit {

    merchant: any = {};
    transact: any = {};
    loading: Boolean = false;

    constructor( meta: Meta, title: Title,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private pubSubService: PubSubService,
        private algoliaService: AlgoliaService, public afAuth: AngularFireAuth, 
        private db: AngularFireDatabase, private auth: AuthenticateService) {
            route.params.forEach(params => {

                this.db.list('/businessInfo', {
                    query: {
                        orderByChild: 'slug',
                        equalTo: params['slug']
                    }
                }).subscribe(data => {
                    if(typeof data[0] !== 'undefined'){
                        console.log(data[0]);
                        this.merchant = data[0];
                        this.merchant.logo = data[0].images.logo;

                        //Meta Tags For The Merchant's Page
                        title.setTitle(this.merchant.businessName+" - Giftplush");
                        meta.addTags([
                            { name: 'author',   content: 'Giftplush'},
                            { name: 'keywords', content: this.merchant.businessName+', '+this.merchant.businessName+' vouchers,'+this.merchant.company+' gift vouchers'},
                            { name: 'description', content: this.merchant.about }
                        ]);
                        //End Meta Tags For The Merchant's Page

                        console.log(this.merchant.logo);
                    }else{
                        this.router.navigate(['/pick']);
                    }
                });
                
              });


        }

    ngOnInit() {


    }

    saveTransaction(modForm: any) {

        this.loading = true;

        this.transact = {
            company: modForm.controls.company.value,
            address: modForm.controls.address.value,
            price: modForm.controls.price.value
        }

        console.log(this.transact);

        this.algoliaService.setTransaction(this.transact);

        this.router.navigate(["/d/pick/selectrecipients"]);

        // publish event so list controller can refresh
        this.pubSubService.publish('transaction-updated');
    }


}
