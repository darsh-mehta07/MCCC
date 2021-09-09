import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-application-confirm-casting',
  templateUrl: './application-confirm-casting.component.html',
  styleUrls: ['./application-confirm-casting.component.css']
})
export class ApplicationConfirmCastingComponent implements OnInit {

  castingId:any;
  resData:any;
  casting:any;
  long_description:any;
  image:any;
  form: FormGroup | any;
  imgArray:any;
  videoArray:any;
  loading = false;
  submitted = false;
  baseUrl :string = Config.Host+'backend2/';
  imagePath = this.baseUrl+'public/uploads/UserImages/';
  videoPath = this.baseUrl+'public/uploads/UserVideos/';
  casting_title:any;
  casting_date:any;
  applicationNo:any;
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private authenticationService: AuthenticationService,
    private dashboardService:DashboardService,
    private sanitizer:DomSanitizer,
    private location:Location,
    private formBuilder:FormBuilder,) {} 
    ngOnInit(): void {    
      this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
        this.castingId = params.get('id');
      });
      this.casting_title = sessionStorage.getItem('casting_title');
    this.casting_date = sessionStorage.getItem('casting_date');
      this.form = this.formBuilder.group({
        // imgfileSource : [sessionStorage.getItem('images'),Validators.required],
        name : [sessionStorage.getItem('name'),Validators.required],
        age : [sessionStorage.getItem('age'),Validators.required],
        height : [sessionStorage.getItem('height'),Validators.required],
        phone : [sessionStorage.getItem('phone'),Validators.required],
        language : [sessionStorage.getItem('language'),Validators.required],
        city : [sessionStorage.getItem('city'),Validators.required],
        home_town : [sessionStorage.getItem('home_town'),Validators.required],
        hobbies : [sessionStorage.getItem('hobbies'),Validators.required],
      });   
      let image:any = sessionStorage.getItem('images');
      this.imgArray =  JSON.parse(image); 
      let video:any = sessionStorage.getItem('videos'); 
      this.videoArray = JSON.parse(video); 
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
        this.dashboardService.applyForCasting({casting_id:this.castingId,imgfileSource:sessionStorage.getItem('images')})
      .pipe(first())
        .subscribe(res => {
          this.resData = res;   
          this.applicationNo = this.resData.data;     
          this.route.navigate(['/thank-casting/'+this.applicationNo]);       
        });
      }
    }    
  back(): void {
    this.location.back()
  }

}
