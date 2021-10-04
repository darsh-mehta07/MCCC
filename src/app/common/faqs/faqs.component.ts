import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/_service/common.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  pageName = "faq";
  loading:boolean = true;
  training : any;
  bts : any;
  casting_calls : any;
  events : any;
  resData:any;
  constructor(private location:Location,private commonService:CommonService) { }


  ngOnInit(): void {
    this.loading = false;
    this.commonService.getFAQ().subscribe(res => {
      this.loading = true;
      this.resData = res;   
      this.bts = this.resData.data.bts;
      this.casting_calls = this.resData.data.casting_calls;
      this.events = this.resData.data.events;
      this.training = this.resData.data.training;
    },error=>{
      this.loading = false;
    });
  }
  back(): void {
    this.location.back();
  }

}
