import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ProductService, PubSubService, AlgoliaService } from '../../_services/index';

//import { ProductService, PubSubService } from '../_services/index';

// import fade in animation
import { fadeInAnimation } from '../../_animations/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'selectrecipients.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation], 

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class SelectRecipientsComponent {

    showEmail: Boolean = true;
    showPhoneNo: Boolean = false;
    yourself: Boolean = false;
    transact: any;
    anonymous: any;
    sendToYourself: any;
    email: any;
    phone: any;

    constructor(private algoliaService: AlgoliaService, private router: Router) { }

    ToggleEmailPhoneNoBox(){
        if(this.showEmail){
            this.showEmail = false;
            this.showPhoneNo = true;
        }else{
            this.showEmail = true;
            this.showPhoneNo = false;
        }
    }

    next(selectRecipientForm: any){
        console.log(selectRecipientForm);

        var sRF = selectRecipientForm.value;

        this.algoliaService.setTransaction(sRF);

        this.router.navigate(['/d/pick/composemessage']);
    }

    back(){
        this.router.navigate(['/pick']);
    }

    toggleSendToYourself(): any{
        console.log(this.yourself);
    }

    private loadProducts() {
        return this.transact = this.algoliaService.getTransactions();
    }


}