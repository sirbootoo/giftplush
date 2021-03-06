﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from "@angular/platform-browser";

import { AlertService, AuthenticateService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: [
        '../../_content/css/style.css'
        ]
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    username: any;
    password: any;
    alert: any;
    alertClass: any;

    constructor(meta: Meta, title: Title,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticateService,
        private alertService: AlertService) {

            title.setTitle('Login - Giftplush');

            meta.addTags([
                { name: 'author',   content: 'Giftplush'},
                { name: 'keywords', content: 'wishlist, weddings wishlist, birthday wishlist, gifts'},
                { name: 'description', content: "Tired of getting gifts you don't need ? Giftplush wishlist helps you eradicate unneeded gifts" }
            ]);
        }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login(loginForm:any) {
        this.loading = true;
        console.log("Username - "+loginForm.value.username+" Password - "+loginForm.value.password);
        this.authService.login(loginForm.value.username, loginForm.value.password)
            .subscribe(
                data => {
                    this.alertService.success('Login Succesful');
                    this.loading = false;
                    (this.returnUrl) ? this.router.navigate([this.returnUrl]) : this.router.navigate(['/dashboard/settings']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    console.log(error);
                });
    }


    signin(loginForm: any){ 
        this.loading = true;
        this.authService.emailLogin(loginForm.value.username, loginForm.value.password)
        .then((user) => {
            console.log(user.uid+ ' Logged In');
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.loading = false;
            this.router.navigate([this.returnUrl]);
        })
        .catch(error => {
            console.log(error); 
            this.alert = error;
            this.alertClass = 'alert alert-danger';
            this.loading = false;
        });
    }





}
