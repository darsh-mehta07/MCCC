import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/_service/common.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-faq-inner',
  templateUrl: './faq-inner.component.html',
  styleUrls: ['./faq-inner.component.css']
})
export class FaqInnerComponent implements OnInit {

  pageName = "faq-inner";
  loading:boolean = true;
  datas : any;
  resData:any;
  catId:any;
  constructor(private location:Location,private commonService:CommonService,private actRoute:ActivatedRoute,
    private route : Router,) { }


  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.catId = params.get('id');
    });
    this.loading = false;
    this.commonService.getFAQInner({faq_category_id:this.catId}).subscribe(res => {
      this.loading = true;
      this.resData = res;   
      this.datas = this.resData.data;
    },error=>{
      this.loading = false;
    });
  }
  back(): void {
    this.location.back();
  }

}
