import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch,SecurityCheck } from '../_helpers/must-match.validator';
import { AuthenticationService } from '../_service/authentication.service';
import { OtpService } from '../_service/otp.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  form: FormGroup | any;
  submitted = false;
  storeOTP : any;
  otp : string = '1111';
  constructor(public otpService:OtpService,private formBuilder: FormBuilder, private route : Router,private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.storeOTP = sessionStorage.getItem('otp');
    this.form = this.formBuilder.group({
      otp : ['', [Validators.required ,Validators.max(9999),Validators.min(1000)]]
    }, {
      validator: SecurityCheck(this.storeOTP,'otp')
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

        this.route.navigate(['/logo']);
    }
  }
}
