import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/_service/notification.service';

@Component({
  selector: 'app-application-confirm-casting',
  templateUrl: './application-confirm-casting.component.html',
  styleUrls: ['./application-confirm-casting.component.css']
})
export class ApplicationConfirmCastingComponent implements OnInit {
  pageName='confirm-appl-casting';
  applicationId:any;
  resData:any;
  casting:any;
  long_description:any;
  image:any;
  form: FormGroup | any;
  loading = false;
  submitted = false;
  baseUrl :string = Config.Host+'backend2/';
  imagePath = this.baseUrl+'public/uploads/UserImages/';
  videoPath = this.baseUrl+'public/uploads/UserVideos/';
  casting_title:any;
  casting_date:any;
  applicationNo:any;

  image_1:any;
  image_2:any;
  image_3:any;
  image_4:any;
  image_5:any;
  image_6:any;
  
  video_1:any;
  video_2:any;
  video_3:any;
  secvidbox :boolean = true;
    thrvidbox :boolean = true;
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private authenticationService: AuthenticationService,
    private dashboardService:DashboardService,
    private sanitizer:DomSanitizer,
    private location:Location,
    private formBuilder:FormBuilder,
    private notification : NotificationService,
    ) {} 
    ngOnInit(): void {    
      this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
        this.applicationId = params.get('id');
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
      this.image_1 = sessionStorage.getItem('image_1');
      this.image_2 = sessionStorage.getItem('image_2');
      this.image_3 = sessionStorage.getItem('image_3');
      this.image_4 = sessionStorage.getItem('image_4');
      this.image_5 = sessionStorage.getItem('image_5');
      this.image_6 = sessionStorage.getItem('image_6');
      this.video_1 = sessionStorage.getItem('video_1');
      this.video_2 = sessionStorage.getItem('video_2');
      this.video_3 = sessionStorage.getItem('video_3');
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
        this.dashboardService.confirmCasting({application_id:this.applicationId})
      .pipe(first())
        .subscribe(res => {
          this.resData = res;   
          this.applicationNo = this.resData.data;
          sessionStorage.removeItem('name');
          sessionStorage.removeItem('age');
          sessionStorage.removeItem('dob');
          sessionStorage.removeItem('height');
          sessionStorage.removeItem('phone');
          sessionStorage.removeItem('language_id');
          sessionStorage.removeItem('language');
          sessionStorage.removeItem('city');
          sessionStorage.removeItem('city_id');
          sessionStorage.removeItem('state_id');
          sessionStorage.removeItem('home_town');
          sessionStorage.removeItem('hobbies');
          sessionStorage.removeItem('casting_title');
          sessionStorage.removeItem('casting_date');

          sessionStorage.removeItem('image_1');
          sessionStorage.removeItem('image_2');
          sessionStorage.removeItem('image_3');
          sessionStorage.removeItem('image_4');
          sessionStorage.removeItem('image_5');
          sessionStorage.removeItem('image_6');
          sessionStorage.removeItem('video_1');
          sessionStorage.removeItem('video_2');
          sessionStorage.removeItem('video_3');
          sessionStorage.removeItem('videos');
          sessionStorage.removeItem('images');
          this.notification.showSuccess('Casting call applied Successfully.','Success!');
          this.route.navigate(['/thank-casting/'+this.applicationNo]);       
        });
      }
    }    
  back(): void {
    this.location.back()
  }

}
