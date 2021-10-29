import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { EmailExistsValidator } from 'src/app/_helpers/email-exists-validator';
import { RegisterService } from 'src/app/_service/register.service';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.css']
})
export class Signup2Component implements OnInit {
  form: FormGroup | any;
  submitted :boolean = false;
  emailTaken :boolean = false;
  emailExist :boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route : Router,
    private authenticationService: AuthenticationService,
    private emailExists : EmailExistsValidator,
    private registerService : RegisterService,
    ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
         this.route.navigate([Config.AfterLogin]);
     }
 }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : [sessionStorage.getItem('email'),[
        Validators.required,
        // Validators.email,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]]
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
      this.emailTaken = true;
      this.registerService.isEmailcheck(this.form.value).subscribe(
        data => {
          if(!data){
            this.emailExist = false;
            this.emailTaken = false;
            sessionStorage.setItem('email',this.form.value.email);
            this.route.navigate(['/signup-phone']);
          }else{
            this.emailExist = true;
            this.emailTaken = false;
          }
        });
    }
    
  }
  inputchange(){
    console.log("Input change");
    this.emailExist = false;
    this.emailTaken = false;
  }
}
