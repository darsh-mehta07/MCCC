import { Component, OnInit } from '@angular/core';
import {BtsVideosService} from '../_service/bts-videos.service';
import { Config } from '../_config/config';
@Component({
  selector: 'app-bts-videos',
  templateUrl: './bts-videos.component.html',
  styleUrls: ['./bts-videos.component.css']
})
export class BtsVideosComponent implements OnInit {

  constructor(private btsVideosService: BtsVideosService,) { }

  popularBtsVideos : any;
  topBtsVideos: any;
  hostUrl:string = Config.Host+'backend2/';
 //-----slick slider------------//    
 slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"dots": true,};
 trns_sliders = {"slidesToShow": 4, "slidesToScroll": 4,"dots": false,};
 // addSlide() {
 //   this.slides.push({img: "http://placehold.it/350x150/777777"})
 // }    
 // removeSlide() {
 //   this.slides.length = this.slides.length - 1;
 // }    
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
    this.btsVideosService.get_bts_videos({'limit': 10,'category_id':1})
            .subscribe(
                data => { 
                    console.log(data.data);
                    this.popularBtsVideos = data.data;
                });
this.btsVideosService.get_bts_videos({'limit': 2,'category_id':2})
              .subscribe(
                    data => { 
                        console.log(data.data);
                        this.topBtsVideos = data.data;
                    });              
  }

}
