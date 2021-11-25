import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../../_helpers/must-match.validator';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';

@Component({
  selector: 'app-signup9',
  templateUrl: './signup9.component.html',
  styleUrls: ['./signup9.component.css']
})
export class Signup9Component implements OnInit {

  form: FormGroup | any;
  submitted = false;
  storePassword : any;
  constructor(private formBuilder: FormBuilder, private route : Router,private authenticationService: AuthenticationService,) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      let Auth =  JSON.stringify(this.authenticationService.currentUserValue.status);
      if(Auth){
          this.route.navigate([Config.AfterLogin]);
      }
     }
 } 

  ngOnInit(): void {    
    this.storePassword = sessionStorage.getItem('password');
    this.form = this.formBuilder.group({
      confirm_password: ['',Validators.required]
    }, {
      validator: MustMatch(this.storePassword,'confirm_password')
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
        sessionStorage.setItem('confirm_password',this.form.value.confirm_password);
        this.route.navigate(['/signup-terms']);
    }
  }

}
