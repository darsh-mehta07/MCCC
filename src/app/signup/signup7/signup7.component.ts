import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { RegisterService } from 'src/app/_service/register.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_service/alert.service';
import { faCity } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup7',
  templateUrl: './signup7.component.html',
  styleUrls: ['./signup7.component.css']
})
export class Signup7Component implements OnInit {
  emailTaken :boolean = false;
  emailExist :boolean = false;
  form: FormGroup | any;
  submitted = false;
  loading = false;
  states : any;
  cities : any;
  dataTrue = false;
  response : any;
  statesTrue = false;
  city:boolean = true;
  state:boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private route : Router,
    private authenticationService: AuthenticationService,
    private registerService : RegisterService,
    private alertService : AlertService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
         this.route.navigate([Config.AfterLogin]);
     }
     this.registerService.state().pipe(first()).subscribe(res=>{          
      this.response = res;
      if(this.response.data !== 'undefined' && this.response.data.length > 0){
        this.dataTrue = true;
        this.states = this.response.data;  
      }else{
        this.dataTrue = false;
      }          
  },error=>{
    this.alertService.error(error);
    this.loading = false;
  });
 }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      state: [sessionStorage.getItem('state'),Validators.required],
      city: [sessionStorage.getItem('city'),Validators.required]
    });
      
      if(sessionStorage.getItem('state') != undefined && sessionStorage.getItem('state') != ''){
        this.registerService.cities({state_id:sessionStorage.getItem('state')}).pipe(first()).subscribe(res=>{
          this.response = res;
          if(this.response.data !== 'undefined' && this.response.data.length > 0){
            this.dataTrue = true;
            this.cities = this.response.data;  
          }else{
            this.dataTrue = false;
          }        
        },error=>{
          this.alertService.error(error);
          this.loading = false;
        });
      }
  }
  changeSuit(e:any) {
    if(e.target.value > 0){
      this.statesTrue = true;
      this.emailTaken = true;
      this.registerService.cities({state_id:e.target.value}).pipe(first()).subscribe(res=>{
        this.response = res;
        if(this.response.data !== 'undefined' && this.response.data.length > 0){
          this.emailExist = false;
          this.emailTaken = false;
          this.dataTrue = true;
          this.cities = this.response.data;  
        }else{
          this.emailExist = true;
            this.emailTaken = false;
          this.dataTrue = false;
        }
      },error=>{
        this.emailExist = true;
            this.emailTaken = false;
        this.alertService.error(error);
        this.loading = false;
      });
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 
  submit(){
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }else{
        sessionStorage.setItem('state',this.form.value.state);
        sessionStorage.setItem('city',this.form.value.city);
        this.route.navigate(['/signup-password']);
    }
  }
  stateClick(){
    this.state = false;
  }
  cityClick(){
    this.city = false;
  }

}
