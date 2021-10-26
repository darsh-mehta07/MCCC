import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Config } from 'src/app/_config/config';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NotificationService } from 'src/app/_service/notification.service';
const pageName = 'casting';
@Component({
  selector: 'app-casting-all',
  templateUrl: './casting-all.component.html',
  styleUrls: ['./casting-all.component.css']
})
export class CastingAllComponent implements OnInit {
  pageName = 'casting';
  stickymenu = 'casting';
  castingId:any;
  resData:any;
  castings:any;
  baseUrl :string = Config.Host+'backend2/';
  long_description:any;
  image:any;
  catId:any;
  callEndingSoon:any = [];
  recomended:any;
  loading = false;
  castingData = true;
  recommendData = true;
  endingSoonData = true;
  status: boolean = false;
    cardnum:any;
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private dashboardService:DashboardService,
    private notifyService : NotificationService,) {} 
  ngOnInit(): void {  
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.catId = params.get('id');
      console.log("catId : ", this.catId);
    });
    this.loading = false;
    this.getCastingData();
    this.getRecomendedData();
    this.getCallEndingSoonData();
  }
  tab(data:any){
    this.catId = data;
    console.log("catId : ", this.catId);
  }
  getCastingData(){
    this.dashboardService.castingCall(null)
    .pipe(first())
      .subscribe(res => {
        this.loading = true;
        this.resData = res;        
        this.castings = this.resData.data;  
        if(this.castings.length > 0){
          console.log(this.castingData);
          this.castingData = false;
        } 
      });
  }
  getCallEndingSoonData(){
    this.dashboardService.callEndingSoon(null)
    .pipe(first())
      .subscribe(res => {
        this.loading = true;
        this.resData = res;        
        this.callEndingSoon = this.resData.data;  
        if(this.callEndingSoon.length > 0){
          this.endingSoonData = false;
        }     
      });
  }
  getRecomendedData(){
    this.dashboardService.recomendedCasting(null)
    .pipe(first())
      .subscribe(res => {
        this.loading = true;
        this.resData = res;        
        this.recomended = this.resData.data;  
        if(this.recomended.length > 0){
          this.recommendData = false;
        }       
      });
  }
  castingInner(id:any){
    this.route.navigate(['casting-inner',id]);
  }
  clickEvent(id:any){
    if(this.status){
      this.status = false;
      this.cardnum = id;
    }else{
      this.status = true;
      this.cardnum = id;
    }
  }
  bookmarkCasting(id:any){
    this.dashboardService.bookmarkCasting({casting_card_id:id})
      .subscribe(res => {
        // this.resData = res;        
        // this.callEnding = this.resData.data; 
        this.showToasterSuccess();      
      });
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Casting Call saved successfully !!", "")
}
 
showToasterError(){
    this.notifyService.showError("Something is wrong", "")
}
 
showToasterInfo(){
    this.notifyService.showInfo("This is info", "")
}
 
showToasterWarning(){
    this.notifyService.showWarning("This is warning", "")
}

}
