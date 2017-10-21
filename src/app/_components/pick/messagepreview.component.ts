import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AlgoliaService, AuthenticateService } from '../../_services/index';

// import fade in animation
import { fadeInAnimation } from '../../_animations/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'messagepreview.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation],

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class MessagePreviewComponent{

    tran: any;

    constructor(private route: ActivatedRoute, private algoliaService: AlgoliaService, private router: Router) { 
        
        this.route.data.subscribe( (data) => {

            this.tran = data.info;

            this.tran.claimBefore = new Date(data.info.claimBefore).toUTCString();

            console.log(this.tran.claimBefore);

        });

    }

    next(){

        var cnf = confirm("Are you satisfied with your order ? ");

        if(cnf){
            this.router.navigate(['/d/pick/placeorder']);
        }
    }

    back(){
        this.router.navigate(['/d/pick/composemessage']);
    }



}