import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_service/dashboard.service';
import { AlertService } from '../_service/alert.service';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-application',
  templateUrl: './my-application.component.html',
  styleUrls: ['./my-application.component.css']
})
export class MyApplicationComponent implements OnInit {
  pageName='my-application';
  loading = false;
  noData = false;
  applications:any = [];
  resData:any;
  constructor(private location:Location,private dashboardService : DashboardService,private alertService:AlertService) {
    this.dashboardService.listen().subscribe((e:any)=>{
      console.log(e);
      this.getMyApplication();
    });
   }

  ngOnInit(): void {
    console.log("this.applications.length :   " + this.applications.length);
    if(this.applications.length != 0){
      
      this.noData = true;
    }else{
      this.getMyApplication();
    }
    
  }
  
  getMyApplication(){
    this.dashboardService.myApplication(null)
    .subscribe(
        res => {
          this.loading=true;
          this.noData = true;
          this.resData = res;        
        this.applications = this.resData.data; 
        console.log(this.applications);
        },
        error => {
          this.loading=true;
          this.alertService.error(error);
        });
  }
  back(): void {
    this.location.back()
  }
}
