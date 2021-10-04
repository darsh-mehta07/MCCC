import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/_service/common.service';

@Component({
  selector: 'app-about-mccc',
  templateUrl: './about-mccc.component.html',
  styleUrls: ['./about-mccc.component.css']
})
export class AboutMcccComponent implements OnInit {
  pageName = "about_mccc";
  loading:boolean = true;
  data : any;
  resData:any;
  constructor(private location:Location,private commonService:CommonService) { }

  ngOnInit(): void {
    this.loading = false;
    this.commonService.getAboutMCCC().subscribe(res => {
      this.loading = true;
      this.resData = res;   
      this.data = this.resData.data.discription;
    },error=>{
      this.loading = false;
    });
  }
  back(): void {
    this.location.back();
  }
}
