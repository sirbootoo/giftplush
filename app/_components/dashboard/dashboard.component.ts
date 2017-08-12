import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Subscription } from 'rxjs/Subscription';

import {DashboardService, PubSubService} from '../../_services/index';

// import fade in animation
import { fadeInAnimation } from '../../_animations/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'dashboard.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation],

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class DashboardComponent implements OnInit {
    loading: any = false;
    check: any = true;
    charge: Boolean = false;
    userId: any;
    groupId: any;
    isMerchant: Boolean;
    isUser: Boolean;
    alert:Boolean = false;
    alerttxt:any;
    alertClass: any;
    vouchId:any;
    balance:any;
    tranSuccess:Boolean = false;
    canGoBack:Boolean = (this.check === true) ? false : true ;
    tableData:any;
    emptyTran:any = true;

    subscription: Subscription;


    constructor(title: Title, private dashboard: DashboardService, private pubSubService: PubSubService){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userId = currentUser.userid;
        this.groupId = currentUser.user.group_id;
        console.log(this.groupId);

        switch (this.groupId){
            case '3':
                this.isMerchant = true;
                this.isUser = false;
            break;

            case '2':
                this.isMerchant = false;
                this.isUser = true;
            break;

            default:
                this.isMerchant = false;
                this.isUser = false;
        }

        title.setTitle('Dashboard - Giftplush');

    }

    ngOnInit(){

        this.listTransactions();

        // reload products when updated
        this.subscription = this.pubSubService.on('products-updated').subscribe(() => {this.listTransactions(); console.log('working Updated');});
        
    }

    ngOnDestroy(){
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    goBack(){
        this.charge = false;
        this.check  = true;
        this.tranSuccess = false;
        this.alert = false;
    }

    checkValidity(voucherForm: any){

        this.loading = true;

        console.log(voucherForm.value);

        this.dashboard.checkVoucher(voucherForm.value).subscribe(data => {

            console.log(data);

            switch (data.status){
                case true:
                    this.loading = false;
                    this.check = false;
                    this.charge = true;
                    this.alert = false;
                    this.vouchId = data.message.id;
                    this.balance = data.message.balance;

                    break;
                case false:
                    this.loading = false;
                    this.alert = true;
                    this.alerttxt = data.message;
                    this.alertClass = 'alert-danger';

                    break;
                default:
                    this.loading = false;
                    this.alert = true;
                    this.alerttxt = data.message;
                    this.alertClass = 'alert-warning';

                    break;
            }


        }, error => {
            this.loading = false;
            this.alert = true;
            this.alerttxt = error;
            console.log(error);
        });

    }


    chargeVoucher(chargeForm: any){

        this.loading = true;
        console.log(chargeForm.value);

        if(chargeForm.value.amount > chargeForm.value.balance){
            this.loading = false;
            this.alert = true;
            this.alerttxt = 'Insufficient Funds';
            this.alertClass = 'alert-danger';
        }else{
            var datas = {
                'amount'    :  chargeForm.value.amount,
                'vouchId'   :  chargeForm.value.vouchId,
                'userid'    :  this.userId
            };

            this.dashboard.chargeVoucher(datas).subscribe(data => {
                
                console.log(data);
                
                switch (data.status){

                    case true:
                        this.loading = false;
                        this.tranSuccess = true;
                        this.alert = true;
                        this.alertClass = 'alert-success';
                        this.alerttxt = 'Transaction Successful... Voucher Successfully Debited';
                        this.charge = false;

                        break;

                    case false:
                        this.loading = false;
                        this.alert = true;
                        this.alertClass = 'alert-danger';
                        this.alerttxt = data.message;

                        break;

                }

                // publish event so list controller can refresh
                this.pubSubService.publish('voucher-redeemed');


            });
        }

    }

    listTransactions(){

        this.dashboard.listTransactions(this.userId).subscribe(data => {

            switch (data.status){
                case false:
                    this.tableData = data.message;
                    this.emptyTran = true;
                    console.log(this.tableData);

                    break;
                default:
                    this.tableData = data;
                    this.emptyTran = false;
                    console.log(this.tableData);
            }

        }, error => {
            console.log("Error: "+error);
        });

    }


}