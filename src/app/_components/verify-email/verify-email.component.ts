import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticateService } from '../../_services/index';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
  private auth: AuthenticateService) {

    let emailCode = this.route.snapshot.queryParams['oobCode'];
    let mode = this.route.snapshot.queryParams['mode'];

    console.log(emailCode);

    var info = JSON.parse(localStorage.getItem('verifyInfo')) || {};

    this.auth.verifyEmail(emailCode).then((success) => {
      if(typeof info.group_id !== 'undefined'){
        
        this.router.navigate(['/signup/merchant', { message: success.message, status: 'true' }]);
        return true;
      }else{
          
          this.router.navigate(['/signup/user', { message: success.message, status: 'true' }]);
          return true;
      }
    }).catch(error => {
      console.log(error);
      if(typeof info.group_id !== 'undefined'){
        this.router.navigate(['/signup/merchant', { message: error.message, status: 'false'}]);
      }else{
        this.router.navigate(['/signup/user', { message: error.message, status: 'false' }]);
      }
      
    });

   }

  ngOnInit() {
  }

}
