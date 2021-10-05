import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-splash1',
  templateUrl: './splash1.component.html',
  styleUrls: ['./splash1.component.css']
})
export class Splash1Component implements OnInit {
  slides = [
    {"no": 1,class1:"casting",class2:"casting-content",class3:"slide-btn1",img: "../../assets/img/casting-svg.svg",title:"Casting",des:"Get Updates on the most recent casting calls of feature films, TV commercials and other mediums. Register NOW!",link:"/splash2"},
    {"no": 2,class1:"traning",class2:"traning-content",class3:"slide-btn2",img: "../../assets/img/traning.svg",title:"Training",des:"Don't stop growing. Never limit your acting abilities. Our Acting training will provide you the challenge that you as an actor desperately require.",link:"/splash3"},
    {"no": 3,class1:"event",class2:"event-content",class3:"slide-btn3",img: "../../assets/img/events.svg",title:"Events",des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s.",link:"/splash4"},
    {"no": 4,class1:"bTs",class2:"bTs-content",class3:"slide-btn4",img: "../../assets/img/bts-logo.svg",title:"BTS",des:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s.",link:"/welcome"}
  ];
  constructor() { }
  //-----slick slider------------//    
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"dots": false,"autoplay": false,
  "autoplaySpeed": 3000,method:{
    "slickPause" : true
  }};
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
    
  }    
  beforeChange(e:any) {
    // console.log('beforeChange');
  } 
  slickPause(){

  }
  //-----slick slider------------//
  ngOnInit(): void {
  }

}
