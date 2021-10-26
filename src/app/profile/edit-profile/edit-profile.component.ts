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
    this.userProfile();
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
    
    this.form = this.formBuilder.group({
      name : ['',[Validators.required,Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')]],
      dob : ['',Validators.required],
      height : ['',[Validators.required,Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
      phone : ['',[Validators.required]],
      state : ['',Validators.required],
      language_id : ['',Validators.required],
      select_city : ['',Validators.required],
      home_town : ['',Validators.required],
      hobbies : ['',Validators.required],
    },{
      validator: AgeBetween13To54('dob')
  });   
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 
  userProfile(){
    this.dashboardService.userDetailsForPeofile()
        .subscribe(res => {
          this.resData = res; 
          this.userdetail = this.resData.data.user_details;
          this.form.controls['name'].setValue(this.userdetail.name);
          this.form.controls['dob'].setValue(this.userdetail.dob);
          this.form.controls['height'].setValue(this.userdetail.height);
          this.form.controls['phone'].setValue(this.userdetail.phone);
          this.form.controls['language_id'].setValue(this.userdetail.language_id);
          this.form.controls['select_city'].setValue(this.userdetail.city_id);
          this.form.controls['state'].setValue(this.userdetail.state_id);
          this.form.controls['home_town'].setValue(this.userdetail.home_town);
          this.form.controls['hobbies'].setValue(this.userdetail.hobbies);


          // sessionStorage.setItem('name',this.userdetail.name);
          // sessionStorage.setItem('dob',this.userdetail.dob);
          // sessionStorage.setItem('height',this.userdetail.height);
          // sessionStorage.setItem('phone',this.userdetail.phone);
          sessionStorage.setItem('language_id',this.userdetail.language_id);
          // sessionStorage.setItem('language',this.userdetail.language);
          sessionStorage.setItem('city',this.userdetail.city_name);
          // sessionStorage.setItem('city_id',this.userdetail.city_id);
          sessionStorage.setItem('state_id',this.userdetail.state_id);
          // if(this.userdetail.home_town != null && this.userdetail.home_town != '' && this.userdetail.home_town != 'null'){
          //   sessionStorage.setItem('home_town',this.userdetail.home_town);
          // }
          // if(this.userdetail.hobbies != null && this.userdetail.hobbies != ''){
          //   sessionStorage.setItem('hobbies',this.userdetail.hobbies);
          // }
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
        });
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
        this.userdetail = this.resData.data;
        this.notification.showSuccess('Profile Updated Successfully.','');
          sessionStorage.setItem('name',this.form.value.name);
          // sessionStorage.setItem('age',this.age);
          sessionStorage.setItem('dob',this.form.value.dob);
          sessionStorage.setItem('height',this.form.value.height);
          sessionStorage.setItem('phone',this.form.value.phone);
          // sessionStorage.setItem('language_id',this.userdetail.language_id);
          // sessionStorage.setItem('language',this.userdetail.language);
          sessionStorage.setItem('city',this.userdetail.city_name);
          sessionStorage.setItem('city_id',this.userdetail.city);
          sessionStorage.setItem('state_id',this.userdetail.state);
          // if(this.userdetail.home_town != null && this.userdetail.home_town != ''){
            sessionStorage.setItem('home_town',this.form.value.home_town);
          // }
          // if(this.userdetail.hobbies != null && this.userdetail.hobbies !=''){
            sessionStorage.setItem('hobbies',this.form.value.hobbies);
          // }     
          this.dashboardService.filter('applyed');
      },error=>{
        this.loading = false;
      });
    }
  }
  changeSuit(e: any) {
    if (e.target.value > 0) {
      this.registerService.cities({ state_id: e.target.value }).subscribe(res => {
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
    this.dashboardService.filter('applyed');
    this.location.back()
  } 

}
