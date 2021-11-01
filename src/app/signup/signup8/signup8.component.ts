import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';

@Component({
  selector: 'app-signup8',
  templateUrl: './signup8.component.html',
  styleUrls: ['./signup8.component.css']
})
export class Signup8Component implements OnInit {

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
      password: ['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}') ]]
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
        sessionStorage.setItem('password',this.form.value.password);
        this.route.navigate(['/signup-confirm-password']);
    }
  }

}
