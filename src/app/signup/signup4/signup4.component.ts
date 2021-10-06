import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../../_helpers/must-match.validator';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { OtpService } from 'src/app/_service/otp.service';


@Component({
  selector: 'app-signup4',
  templateUrl: './signup4.component.html',
  styleUrls: ['./signup4.component.css']
})
export class Signup4Component implements OnInit {

  form: FormGroup | any;
  submitted = false;
  storeOTP : any;
  otp : string = '1111';
  constructor(public otpService:OtpService, private formBuilder: FormBuilder, private route : Router,private authenticationService: AuthenticationService,) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
         this.route.navigate([Config.AfterLogin]);
     }
 }

  ngOnInit(): void {
    this.storeOTP = sessionStorage.getItem('otp');
    this.form = this.formBuilder.group({
      otp : ['', [Validators.required ,Validators.max(9999),Validators.min(1000)]]
    }, {
      validator: MustMatch(this.storeOTP,'otp')
  });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 
  resendOTP(){
    this.otpService.get_resendotp({phone:sessionStorage.getItem('phone')}).subscribe((res: any) => {      
      this.otp = res.otp;
      sessionStorage.setItem('otp',this.otp);
      this.ngOnInit();
    });
  }
  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }else{        
        sessionStorage.setItem('otp',this.form.value.otp);
        this.route.navigate(['/signup-gendar']);
    }
  }
}
