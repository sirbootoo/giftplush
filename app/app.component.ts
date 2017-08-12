import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from "@angular/platform-browser";

import { ProductService } from './_services/index';

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    constructor(meta: Meta, title: Title , private productService: ProductService, private router: Router) {
        // add some initial products
        if (productService.getAll().length === 0) {
            productService.save({ name: 'Boardies', price: '25.00' });
            productService.save({ name: 'Singlet', price: '9.50' });
            productService.save({ name: 'Thongs (Flip Flops)', price: '12.95' });
        }
        if(productService.getAllMerchants().length === 0){
            productService.saveMerchants({ name: 'Amazon', address: '23 Gbajumo Street', min: '500', profileImg: 'app/_content/assets/img/i-21-1346844962951-42_hd.png' });
            productService.saveMerchants({ name: 'Bestbuy', address: '23 Gbajumo Street', min: '500', profileImg: 'app/_content/assets/img/i-64-1346844965204-49_hd.png' });
            productService.saveMerchants({ name: 'Shoprite', address: '23 Gbajumo Street', min: '500', profileImg: 'app/_content/assets/img/i-21-1346844962951-42_hd.png' });
            productService.saveMerchants({ name: 'Babies R Us', address: '23 Gbajumo Street', min: '500', profileImg: 'app/_content/assets/img/i-46-1346844963989-16_hd.png' });
        }

        title.setTitle('Welcome To Giftplush');

        meta.addTags([
            { name: 'author',   content: 'Giftplush'},
            { name: 'keywords', content: 'search for vouchers, gift vouchers, vouchers, gifts, wishlist'},
            { name: 'description', content: 'Make that special person happy today send the person a Giftplush gift voucher.' },
            { name: 'og:title', content: 'Welcome To Giftplush'},
            { name: 'og:description', content: 'Make that special person happy today send the person a Giftplush gift voucher.' }
        ]);



    }

    back(pageURL: string){
        this.router.navigate([pageURL]);
    }

}