import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Config } from 'src/app/_config/config';
import { DashboardService } from 'src/app/_service/dashboard.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  pageName = 'events';
  stickymenu = 'events';
  resData:any;
  castings:any;
  baseUrl :string = Config.Host+'backend2/';
  catId:any;
  loading:boolean = false;
  appEvents:any;
  on_going:any;
  event_for_u:any;
  upcomings:any;
  on_going_loding:boolean =false;
  upcomings_loding:boolean =false;
  forU_loding:boolean=false;
  constructor(private actRoute:ActivatedRoute,
    private route : Router,
    private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.catId = params.get('id');
    });
    this.getEventsData();
  }
  tab(data:any){
    this.catId = data;
  }
  getEventsData(){
    this.dashboardService.getEvents()
      .subscribe(res => {
        this.on_going_loding = true;
        this.upcomings_loding = true;
        this.forU_loding = true;
        this.loading = true;
        this.resData = res;        
        this.appEvents = this.resData.data;   
        this.on_going = this.resData.data.on_going;
        this.upcomings = this.resData.data.upcoming;
        this.event_for_u = this.resData.data.event_for_u;
      });
  }
  eventInner(id:any){
    this.route.navigate(['event-inner',id]);
  }

}
