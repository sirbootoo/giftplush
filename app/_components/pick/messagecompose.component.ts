import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AlgoliaService } from '../../_services/index';

// import fade in animation
import { fadeInAnimation } from '../../_animations/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'messagecompose.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation],

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class MessageComposeComponent {

    constructor(private algoliaService: AlgoliaService, private router: Router) { }

    next(composeMessageForm: any){

        console.log(composeMessageForm);

        this.algoliaService.setTransaction(composeMessageForm);

        this.router.navigate(['/messagepreview']);

    }

    back(){
        this.router.navigate(['/selectrecipients']);
    }

}