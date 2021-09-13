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
  loading = false;
  applications:any;
  resData:any;
  constructor(private location:Location,private dashboardService : DashboardService,private alertService:AlertService) { }

  ngOnInit(): void {
    this.getMyApplication();
  }
  getMyApplication(){
    this.dashboardService.myApplication(null).pipe(first())
    .subscribe(
        res => {
          this.resData = res;        
        this.applications = this.resData.data; 
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  back(): void {
    this.location.back()
  }
}
