import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';

@Injectable()
export class WishlistService {

    constructor(private http: Http, public afAuth: AngularFireAuth,
                public db: AngularFireDatabase, public router: Router){

    }

    pushToFirebase(path: any, data: any){
        console.log(data);
        /* this.db.object(path).update(data).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        }); */

        var ref = firebase.database().ref();
        
            // Get a key for a new business.
            var newItem = ref
                .child(path)
                .push(data);

                let link = "http://giftplush.com/d/wishlist/show/"+newItem.key

                console.log(link);

                localStorage.setItem('wishlistLink', JSON.stringify(link));
    } 

    getAll() {
        return this.getItems();
    }

    getById(id: number) {
        let jsObjects = JSON.parse(localStorage.getItem('wishlist'));
        var result = jsObjects.filter(function( obj ) {
            return obj.merchantId == id;
        });
        return result;
    }

    save(wishlist: any) {
        let wishlists = this.getItems();

        console.log(wishlist);

        if (wishlist.merchantId) {
            // update existing wishlist

            for (var i = 0; i < wishlists.length; i++) {
                if (wishlists[i].merchantId === wishlist.merchantId) {
                    wishlists[i].purposeOfWishlist = wishlist.purposeOfWishlist;
                    wishlists[i].amount = wishlist.amount;
                    wishlists[i].priority = wishlist.priority;

                    break;
                }
            }

            console.log(wishlists);

            this.setItems(wishlists);
            
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

    public getItems() {
        if (!localStorage.getItem('wishlist')) {
            localStorage.setItem('wishlist', JSON.stringify([]));
        }

        return JSON.parse(localStorage.getItem('wishlist'));
    }
    

    private setItems(wishlist: any[]) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    getWishlistInfo(){
        if (!localStorage.getItem('wishlistInfo')) {
            return null;
        }
    
        return JSON.parse(localStorage.getItem('wishlistInfo'));
    }
    
    setWishlistInfo(form: any){
        localStorage.setItem('wishlistInfo', JSON.stringify(form));
    }


}