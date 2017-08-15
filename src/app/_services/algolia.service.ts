import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
 
@Injectable()
export class AlgoliaService {

  constructor(private http: Http){ 

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

    if (!localStorage.getItem('transaction')) {

        return localStorage.setItem('transaction', JSON.stringify(formData));

    }else{

        var sRF = formData.value; // Get the object of the form values.

        var trn = this.getTransactions(); // Get the object from the local storage.

        var mrgObj = Object.assign(sRF, trn); // Merge the two objects (the form data and the object from the local storage)

        return localStorage.setItem('transaction', JSON.stringify(mrgObj)); // Set the form data into the local storage.

    }

  }
 

}