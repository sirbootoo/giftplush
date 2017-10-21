import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';

/* import {AuthenticateService } from './index'; */
 
@Injectable()
export class AlgoliaService {

  constructor(private http: Http/* , private auth: AuthenticateService */){ 

  } 

  public setbrandds(brands: any){

    this.setbrands(brands);

    //return this.getMerchants().find(merchant => merchant.id === id);
  }


  public getMerchants(){

    let url: string = 'http://localhost/white/home/getMerchants';

    return this.http.get(url).map((res:Response) => res.json());

  }

  public getMerchant(id:number){
    let url: string = 'http://localhost/white/home/get_company/'+id;

    return this.http.get(url).map((res:Response) => res.json());
  }

  /* getBrand(id: number){
    let url: string = "/businessInfo/";
    var user_id = this.auth.currentUserId;

    console.log(user_id);

  } */

  public getTransactions(){
    if (!localStorage.getItem('transaction')) {
        return null;
        }

        return JSON.parse(localStorage.getItem('transaction'));
  }

  private setbrands(brands: any) {
        localStorage.setItem('brands', JSON.stringify(brands)); 
  }

  setTransaction(formData: any){

    console.log(formData);

    if (!localStorage.getItem('transaction')) {

        return localStorage.setItem('transaction', JSON.stringify(formData));

    }else{


        var trn = this.getTransactions(); // Get the object from the local storage.

        if(formData.company && formData.address){
          return localStorage.setItem('transaction', JSON.stringify(formData)); // Set the form data into the local storage.          
        }else{

          var mrgObj = Object.assign(formData, trn); // Merge the two objects (the form data and the object from the local storage)
          
          return localStorage.setItem('transaction', JSON.stringify(mrgObj)); // Set the form data into the local storage.
          

        }
        
    }

  }

  verifyTransaction(ref: any){
    let headers = new Headers({'Authorization':'Bearer sk_test_caf5e72696f7ad0b7ef3e3092bcbe9087044888c'});
    let options = new RequestOptions({headers: headers});

    return this.http.get('https://api.paystack.co/transaction/verify/'+ref, options)
    .map((response: Response) => response.json())
    .catch((err:any) => Observable.throw(err)); 

  }  

  sendSms(data:any){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });

    data.api_key = "4ed43f57";
    data.api_secret = "b881d6ee1dfcd331";

    return this.http.post('https://rest.nexmo.com/sms/json',data, options)
    .map((response: Response) => response.json())
    .catch((err:any) => Observable.throw(err)); 
  }
 

}