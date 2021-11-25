import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {BtsVideosService} from '../../_service/bts-videos.service';
import { Config } from '../../_config/config';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-bts-inner',
  templateUrl: './bts-inner.component.html',
  styleUrls: ['./bts-inner.component.css']
})
export class BtsInnerComponent implements OnInit {
  videoNotFound :boolean =false;
  btsCategoryId: any;
  expanded = 0;
  hostUrl:string = Config.Host+'backend2/';
  constructor(private actRoute:ActivatedRoute,
    private route : Router,private btsVideosService: BtsVideosService) { }
    topBtsVideos: any;
    loadData: any = false;
  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.btsCategoryId = params.get('id');
      console.log(this.btsCategoryId + 'idd');
      console.log(this.expanded + ' expanded');
      this.btsVideosService.get_bts_videos({'limit': null,'category_id':this.btsCategoryId})
              .subscribe(
                    data => { 
                        console.log(data.data);
                        this.topBtsVideos = data.data;

                        console.log("topBtsVideos : " , this.topBtsVideos);
                        this.loadData = true;
                        if(this.topBtsVideos.length > 0 ){
                          this.videoNotFound = false;
                        }else{
                          this.videoNotFound = true;
                        }
                        
                       
                    }); 
                    
    });
  }
  videoClick(id: any){
    console.log(id);
    this.btsVideosService.views_count_update({'video_id': id})
              .subscribe(
                    data => { 
                        console.log(data);
                        
                       
                    }); 
  }

}
