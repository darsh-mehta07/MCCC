import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';

@Component({
  selector: 'app-signup1',
  templateUrl: './signup1.component.html',
  styleUrls: ['./signup1.component.css']
})
export class Signup1Component implements OnInit {
  form: FormGroup | any;
  submitted = false;

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
    this.form = this.formBuilder.group({
      name : [sessionStorage.getItem('name'),[Validators.required,Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')]]
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
      console.log("name else");
      sessionStorage.setItem('name',this.form.value.name);
      this.route.navigate(['/signup-email']);
    }
  }

}
