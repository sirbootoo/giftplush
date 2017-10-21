import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AuthenticateService } from '../../_services/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'signup.component.html',
    styleUrls: [
        '../../_content/css/style.css'
        ]
})
 
export class SignupComponent {
    merchant: any = false;
    user: any = true;
    loading = false;
    company: any;
    email: any;
    password: any;
    group_id: any;
    alert: any;
    alertClass: any;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticateService) { 
            this.route.data.subscribe( (data) => {
                
                var stat = this.route.snapshot.queryParams['status'] || "";
                if(stat === true){

                    this.alert = this.route.snapshot.queryParams['message'];
                    console.log(this.alert);
                    this.alertClass = "alert alert-success";
                    this.view(data);

                }else{
                    if(stat === false){

                        this.alert = this.route.snapshot.queryParams['message'];
                        this.alertClass = "alert alert-danger";
                        this.view(data);

                    }else{

                        this.view(data);
                        return true;

                    }
                }

            });
        }



    // Firebase
    signup(signupForm): void {
        this.loading = true;
        signupForm.value.slug = this.slugify(signupForm.value.company);
        console.log(signupForm.value);
        this.authService.emailSignUp(signupForm.value.email, signupForm.value.password, signupForm.value)
        .then((user) => {
            this.authService.emailVerify().then(() => {
                delete signupForm.value.password;
                if(typeof signupForm.value.group_id !== 'undefined'){
                    this.authService.updateBusinessData(signupForm.value);
                }else{
                    this.authService.updateUserData(signupForm.value);
                }

                this.alertClass = 'alert alert-success';
                this.loading = false;
                this.alert = 'A Verification Code Has Been Sent To Your Email Address, '+signupForm.value.email;
                
            }).catch(error => {
                this.alert = error;
                this.alertClass = 'alert alert-danger';
                this.loading = false;
            });
            
        })
        .catch(error => {
            console.log(error); 
            this.alert = error;
            this.alertClass = 'alert alert-danger';
            this.loading = false;
        });
    }
 

    // Php
    register(signupForm: any) {
        this.loading = true;
        this.authService.signup(signupForm.value)
            .subscribe( 
                data => {
                    console.log(data);
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    //this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    console.log(error);
                    //this.alertService.error(error);
                    this.loading = false;
                });
    }


    private view(data: any){
        switch(data.signup){
            case 'user':
                this.merchant = false;
                this.user = true;
                this.group_id = 2;

                break;
            case 'merchant':
                this.merchant = true;
                this.user = false;
                this.group_id = 3;

                break;
            default:
                this.router.navigate(['/signup/user']);
        }
    }

    slugify(str:any){
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
      
        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
    
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
    
        return str;
    }



}