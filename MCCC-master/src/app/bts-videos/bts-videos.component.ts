import { Component, OnInit } from '@angular/core';
import {BtsVideosService} from '../_service/bts-videos.service';
import { Config } from '../_config/config';
@Component({
  selector: 'app-bts-videos',
  templateUrl: './bts-videos.component.html',
  styleUrls: ['./bts-videos.component.css']
})
export class BtsVideosComponent implements OnInit {
  loadingtopbts : boolean = false;
  stickymenu = 'bts';
  constructor(private btsVideosService: BtsVideosService,) { }
  loadData: any = false;
  popularBtsVideos : any;
  topBtsVideos: any;
  categories : any;
  hostUrl:string = Config.Host+'backend2/';
  category_color: any = ['hsl(7deg 88% 68%)','hsl(88deg 47% 64%)','hsl(42deg 76% 64%)','hsl(201deg 100% 73%)','hsl(7deg 88% 68%)','hsl(88deg 47% 64%)','hsl(42deg 76% 64%)','hsl(201deg 100% 73%)'];
 //-----slick slider------------//    
 slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"dots": true,};
 trns_sliders = {"slidesToShow": 4, "slidesToScroll": 4,"dots": false,"infinite": false};
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
              this.btsVideosService.get_bts_videos({'limit': 10,'category_id':1}).subscribe(
                  data => { 
                      this.popularBtsVideos = data.data;
                      this.loadData = true;
                  });
              this.btsVideosService.get_bts_videos({'limit': 2,'category_id':2}).subscribe(
                  data => { 
                    this.loadData = true;
                    if(data.data.length > 0){
                      this.loadingtopbts = true;
                      // console.log(data.data);
                      this.topBtsVideos = data.data;
                    }else{
                      this.loadingtopbts = false;
                    }
                  });    
              this.btsVideosService.get_categories().subscribe(
                data => { 
                    this.categories = data.data;
                    console.log(this.categories);
                    this.loadData = true;
                });              
  }

}
