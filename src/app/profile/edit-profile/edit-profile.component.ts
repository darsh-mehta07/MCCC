import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_service/alert.service';
import { RegisterService } from 'src/app/_service/register.service';
import { NotificationService } from 'src/app/_service/notification.service';
import { PhoneExistsValidator } from 'src/app/_helpers/phone-exists-validator';
import{ AgeBetween13To54 } from "../../_helpers/custom-DOB.validator";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  castingId:any;
  resData:any;
  baseUrl :string = Config.Host+'backend2/';
  userdetail:any;
  form: FormGroup | any;
  submitted = false;
  age:any;
  loading = false;
  dataTrue = false;
  response: any;
  states: any;
  cities: any;
  city:any;
  languages: any;
  responseData: any;
  cityVisible:boolean = true;
  language_ids :any;
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private authenticationService: AuthenticationService,
    private dashboardService:DashboardService,
    private location:Location,
    private alertService: AlertService,
    private registerService: RegisterService,
    private formBuilder:FormBuilder,
    private notification:NotificationService,
    private phoneExists : PhoneExistsValidator
    ) {
    } 
  ngOnInit(): void {    
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.castingId = params.get('id');
    });
    this.registerService.state().pipe(first()).subscribe(res => {
      this.response = res;
      if (this.response.data !== 'undefined' && this.response.data.length > 0) {
        this.dataTrue = true;
        this.states = this.response.data;
      } else {
        this.dataTrue = false;
      }
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
    this.city = sessionStorage.getItem('city');    
    this.registerService.languages().pipe(first()).subscribe(res => {
      this.response = res;
      if (this.response.data !== 'undefined' && this.response.data.length > 0) {
        this.dataTrue = true;
        this.languages = this.response.data;
        let lanstr:any = sessionStorage.getItem('language_id');
        this.language_ids = lanstr.split(',');
      } else {
        this.dataTrue = false;
      }
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
    this.form = this.formBuilder.group({
      name : [sessionStorage.getItem('name'),[Validators.required,Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')]],
      dob : [sessionStorage.getItem('dob'),Validators.required],
      height : [sessionStorage.getItem('height'),[Validators.required,Validators.pattern("^[0-9]*$")]],
      phone : [sessionStorage.getItem('phone'),[Validators.required,Validators.pattern(/^-?(0|[1-9]{10}\d*)?$/)]],
      state : [sessionStorage.getItem('state_id'),Validators.required],
      language_id : [sessionStorage.getItem('language_id'),Validators.required],
      select_city : [sessionStorage.getItem('city_id'),Validators.required],
      home_town : [sessionStorage.getItem('home_town'),Validators.required],
      hobbies : [sessionStorage.getItem('hobbies'),Validators.required],
    },{
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
      this.loading = true;
      this.dashboardService.editUserDetail(this.form.value).pipe(first()).subscribe(res=>{
        this.loading = false;
        this.resData = res;
        this.age = this.resData.data.age; 
        this.userdetail = this.resData.data.user_details;
        this.notification.showSuccess('Profile Updated Successfully.','');
          sessionStorage.setItem('name',this.userdetail.name);
          sessionStorage.setItem('age',this.age);
          sessionStorage.setItem('dob',this.userdetail.dob);
          sessionStorage.setItem('height',this.userdetail.height);
          sessionStorage.setItem('phone',this.userdetail.phone);
          sessionStorage.setItem('language_id',this.userdetail.language_id);
          sessionStorage.setItem('language',this.userdetail.language);
          sessionStorage.setItem('city',this.userdetail.city_name);
          sessionStorage.setItem('city_id',this.userdetail.city_id);
          sessionStorage.setItem('state_id',this.userdetail.state_id);
          sessionStorage.setItem('home_town',this.userdetail.home_town);
          sessionStorage.setItem('hobbies',this.userdetail.hobbies);        
      },error=>{
        this.loading = false;
      });
    }
  }
  changeSuit(e: any) {
    if (e.target.value > 0) {
      this.registerService.cities({ state_id: e.target.value }).pipe(first()).subscribe(res => {
        this.response = res;
        if (this.response.data !== 'undefined' && this.response.data.length > 0) {
          this.dataTrue = true;
          this.cityVisible = false;
          this.cities = this.response.data;
        } else {
          this.dataTrue = false;
        }
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });
    }
  }
  back(): void {
    this.location.back()
  } 

}
