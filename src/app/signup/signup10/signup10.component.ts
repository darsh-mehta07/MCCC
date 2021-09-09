import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/_service/register.service';
import { UserService } from 'src/app/_service/user.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { ModalService } from 'src/app/_service/modal.service';
import { AlertService } from 'src/app/_service/alert.service';

@Component({
  selector: 'app-signup10',
  templateUrl: './signup10.component.html',
  styleUrls: ['./signup10.component.css']
})
export class Signup10Component implements OnInit {

  form: FormGroup | any;
  submitted = false;
  data :any;
  loading = false;
  all_terms : any;
  terms :any;
  
  constructor(
    private formBuilder: FormBuilder,
    private route : Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    public registerService : RegisterService,
    public modalService : ModalService,
    private alertService : AlertService
    ){
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
         this.route.navigate([Config.AfterLogin]);
     }
 }

  ngOnInit(): void {  
    //get the terms from the server
    this.registerService.terms().pipe(first()).subscribe(
      data => {
        this.all_terms = data;
        this.terms = this.all_terms.firstFourTerms;
      },error => {
        this.alertService.error(error);
          this.loading = false;
      });
    this.form = this.formBuilder.group({
      name : [sessionStorage.getItem('name')],
      email:[sessionStorage.getItem('email')],
      phone:[sessionStorage.getItem('phone')],
      password:[sessionStorage.getItem('password')],
      confirm_password:[sessionStorage.getItem('confirm_password')],
      dob:[sessionStorage.getItem('dob')],
      gender:[sessionStorage.getItem('gender')],
      select_state:[sessionStorage.getItem('state')],
      select_city:[sessionStorage.getItem('city')],
      terms0: [sessionStorage.getItem('terms0'),Validators.required],
      terms1: [sessionStorage.getItem('terms1'),Validators.required],
      terms2: [sessionStorage.getItem('terms2'),Validators.required],
      terms3: [sessionStorage.getItem('terms3'),Validators.required]
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
        this.loading = true;
        this.registerService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {                    
                    this.route.navigate(['/signup-success']);
                },
                error => {
                  // console.log('Registration successful',error.error.message);
                  this.alertService.error(error.error.message,true);
                    this.loading = false;
                });      
    }
  }
  openModal(content:any){
    this.modalService.triggerModal(content);
  }  
}
