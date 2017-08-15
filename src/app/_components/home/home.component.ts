import { Component } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

// import fade in animation
import { fadeInAnimation } from '../../_animations/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html',
    styleUrls: ['../../_content/indexassets/css/animate.css', 
        '../../_content/indexassets/css/icomoon.css', 
        '../../_content/indexassets/css/simple-line-icons.css',
        '../../_content/indexassets/css/bootstrap.css',
        '../../_content/indexassets/css/style.css',
        '../../_content/indexassets/css/custom.css'
        ],

    // make fade in animation available to this component
    animations: [fadeInAnimation],

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class HomeComponent {

    constructor(meta: Meta, title: Title){

        title.setTitle('Welcome To Giftplush');

        meta.addTags([
            { name: 'author',   content: 'Giftplush'},
            { name: 'keywords', content: 'search for vouchers, gift vouchers, vouchers, gifts, wishlist'},
            { name: 'description', content: 'Make that special person happy today send the person a Giftplush gift voucher.' },
            { name: 'og:title', content: 'Welcome To Giftplush Giftplush'},
            { name: 'og:description', content: 'Make that special person happy today send the person a Giftplush gift voucher.' }
        ]);

    }

}