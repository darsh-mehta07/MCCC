import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';

@Component({
  selector: 'app-signup5',
  templateUrl: './signup5.component.html',
  styleUrls: ['./signup5.component.css']
})
export class Signup5Component implements OnInit {  
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
      gender: ['',Validators.required]
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
        sessionStorage.setItem('gender',this.form.value.gender);
        this.route.navigate(['/signup-dob']);
    }
  }

}
