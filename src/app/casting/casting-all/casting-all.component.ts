import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Config } from 'src/app/_config/config';
import { DashboardService } from 'src/app/_service/dashboard.service';

@Component({
  selector: 'app-casting-all',
  templateUrl: './casting-all.component.html',
  styleUrls: ['./casting-all.component.css']
})
export class CastingAllComponent implements OnInit {

  castingId:any;
  resData:any;
  castings:any;
  baseUrl :string = Config.Host+'backend2/';
  long_description:any;
  image:any;
  catId:any;
  callEndingSoon:any;
  recomended:any;
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private dashboardService:DashboardService,) {} 
  ngOnInit(): void {  
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.catId = params.get('id');
    });
    this.getCastingData();
    this.getRecomendedData();
    this.getCallEndingSoonData();
  }
  tab(data:any){
    this.catId = data;
  }
  getCastingData(){
    this.dashboardService.castingCall(null)
    .pipe(first())
      .subscribe(res => {
        this.resData = res;        
        this.castings = this.resData.data;       
      });
  }
  getCallEndingSoonData(){
    this.dashboardService.callEndingSoon(null)
    .pipe(first())
      .subscribe(res => {
        this.resData = res;        
        this.callEndingSoon = this.resData.data;       
      });
  }
  getRecomendedData(){
    this.dashboardService.recomendedCasting(null)
    .pipe(first())
      .subscribe(res => {
        this.resData = res;        
        this.recomended = this.resData.data;       
      });
  }
  castingInner(id:any){
    this.route.navigate(['casting-inner',id]);
  }

}
