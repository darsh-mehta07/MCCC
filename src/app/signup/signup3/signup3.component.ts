import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OtpService } from 'src/app/_service/otp.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { PhoneExistsValidator } from 'src/app/_helpers/phone-exists-validator';
import { RegisterService } from 'src/app/_service/register.service';

@Component({
  selector: 'app-signup3',
  templateUrl: './signup3.component.html',
  styleUrls: ['./signup3.component.css']
})
export class Signup3Component implements OnInit {

  form: FormGroup | any;
  submitted = false;
  otp : string = '1111';
  phoneTaken :boolean = false;
  phoneExist :boolean = false;
  constructor(private registerService : RegisterService,private phoneExists : PhoneExistsValidator,public otpService:OtpService,private formBuilder: FormBuilder, private route : Router,private authenticationService: AuthenticationService,) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
         this.route.navigate([Config.AfterLogin]);
     }
 }  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      phone : [sessionStorage.getItem('phone'), [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email : [sessionStorage.getItem('email')]
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
      
      this.phoneTaken = true;
      this.registerService.isPhonecheck(this.form.value).subscribe(
        data => {
          if(!data){
            sessionStorage.setItem('phone',this.form.value.phone);
            this.otpService.get_response(this.form.value).subscribe((res: any) => {
              // console.log(res.otp);
              this.otp = res.otp;
              if(res.status && res.code == 200){
                this.phoneExist = false;
                this.phoneTaken = false;
                sessionStorage.setItem('otp',this.otp);
                this.route.navigate(['/signup-otp']);
              }        
            });
          }else{
            this.phoneExist = true;
            this.phoneTaken = false;
          }
        });
    }
  }
  inputchange(){
    console.log("Input change");
    this.phoneExist = false;
    this.phoneTaken = false;
  }
}
