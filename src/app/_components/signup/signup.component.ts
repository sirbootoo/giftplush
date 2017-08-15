import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AlertService, AuthenticateService } from '../../_services/index';
 
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
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticateService,
        private alertService: AlertService) { 
            this.route.data.subscribe( (data) => {

                console.log(data);

                switch(data.signup){
                    case 'user':
                        this.merchant = false;
                        this.user = true;

                        break;
                    case 'merchant':
                        this.merchant = true;
                        this.user = false;

                        break;
                    default:
                        this.router.navigate(['/signup/user']);
                }

            });
        }
 
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
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}