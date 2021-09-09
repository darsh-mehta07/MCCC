import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-casting-inner',
  templateUrl: './casting-inner.component.html',
  styleUrls: ['./casting-inner.component.css']
})
export class CastingInnerComponent implements OnInit {
  castingId:any;
  resData:any;
  casting:any;
  baseUrl :string = Config.Host+'backend2/';
  long_description:any;
  image:any;
  userdetail:any;
  age:any; 
  castingTitle:any;
  castingDate:any;
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private authenticationService: AuthenticationService,
    private dashboardService:DashboardService,
    private sanitizer:DomSanitizer,
    private location:Location) {} 
  ngOnInit(): void {    
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.castingId = params.get('id');
    });
    this.getCastingData();
  }
  back(): void {
    this.location.back()
  }
  getCastingData(){
    this.dashboardService.castingCall({casting_id:this.castingId}).pipe(first())
    .subscribe(res => {
      this.resData = res;   
      this.casting = this.resData.data[0];
      this.castingTitle =  this.casting.title;
      this.castingDate = this.casting.created_at;
      this.image = this.baseUrl+this.casting.banner_img_path+'/'+this.casting.banner_image;
      this.long_description = this.sanitizer.bypassSecurityTrustHtml(this.casting.long_description);
    });
  }
  applyCasting(){
      this.dashboardService.userDetails()
      .pipe(first())
        .subscribe(res => {
          this.resData = res;       
          this.age = this.resData.data.age; 
          this.userdetail = this.resData.data.user_details;
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
          sessionStorage.setItem('images',JSON.stringify(this.userdetail.images));          
          sessionStorage.setItem('videos',JSON.stringify(this.userdetail.video));
          sessionStorage.setItem('casting_title',this.castingTitle);
          sessionStorage.setItem('casting_date',this.castingDate);
          this.route.navigate(['/apply-casting/'+this.castingId]);
        });
  }

}
