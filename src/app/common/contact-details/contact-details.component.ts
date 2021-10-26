import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/_service/common.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailExistsValidator } from 'src/app/_helpers/email-exists-validator';
import { PhoneExistsValidator } from 'src/app/_helpers/phone-exists-validator';
import { AlertService } from 'src/app/_service/alert.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  addressold:any;
  pageName = "contact-details";
  currentUser: User;
  loading:boolean = true;
  datas : any;
  resData:any;
  form: FormGroup | any;
  submitted = false;
  uploading:boolean=false;
  active:any=0;
  
  constructor(  private alertService:AlertService,private phoneExists : PhoneExistsValidator,private emailExists : EmailExistsValidator,private formBuilder: FormBuilder,private location:Location,private route:Router,
    private authenticationService: AuthenticationService,private commonService:CommonService) {
      this.currentUser = this.authenticationService.currentUserValue;
     }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      phone : ['', [Validators.required,Validators.pattern(/^-?(0|[1-9]{10}\d*)?$/)],this.phoneExists.validate.bind(this.phoneExists)],
      email : ['',[
        Validators.required,
        Validators.email,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      address:['',Validators.required]
    });
    this.loading = false;
    this.commonService.userDisplayContactDetail().subscribe(res => {
      this.loading = true;
      this.resData = res;   
      this.datas = this.resData.data;
      this.form.controls['phone'].setValue(this.datas.phone);
      this.form.controls['email'].setValue(this.datas.email);
      this.form.controls['address'].setValue(this.datas.address);
      this.addressold = this.datas.address;
    },error=>{
      this.loading = false;
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
      this.uploading = true;
      this.active=1;
      this.commonService.userUpdateContactDetail(this.form.value).subscribe(
        data => {  
          this.uploading = false;     
          this.active=0;   
          this.alertService.success('Update Successfully',false);
          console.log(JSON.stringify(data));  
        },
        error => {
          this.alertService.error(error.error.message,true);
            this.uploading = false;
            this.active=0;
        }); 
    }
  }
  back(): void {
    this.location.back();
  }

}
