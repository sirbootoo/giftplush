import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import * as _ from 'lodash';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {algoliasearch} from "algoliasearch";

//Services
import {DashboardService, AuthenticateService} from '../../_services/index';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    imageId: string;
    loading: Boolean = false;
    imageLink: any;
    storeImgLink: string;
    DocImgLink: any;
    DocImgObj: any = [];
    lol: any;
    docsImg:any;
    storesImg: any;
    logo:any;
    alertTxt: any;
    alertClass: any;
    http: Http;
    selected: any;
    cat: Array<any> = [];
    catAlert: any;
    statez: Array<any> = [];
    lgas: Array<any> = [];
    address: any;
    selectState: any;
    selectLga: any;
    businessInfo: any;
    about: any;
    minAmount: any;

    items = ['birthday', 'wedding', 'Anniversary', 'of', 'string', 'element'];
    
    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: 'd1pf7fgmpy', uploadPreset: 'ditqnfv3' })
    );

    
   
    constructor(title: Title, public afAuth: AngularFireAuth, 
        private db: AngularFireDatabase,
        public router: Router, 
        private dash: DashboardService,
    private auth: AuthenticateService) {

        title.setTitle('Setting | Dashboard - Giftplush');

        /* var koo = localStorage.getItem('categories');
        this.cat = JSON.parse(koo); */

        this.db.list('/businessInfo', {
            query: {
                orderByChild: 'user_id',
                equalTo: this.auth.currentUserId
            }
        }).subscribe(data => {
            var lko = data[0].$key;
            this.db.list('/businessInfo/'+lko).subscribe(infos => {
                this.businessInfo = infos[2];
            });
            this.db.list('/businessInfo/'+lko+'/categories').subscribe(infos => {
                this.cat = infos;
                localStorage.setItem('categories', JSON.stringify(this.cat));
            });
            this.db.list('/businessInfo/'+lko+'/images').subscribe(infos => {
                this.logo = infos[0].$value;
                console.log(this.logo);
            });
            this.db.list('/businessInfo/'+lko+'/images/docs').subscribe(info => {
                this.docsImg = info;
            });
            this.db.list('/businessInfo/'+lko+'/images/store').subscribe(info => {
                this.storesImg = info;
            });
        });

        this.dash.states().subscribe(datas => {
            this.statez = datas.map(function (obj) {
                return obj.name;
            });
        });

    }

    ngOnInit() {

        /* var client = algoliasearch('BEIACNUX0H', 'AIzaSyCjcD3VQg18WVQn1zu-yf8aKrho6ebl8mM');
        var index = client.initIndex('giftplush_merchants'); */
        
    }

    valueChanged(newVal) {
       
        console.log(this.cat);
        if(this.cat.length >= 4){
            this.catAlert= 'You can only pick 4 categories';
            console.log(this.catAlert);
            
        }else{
            if (this.cat.indexOf(newVal) === -1) {
                this.cat.push(newVal);
                var cate = JSON.stringify(this.cat);
                localStorage.setItem('categories', cate);
            }
        }  
    }

    removeCategory(newVal){
        
        var len = this.cat.length;
        if(len <= 4){
            this.catAlert= '';
        }
        for (var i = 0; i < len; i++) {
            var cat = this.cat[i];
            if (cat === newVal) {
                this.cat.splice(i, 1);
                var cate = JSON.stringify(this.cat);
                localStorage.setItem('categories', cate);
                break;
            }
        }
    }

    uploadLogo() {
        this.loading = true;
        
        this.uploader.uploadAll();

        //Override onSuccessItem to retrieve the imageId
        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
            
            let res: any = JSON.parse(response);
            console.log(res);
            this.imageId = res.public_id;
            this.imageLink = res.secure_url;
            var lil = {
                logo: this.imageLink
            }

            var loc = null;

            this.updateToFirebase(lil, loc);

            this.loading = false;

            return { item, response, status, headers };

        };

        this.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

        
    }

    uploadDocs(){
        this.loading = true;
        
        this.uploader.uploadAll();

        //Override onSuccessItem to retrieve the imageId
        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
            let res: any = JSON.parse(response);
            this.loading = false;
            console.log(res);
            this.imageId = res.public_id;
            this.imageLink = res.secure_url;

            this.updateToFirebase(this.imageLink, 'docs');

            return { item, response, status, headers };
        };

        this.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
    }

    uploadStorePics(){
        this.loading = true;
        
        this.uploader.uploadAll();

        //Override onSuccessItem to retrieve the imageId
        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
            let res: any = JSON.parse(response);
            this.loading = false;
            console.log(res);
            this.imageId = res.public_id;
            this.imageLink = res.secure_url;

            this.updateToFirebase(this.imageLink, 'stores');

            return { item, response, status, headers };
        };

        this.uploader.onErrorItem = function(fileItem, response, status, headers) {
            this.loading = false;
            console.info('onErrorItem', fileItem, response, status, headers);
        };
    }

    updateInfo(updateForm: any){
        var koo = localStorage.getItem('categories');
        var goo = JSON.parse(koo);
        console.log(goo);
        var obj = this.cat.reduce(function(acc, cur, i) {
            acc[i] = cur;
            return acc;
        }, {});

        console.log(obj);

        let dataz = {
            address: updateForm.value.address,
            state: updateForm.value.selectState,
            lga: updateForm.value.selectLga,
            categories: obj,
            about: updateForm.value.about,
            minAmount: updateForm.value.minAmount
        }
        console.log(dataz);

        var loc = 'none';

        this.updateToFirebase(dataz, loc);        

    }

    updateToFirebase(data, loc?:any){

        var user = JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyCjcD3VQg18WVQn1zu-yf8aKrho6ebl8mM:heisenberg'));
        
        this.db.list('/businessInfo', {
            query: {
              orderByChild: 'user_id',
              equalTo: this.auth.currentUserId
            }
          }).subscribe(snapshot => {
            console.log(snapshot);
            //this.index = snapshot[type];
            var lko = snapshot[0].$key;

            if(loc === 'none'){

                this.db.object('/businessInfo/'+lko).update(data).then((lo) => {
                    console.log('Updating Business Info');
                    console.log(lo);
                    this.alertClass = 'alert alert-success';
                    this.alertTxt = 'Business Info Updated Successfully';
                });

            }else{

                if(loc !== null){
                    this.db.list('/businessInfo/'+lko+'/images/'+loc).push(data).then((da) => {
                        console.log('worked');
                        console.log(da);
                        this.alertClass = 'alert alert-success';
                        this.alertTxt = 'Documents Successfully Uploaded';
                    });
                }else{
                    this.db.list('/businessInfo/'+lko).update('images', data).then((lo) => {
                        console.log('worked');
                        console.log(lo);
                        this.alertClass = 'alert alert-success';
                        this.alertTxt = 'Logo Successfully Uploaded';
                    });
                }

            }
            
        }, err => {
            console.log(err);
            this.alertClass = 'alert alert-danger';
            this.alertTxt = 'Something Went Wrong! ... Please Try Again!';
        });

    }

    lga(state: any){
        this.dash.lga(state).subscribe(data => {
            this.lgas = data;
        });
    }

}
