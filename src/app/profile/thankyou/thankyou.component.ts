import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import { User } from '../../_models/user';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  currentUser: User;
  socialloginType : boolean  = false;
  constructor(private authenticationService: AuthenticationService, private route: Router) {
    this.currentUser = this.authenticationService.currentUserValue;
    // redirect to home if already logged in
    if (sessionStorage.getItem('social_login') === 'true') {
      this.socialloginType = true;
      console.log('social login');
      if (sessionStorage.getItem('profile_status') === 'true') {
        this.route.navigate([Config.AfterLogin]);
      }
    } else {
      this.socialloginType = false;
      console.log('normal login');
      if (this.authenticationService.currentUserValue) {
        if (sessionStorage.getItem('profile_status') === 'true') {
          this.route.navigate([Config.AfterLogin]);
        }
      } else {
        this.socialloginType = false;
        this.route.navigate(['/signin']);
      }
    }
  }

  ngOnInit(): void {
    sessionStorage.setItem('profile_status', 'true')
  }
  relogin(){    
    this.authenticationService.re_social_login({email:this.currentUser.userDetails.email,name:this.currentUser.userDetails.name,provider_name:this.currentUser.userDetails.provider_name,client_id:this.currentUser.userDetails.client_id})
    .subscribe(
      data => {
            console.log('relogin : ',data);
            sessionStorage.setItem('name',data.userDetails.name);
            sessionStorage.setItem('dob',data.userDetails.dob);
            if(data.userDetails.height != null && data.userDetails.height != ''){
            sessionStorage.setItem('height',data.userDetails.height);
            }
            sessionStorage.setItem('phone',data.userDetails.phone);
            if(data.userDetails.language_id != null && data.userDetails.language_id != ''){
            sessionStorage.setItem('language_id',data.userDetails.language_id);
            }
            sessionStorage.setItem('city_id',data.userDetails.city_id);
            sessionStorage.setItem('city',data.userDetails.city);
            sessionStorage.setItem('state_id',data.userDetails.state_id);
            if(data.userDetails.home_town != null && data.userDetails.home_town != ''){
              sessionStorage.setItem('home_town',data.userDetails.home_town);
            }
            if(data.userDetails.hobbies != null && data.userDetails.hobbies != ''){
              sessionStorage.setItem('hobbies',data.userDetails.hobbies);
            }
            this.route.navigate(['/home']);          
      },
      error => {
        console.log('relogin error');
      });
  }
  homePage(){
    this.route.navigate(['/home']);     
  }
}
