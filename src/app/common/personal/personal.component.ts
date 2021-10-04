import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/_models/user';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { AlertService } from 'src/app/_service/alert.service';
import { CommonService } from 'src/app/_service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  pageName='personal';
  currentUser: User;
  loading:boolean = true;
  datas : any;
  resData:any;
  form: FormGroup | any;
  submitted = false;
  uploading:boolean=false;
  active:any=0;
  constructor(  private alertService:AlertService,private formBuilder: FormBuilder,private location:Location,private route:Router,
    private authenticationService: AuthenticationService,private commonService:CommonService) {
      this.currentUser = this.authenticationService.currentUserValue;
     }

     ngOnInit(): void {
      this.form = this.formBuilder.group({
        name:['',Validators.required],
        phone:['',Validators.required],
        dob:['',Validators.required],
        city_id:['',Validators.required],
        height:['',Validators.required],
        home_town:['',Validators.required],
        hobbies:['',Validators.required],
        language_id:['',Validators.required]
      });
      this.loading = false;
      this.commonService.personal().subscribe(res => {
        this.loading = true;
        this.resData = res;   
        this.datas = this.resData.data;
        this.form.controls['language_id'].setValue(this.datas.language_id);
        this.form.controls['hobbies'].setValue(this.datas.hobbies);
        this.form.controls['home_town'].setValue(this.datas.home_town);
        this.form.controls['height'].setValue(this.datas.height);
        this.form.controls['city_id'].setValue(this.datas.city_id);
        this.form.controls['dob'].setValue(this.datas.dob);
        this.form.controls['phone'].setValue(this.datas.phone);
        this.form.controls['name'].setValue(this.datas.name);
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
        this.commonService.anatomyInnerUpdate(this.form.value).subscribe(
          data => {  
            this.uploading = false;     
            this.active=0;   
            this.alertService.success('Update Successfully',false);
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
