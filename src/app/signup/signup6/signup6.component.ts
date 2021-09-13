import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{ AgeBetween13To54 } from "../../_helpers/custom-DOB.validator"
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';

@Component({
  selector: 'app-signup6',
  templateUrl: './signup6.component.html',
  styleUrls: ['./signup6.component.css']
})
export class Signup6Component implements OnInit {

  form: FormGroup | any;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private route : Router,private authenticationService: AuthenticationService,) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
         this.route.navigate([Config.AfterLogin]);
     }
 }
 
  ngOnInit(): void {    
    this.form = this.formBuilder.group({
      dob: [sessionStorage.getItem('dob'),Validators.required]
    }, {
      validator: AgeBetween13To54('dob')
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
        sessionStorage.setItem('dob',this.form.value.dob);
        this.route.navigate(['/signup-state-city']);
    }
  }

}
