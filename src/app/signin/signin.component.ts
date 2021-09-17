import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_service/authentication.service';
import { AlertService } from '../_service/alert.service';
import { Config } from '../_config/config';

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
  constructor(private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
       // redirect to home if already logged in
       if (this.authenticationService.currentUserValue) {
            this.router.navigate([Config.AfterLogin]);
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
                      this.router.navigate(['/home']);
                    }
                  }
                },
                error => {
                  this.alertService.error(error);
                  this.loading = false;
                });
  }

}
