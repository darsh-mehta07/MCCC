import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { Config } from '../_config/config';
import {WorkshopService} from '../_service/workshop.service';
@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {
  stickymenu = 'training';
  upcomingData: any;
  endingsoonData: any;
  previosData: any;
  expanded = 0;
  constructor(private workshopService: WorkshopService,
              private route:Router,private actRoute:ActivatedRoute) { }
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"dots": true,};
 trns_sliders = {"slidesToShow": 4, "slidesToScroll": 4,"dots": false,"infinite": false};
 catId: any;
 slickInit(e:any) {
   // console.log('slick initialized');
 }    
 breakpoint(e:any) {
   // console.log('breakpoint');
 }    
 afterChange(e:any) {
   // console.log('afterChange');
 }    
 beforeChange(e:any) {
   // console.log('beforeChange');
 } 
  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.catId = params.get('id');
    });
    this.workshopService.get_upcoming_workshop_data({'limit': ''}).subscribe(
      data => { 
        this.upcomingData = data.data;
        console.log(this.upcomingData);
    });

    this.workshopService.get_endingsoon_workshop_data({'limit': ''}).subscribe(
      data => { 
        this.endingsoonData = data.data;
        console.log(this.endingsoonData);
    });
  
  this.workshopService.get_previous_workshop_data({'limit': ''}).subscribe(
      data => { 
        this.previosData = data.data;
        
        console.log(this.previosData);
  });
  }
  tab(data:any){
    this.catId = data;
  }

}
