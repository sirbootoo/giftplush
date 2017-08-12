import { Injectable } from '@angular/core';

@Injectable()
export class WishlistService {
    getAll() {
        return this.getItems();
    }

    getById(id: number) {
        return this.getItems().find(item => item.merchantId === id);
    }

    save(product: any) {
        let wishlist = this.getItems();

        if (product.id) {
            // update existing product

            for (var i = 0; i < wishlist.length; i++) {
                if (wishlist[i].merchantId === product.merchantId) {
                    wishlist[i] = product;
                    break;
                }
            }
            this.setItems(wishlist);
        } else {
            // create new product

            // save to local storage
            wishlist.push(product);
            this.setItems(wishlist);

        }
    }

    delete(id: number) {
        let wishlist = this.getItems();
        for (var i = 0; i < wishlist.length; i++) {
            var product = wishlist[i];
            if (product.merchantId === id) {
                wishlist.splice(i, 1);
                break;
            }
        }
        this.setItems(wishlist);
    }

    private getItems(): any[] {
        if (!localStorage.getItem('wishlist')) {
            localStorage.setItem('wishlist', JSON.stringify([]));
        }

        return JSON.parse(localStorage.getItem('wishlist'));
    }
    

    private setItems(wishlist: any[]) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }


}