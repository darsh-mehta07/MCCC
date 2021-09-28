import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OtpService } from 'src/app/_service/otp.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { PhoneExistsValidator } from 'src/app/_helpers/phone-exists-validator';

@Component({
  selector: 'app-signup3',
  templateUrl: './signup3.component.html',
  styleUrls: ['./signup3.component.css']
})
export class Signup3Component implements OnInit {

  form: FormGroup | any;
  submitted = false;
  otp : string = '1111';
  constructor(private phoneExists : PhoneExistsValidator,public otpService:OtpService,private formBuilder: FormBuilder, private route : Router,private authenticationService: AuthenticationService,) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
         this.route.navigate([Config.AfterLogin]);
     }
 }  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      phone : [sessionStorage.getItem('phone'), [Validators.required,Validators.pattern(/^-?(0|[1-9]{10}\d*)?$/)],this.phoneExists.validate.bind(this.phoneExists)]
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
      sessionStorage.setItem('phone',this.form.value.phone);
      this.otpService.get_response(Response).subscribe((res: any) => {
        // console.log(res.otp);
        this.otp = res.otp;
        sessionStorage.setItem('otp',this.otp);
        this.route.navigate(['/signup-otp']);
      });
    }
  }

}
