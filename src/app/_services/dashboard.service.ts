import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class DashboardService {

    base_url: string = 'https://api.giftplush.com/api/';
    currentUser: any = JSON.parse(localStorage.getItem('currentUser'));



    constructor(private http: Http) { }

    checkVoucher(user: any) {

        return this.http.get(this.base_url+'autho/checkvoucher?vouchercode='+user.voucher+'&userid='+this.currentUser.userid, this.jwt())
        .map((response: Response) => response.json())
        .catch((err:any) => Observable.throw(err));

    }    

    chargeVoucher(info: any){

        return this.http.get(this.base_url+'autho/chargevoucher?amount='+info.amount+'&vouchId='+info.vouchId+'&userid='+info.userIid, this.jwt())
        .map((response: Response) => response.json())
        .catch((err:any) => Observable.throw(err));

    }

    listTransactions(userid:any){
        return this.http.get(this.base_url+'autho/listtransactions/id/'+userid, this.jwt())
        .map((response: Response) => response.json())
        .catch((err:any) => Observable.throw(err));
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers();
            headers.append('Authorization', 'Bearer ' + currentUser.token);
            headers.append('Content-Type', 'application/json; charset=tf-8');
            return new RequestOptions({ headers: headers });
        }
    }


}