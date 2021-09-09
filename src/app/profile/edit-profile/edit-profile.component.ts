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
  languages: any;
  responseData: any;
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private authenticationService: AuthenticationService,
    private dashboardService:DashboardService,
    private location:Location,
    private alertService: AlertService,
    private registerService: RegisterService,
    private formBuilder:FormBuilder,) {
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
    this.registerService.languages().pipe(first()).subscribe(res => {
      this.response = res;
      if (this.response.data !== 'undefined' && this.response.data.length > 0) {
        this.dataTrue = true;
        this.languages = this.response.data;
      } else {
        this.dataTrue = false;
      }
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
    this.form = this.formBuilder.group({
      name : [sessionStorage.getItem('name'),Validators.required],
      dob : [sessionStorage.getItem('age'),Validators.required],
      height : [sessionStorage.getItem('height'),Validators.required],
      phone : [sessionStorage.getItem('phone'),Validators.required],
      state : [sessionStorage.getItem('state_id'),Validators.required],
      language_id : [sessionStorage.getItem('language'),Validators.required],
      select_city : [sessionStorage.getItem('city_id'),Validators.required],
      home_town : [sessionStorage.getItem('home_town'),Validators.required],
      hobbies : [sessionStorage.getItem('hobbies'),Validators.required],
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
      this.dashboardService.editUserDetail(this.form.value).pipe(first()).subscribe(res=>{
        console.log(res);
      });
    }
  }
  changeSuit(e: any) {
    if (e.target.value > 0) {
      this.registerService.cities({ state_id: e.target.value }).pipe(first()).subscribe(res => {
        this.response = res;
        if (this.response.data !== 'undefined' && this.response.data.length > 0) {
          this.dataTrue = true;
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
