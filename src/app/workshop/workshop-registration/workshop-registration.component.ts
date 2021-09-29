import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { Config } from '../../_config/config';
import {WorkshopService} from '../../_service/workshop.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-workshop-registration',
  templateUrl: './workshop-registration.component.html',
  styleUrls: ['./workshop-registration.component.css']
})
export class WorkshopRegistrationComponent implements OnInit {
  stickymenu = 'workshop registration';
  id: any;
  bgImage: any;
  workshopData: any;
  hostUrl:string = Config.Host+'backend2/';
  checkData: any;
  constructor(private location: Location,private workshopService: WorkshopService,
    private route:Router,private actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.id = params.get('id');
    });

    this.workshopService.get_each_workshop_data({'id': this.id}).subscribe(
      data => { 
        this.workshopData = data.data[0];
        this.bgImage = this.hostUrl+this.workshopData.banner_img_path+'/'+this.workshopData.banner_image;
        console.log(this.workshopData);
    });
    this.workshopService.check_for_apply({'workshop_id': this.id}).subscribe(
      data => { 
        this.checkData = data;
        console.log(this.checkData.data);
    });
  }
  back(): void {
    this.location.back()
  }  
}
