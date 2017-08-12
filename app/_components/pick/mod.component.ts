import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Meta, Title } from "@angular/platform-browser";

import { ProductService, PubSubService, AlgoliaService } from '../../_services/index';

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
        private algoliaService: AlgoliaService) {
            this.route.data.subscribe( (data) => {

                console.log(data);
                this.merchant = data.merchant[0];
            
                console.log(this.merchant);
            });

            title.setTitle(this.merchant.company+" - Giftplush");

            meta.addTags([
                { name: 'author',   content: 'Giftplush'},
                { name: 'keywords', content: this.merchant.company+', '+this.merchant.company+' vouchers,'+this.merchant.company+' gift vouchers'},
                { name: 'description', content: this.merchant.about }
            ]);


        }

    ngOnInit() {


    }

    saveTransaction(modForm: any) {

        this.loading = true;

        console.log(modForm.controls);

        this.transact = {
            company: modForm.controls.company.value,
            address: modForm.controls.address.value,
            price: modForm.controls.price.value
        }

        console.log(this.transact);

        this.algoliaService.setTransaction(this.transact);

        this.router.navigate(["/selectrecipients"]);

        // publish event so list controller can refresh
        this.pubSubService.publish('transaction-updated');
    }


}
