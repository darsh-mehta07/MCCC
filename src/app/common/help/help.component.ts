import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/_service/common.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  pageName = "help";
  loading:boolean = true;
  datas : any;
  resData:any;
  constructor(private location:Location,private commonService:CommonService) { }

  ngOnInit(): void {
    this.loading = false;
    this.commonService.getHelp().subscribe(res => {
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
