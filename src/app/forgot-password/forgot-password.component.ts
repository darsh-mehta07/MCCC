import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
import { Config } from '../_config/config';
import { UserService } from '../_service/user.service';
import { AlertService } from '../_service/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup | any;
  submitted = false;
  responceData :any;

  constructor(
    private formBuilder: FormBuilder,
    private route : Router,
    private authenticationService: AuthenticationService,
    private userService:UserService,
    private alertService:AlertService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
         this.route.navigate([Config.AfterLogin]);
     }
 }

 ngOnInit(): void {
  this.form = this.formBuilder.group({
    email_or_mobile : ['',[Validators.required, Validators.email]]
  });
}
get f(): { [key: string]: AbstractControl } {
  return this.form.controls;
} 
submit(){
  this.submitted = true;
  if (this.form.invalid) {
    return;
  }else{   
    this.userService.forgot_password(this.form.value).pipe(first()).subscribe(res => {
     this.responceData = res;
     if(this.responceData.status == 'true' && this.responceData.token != ''){       
        this.route.navigate(['/reset-password',this.responceData.token]);
     }else{
      console.log('Hello forgot');
     }          
    });   
  }
}

}
