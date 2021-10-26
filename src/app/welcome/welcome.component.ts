import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { UserService } from '../_service/user.service';
import { first } from 'rxjs/operators';
import { NotificationService } from '../_service/notification.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  loginForm: FormGroup | undefined;
  socialUser: SocialUser | undefined;
  isLoggedin: boolean | undefined;
  socialLoginResponce : any;
  localData : any;  
   constructor(
     private socialAuthService: SocialAuthService,
     private formBuilder: FormBuilder,
     private route : Router,
     private authenticationService: AuthenticationService,
     private userService : UserService,
     private notification :NotificationService
     ) {     
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
         this.route.navigate([Config.AfterLogin]);
     }
 }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }); 
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser.provider);      
      if(this.socialUser.provider === 'GOOGLE'){                
        this.authenticationService.social_login({
          provider_name:this.socialUser.provider,
          client_id:this.socialUser.id,
          email:this.socialUser.email,
          name:this.socialUser.name}).pipe(first())
          .subscribe(res=>{
            this.socialLoginResponce = res;
            if(this.socialLoginResponce.status === "true"){               
              localStorage.setItem('currentUser', JSON.stringify(this.socialLoginResponce));
              if(this.socialLoginResponce.profileStatus === "true"){
                this.route.navigate(['/home']);
              }else{
                sessionStorage.setItem('social_login','true');
                sessionStorage.setItem('profile_status','false');
              this.route.navigate(['/profile_first_step']);
              }
              
            }else{
              console.log("response message : "+JSON.stringify(this.socialLoginResponce));
              this.notification.showError(this.socialLoginResponce.message,'Mccc');
              this.socialAuthService.signOut();
            }   
            
        },error=> {
          this.notification.showError(error,'Mccc');          
        });        
      }else if(this.socialUser.provider === 'FACEBOOK'){
        this.authenticationService.social_login({
          provider_name:this.socialUser.provider,
          client_id:this.socialUser.id,
          email:this.socialUser.email,
          name:this.socialUser.name}).pipe(first())
          .subscribe(res=>{
            this.socialLoginResponce = res;
            if(this.socialLoginResponce.status === "true"){     
              localStorage.setItem('currentUser', JSON.stringify(this.socialLoginResponce));                       
              if(this.socialLoginResponce.profileStatus === "true"){
                this.route.navigate(['/home']);
              }else{
                sessionStorage.setItem('social_login','true');
                sessionStorage.setItem('profile_status','false');
              this.route.navigate(['/profile_first_step']);
              }
            }else{              
              this.notification.showError(this.socialLoginResponce.message,'Mccc');
              this.socialAuthService.signOut();
            }  
        },error=> {
          this.notification.showError(error,'Mccc');          
        });
      }      
    });
  } 
  
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }
  signup(){
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('phone');
    sessionStorage.removeItem('otp');
    sessionStorage.removeItem('gender');
    sessionStorage.removeItem('dob');
    sessionStorage.removeItem('state');
    sessionStorage.removeItem('city');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('confirm_password');
    this.route.navigate(['/signup-name']);
  }
}
