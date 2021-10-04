import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/_service/notification.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-casting-inner',
  templateUrl: './casting-inner.component.html',
  styleUrls: ['./casting-inner.component.css']
})
export class CastingInnerComponent implements OnInit {
  pageName="casting-inner";
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
  bookmarks:any;
  applySt:any;
  bmkStatus:any;
  loading:boolean = false;
  Apiloading : boolean = false;
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private authenticationService: AuthenticationService,
    private dashboardService:DashboardService,
    private sanitizer:DomSanitizer,
    private location:Location,
    private notifyService : NotificationService,
    
    ) {} 
  ngOnInit(): void {    
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.castingId = params.get('id');
    });
    this.getCastingData();
  }
  back(): void {
    // this.route.navigateByUrl('/casting-all/'+this.castingId);
    this.location.back();
    // window.history.back();
  }
  getCastingData(){
    this.Apiloading = true;
    this.loading = false;
    this.dashboardService.castingCall({casting_id:this.castingId}).pipe(first())
    .subscribe(res => {
      console.log(res);
      this.Apiloading = false;
      this.loading = true;
      this.resData = res;   
      this.casting = this.resData.data;
      this.castingTitle =  this.casting.title;
      if(this.casting.bookmark != null && this.casting.bookmark != ''){
        this.bookmarks =  this.casting.bookmark.bookmark_status;
      }else{
        this.bookmarks =  0;
      }
      if(this.casting.apply_status != null && this.casting.apply_status != ''){
        this.applySt = this.casting.apply_status.confirm;
      }else{
        this.applySt = 0;
      }
      
      this.castingDate = this.casting.created_at;
      this.image = this.baseUrl+'public/uploads/Admin/CastingImages/'+this.casting.banner_image;
      this.long_description = this.sanitizer.bypassSecurityTrustHtml(this.casting.long_description);
    },error=>{
      this.Apiloading = false;
      this.loading = false;
    });
  }
  applyCasting(){
      this.dashboardService.userDetails({casting_id:this.castingId})
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
  bookmark(id:any){
    this.dashboardService.bookmarkCasting({casting_card_id:id})
    .pipe(first())
      .subscribe(res => {
        this.resData = res; 
        this.bmkStatus = this.resData.data[0];
        if(this.bmkStatus === 'Bookmark removed'){
          this.notifyService.showSuccess('Bookmark removed.','');
          this.bookmarks = 0;
        }else if(this.bmkStatus === 'Bookmark Added'){
          this.notifyService.showSuccess('Bookmark Added.','');
          this.bookmarks = 1;
        }     
      });
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Data saved successfully !!", "")
}
}
