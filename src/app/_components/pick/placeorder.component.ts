import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ProductService, PubSubService, AlgoliaService,
         MessagePreviewResolver, AuthenticateService } from '../../_services/index';

// import fade in animation
import { fadeInAnimation } from '../../_animations/index';

var randomize = require('randomatic');
var Nexmo = require("nexmo");


declare var PaystackPop: any;
declare function verify(): any;
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
    loggedIn: any;

    nexmo = new Nexmo({
        apiKey: '4ed43f57',
        apiSecret: 'b881d6ee1dfcd331'
    });

    constructor(private route: ActivatedRoute, 
        private algoliaService: AlgoliaService, 
        private router: Router, 
        private elementRef:ElementRef,
        private auth: AuthenticateService) {

        this.route.data.subscribe( (data) => {

            this.info = data.info;

            this.loggedIn = this.auth.loggedIn;


        });

        

    }
    ngAfterViewInit() {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "https://js.paystack.co/v1/inline.js";
        this.elementRef.nativeElement.appendChild(s);
    }

    back(){
        this.router.navigate(['/d/pick/messagepreview']);
    }

    proceed(){

        if(this.loggedIn){
            let info_ = localStorage.getItem('transactions');
            var info = JSON.parse(info_);
            var self = this;
    
            var handler = PaystackPop.setup({
                key: 'pk_test_1503ca14171ed92a2b6d7aa954b53215ff3c29d9',
                email: 'customer@gmail.com',
                amount: 10000,
                ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                metadata: {
                   custom_fields: [
                      {
                          display_name: "Mobile Number",
                          variable_name: "mobile_number",
                          value: "+2348012345678"
                      }
                   ]
                },
                callback: function(response){
                    alert('success. transaction ref is ' + response.reference);
                    self.verify(response.reference); // referencing the verify function below
                },
                onClose: function(){
                    alert('window closed');
                }
            });
            handler.openIframe();
        }else{
            this.router.navigate(['/login'], { queryParams: { returnUrl: '/d/pick/placeorder' }});
        }
        
        



    }

    verify(reference:any){
        let str = 'GPH'+randomize('Aa', 7);
        console.log(str);
        this.algoliaService.verifyTransaction(reference).subscribe(data => {
            console.log(data);
            let info = {
                to: "2348168661084",
                from: "Giftplush",
                text: "A voucher of code "+str+" with _____ amount has been sent to you."
            }
            
            this.nexmo.message.sendSms(info);
            
        });
    }

}