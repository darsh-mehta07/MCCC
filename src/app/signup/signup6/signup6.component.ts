import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{ AgeBetween13To54 } from "../../_helpers/custom-DOB.validator";
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { DatePipe } from '@angular/common'

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import  *  as _rollupMoment from 'moment';

const moment = _rollupMoment || _moment;
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-signup6',
  templateUrl: './signup6.component.html',
  styleUrls: ['./signup6.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ],
})
export class Signup6Component implements OnInit {

  form: FormGroup | any;
  submitted = false;
  constructor(public datepipe: DatePipe,private formBuilder: FormBuilder, private route : Router,private authenticationService: AuthenticationService,) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      let Auth =  JSON.stringify(this.authenticationService.currentUserValue.status);
      if(Auth){
          this.route.navigate([Config.AfterLogin]);
      }
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
      let sdate:any = this.datepipe.transform(this.form.value.dob, 'yyyy-MM-dd');
        sessionStorage.setItem('dob',sdate);
        this.route.navigate(['/signup-state-city']);
    }
  }

}