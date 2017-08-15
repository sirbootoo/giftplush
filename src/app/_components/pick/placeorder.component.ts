import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ProductService, PubSubService, AlgoliaService, MessagePreviewResolver } from '../../_services/index';

// import fade in animation
import { fadeInAnimation } from '../../_animations/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'placeorder.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation],

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' } 
})

export class PlaceOrderComponent {

    info: any;

    constructor(private route: ActivatedRoute, private algoliaService: AlgoliaService, private router: Router) {

        this.route.data.subscribe( (data) => {

            this.info = data.info;

            this.info.claimBefore = new Date(data.info.claimBefore).toUTCString();

            console.log(this.info.claimBefore);

        });

    }

    back(){
        this.router.navigate(['/messagepreview']);
    }

    proceed(){
        console.log('lol');
    }

}