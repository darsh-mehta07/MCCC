import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_service/authentication.service';
import { AlertService } from '../_service/alert.service';
import { Config } from '../_config/config';
import { DashboardService } from '../_service/dashboard.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  submitted : boolean = false;
  signinForm : FormGroup | any;
  loading = false;
  returnUrl: string | undefined;
  splaceScreen : any = 0;
  constructor(private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private dashboardService:DashboardService) {
       // redirect to home if already logged in
       if (this.authenticationService.currentUserValue) {
        let Auth =  JSON.stringify(this.authenticationService.currentUserValue.status);
        if(Auth === 'true'){
            this.router.navigate([Config.AfterLogin]);
        }
        }
     }

  ngOnInit(): void {
    
    this.signinForm  = this.formBuilder.group({
      email_or_mobile: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['/home'] || '/';
  }
  get f() { return this.signinForm?.controls; }
  onSubmit(){
    this.submitted = true;  
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.signinForm?.invalid) {
        return;
    }
    this.loading = true;
        this.authenticationService.login(this.f.email_or_mobile.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  if(data.status === 'false'){
                    this.signinForm.controls['password'].setErrors({'incorrect': true});
                  }else{
                    sessionStorage.setItem('profile_status',data.profileStatus);
                    // console.log("login data :" + JSON.stringify(data));
                    if(data.profileStatus === 'false'){
                      this.router.navigate(['/profile_first_step']);
                    }else{
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
                      this.splaceScreen = data.splashScreen;
                      if(this.splaceScreen == 1){
                        this.dashboardService.filter('applyed');
                        this.router.navigate(['/splash1']);
                      }else{                        
                        this.router.navigate(['/home']);                        
                      }
                    }
                  }
                },
                error => {
                  this.alertService.error(error);
                  this.loading = false;
                });
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
    this.router.navigate(['/signup-name']);
  }

}
