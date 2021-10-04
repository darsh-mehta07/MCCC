import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-thankyou-casting',
  templateUrl: './thankyou-casting.component.html',
  styleUrls: ['./thankyou-casting.component.css']
})
export class ThankyouCastingComponent implements OnInit {
  applicationNo:any;
  constructor(private location:Location,private dashboardService:DashboardService,private route:Router,private actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.applicationNo = params.get('application_no');
    });
  }
  letEx(){
    this.dashboardService.filter('applyed');
    this.route.navigate(['/home']);
  }
  home(){
    this.dashboardService.filter('applyed');
    this.route.navigate(['/home']);
  }
  back(): void {
    this.dashboardService.filter('applyed');
    this.location.back();
  }

}
