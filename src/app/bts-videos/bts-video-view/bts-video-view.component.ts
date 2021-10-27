import { Component, NgModule, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {BtsVideosService} from '../../_service/bts-videos.service';
import { SafePipe } from '../../_config/safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '../../_config/config';
import { Location } from '@angular/common';
@Component({
  selector: 'app-bts-video-view',
  templateUrl: './bts-video-view.component.html',
  styleUrls: ['./bts-video-view.component.css']
})
export class BtsVideoViewComponent implements OnInit {
  @ViewChild("iframe") iframe: ElementRef | any;
  btsCategoryId: any;
  btsVideoId: any;
  dataLoad: any = false;
  expanded = 0;
  hostUrl:string = Config.Host+'backend2/';
  constructor(private actRoute:ActivatedRoute,
    private route : Router,
    private btsVideosService: BtsVideosService,
    private dom:DomSanitizer,
    private location:Location,) {
      this.actRoute.paramMap.subscribe((params: ParamMap) => {  
        this.ngOnInit();
      });
     }
    BtsVideos:any;
    vid: any;
    desc: any;
    upNext: any;
    pageName = 'bts-video-view';
    BtsNextVideos:any;
    getUpnextVideos: boolean = false;
  ngOnInit(): void {
    this.dataLoad = true;
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.btsCategoryId = params.get('type');
      this.btsVideoId = params.get('id');
      console.log(params );
      console.log( this.btsCategoryId );
      // this.ngOnInit();
    });
 this.btsVideosService.bts_videos_by_id({'video_id': this.btsVideoId})
          .subscribe(
                    data => { 
                        console.log(data);
                        this.BtsVideos = data.data;
                        this.upNext = data.category_videos;
                        this.vid = this.BtsVideos[0].video_url+'?autoplay=1&modestbranding=1&showinfo=0&amp';
                        this.iframe.nativeElement.contentWindow.location.replace(this.vid);
                        // this.vid = this.BtsVideos[0].video_url+'?autoplay=1&mute=1&enablejsapi=1';
                        console.log(this.vid);
                        this.desc = this.BtsVideos[0].description;
                      }); 

    this.btsVideosService.get_bts_videos({'limit': null,'category_id':this.btsCategoryId})
          .subscribe(
                    data => { 
                        console.log(data.data);
                        this.getUpnextVideos = true;
                        this.BtsNextVideos = data.data;
                    }); 
    
  }
  back(){
    this.location.back()
  }

}
