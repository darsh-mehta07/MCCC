import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Config } from 'src/app/_config/config';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Location } from '@angular/common';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  pageName = "notification";
  loading = false;
  dataLength: any;
  resData:any;
  getCount: any;
  constructor(private actRoute:ActivatedRoute,
    private route : Router,
    private dashboardService:DashboardService,private location:Location,) { }

  ngOnInit(): void {
    this.getUserNotification();
    // setInterval(() => { 
    //    this.getUserNotification();
    //   }, 1000 * 10);

      this.dashboardService.UserNotificationMarkRead(null)
      .subscribe(res => {
        // console.log('clear');
      });
  }
  getUserNotification(){
    this.dashboardService.getUserNotification(null)
    .subscribe(res => {
      this.loading = true;
      this.resData = res.data; 
      this.dataLength = this.resData.length; 
      // console.log(this.resData.length);
    });
  }

  getUserNotificationCounter(){
    this.dashboardService.getUserNotificationCounter(null)
    .subscribe(res => {
      this.getCount = res.data; 
      console.log(this.getCount);
    });
  }
  

  back(): void {
    this.location.back();
   
  }

}
