import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_service/dashboard.service';
import { AlertService } from '../../_service/alert.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from 'src/app/_config/config';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-casting-inner',
  templateUrl: './my-casting-inner.component.html',
  styleUrls: ['./my-casting-inner.component.css']
})
export class MyCastingInnerComponent implements OnInit {
  pageName="appliedcasting";
  loading = false;
  application:any;
  resData:any;
  castingId : any;
  baseUrl :string = Config.Host+'backend2/';
  long_description:any;
  applicationId:any;
  applyDate:any;
  image:any;
  constructor(
    private actRoute:ActivatedRoute,
    private dashboardService : DashboardService,
    private alertService:AlertService,
    private sanitizer:DomSanitizer,private location:Location,) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.castingId = params.get('id');
    });
    this.getMyApplication(this.castingId);
  }
  getMyApplication(id:any){
    this.dashboardService.myApplication({casting_id:this.castingId}).pipe(first())
    .subscribe(
        res => {
          this.resData = res;        
        this.application = this.resData.data[0]; 
        this.image = this.baseUrl+this.application.banner_img_path+'/'+this.application.banner_image;
      this.long_description = this.sanitizer.bypassSecurityTrustHtml(this.application.long_description);
      this.applicationId = this.application.application_id;
      this.applyDate = this.application.created_at;
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
