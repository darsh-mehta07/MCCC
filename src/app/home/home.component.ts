import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
// import { Register } from '../_models/register.model';
// import { RegisterService } from '../_service/register.service';
import { AuthenticationService } from '../_service/authentication.service';
import { User } from '../_models/user';
import { UserService } from '../_service/user.service';
import { Router } from '@angular/router';
import { Config } from '../_config/config';
import { DashboardService } from '../_service/dashboard.service';
import{NotificationService} from '../_service/notification.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {BtsVideosService} from '../_service/bts-videos.service';
import {WorkshopService} from '../_service/workshop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageName = 'home';
  stickymenu = '';
  currentUser: User;
    users : any;
    user : any;
    userName : any;
    slides :any;
    resData :any;
    newCasting : any;
    callEnding:any;
    status: boolean = false;
    cardnum:any;
    baseUrl :string = Config.Host+'backend2/';
    recomended :any;
    norecomended:boolean = false;
    nonewcall:boolean = false;
    nocallend:boolean = false;
    loading:boolean = false;
    loadingnc:boolean = false;
    loadingnr:boolean = false;
    loadingnce:boolean = false;
    popularBtsVideos : any;
    topBtsVideos: any;
    categories: any;
    upcomingData: any;
    endingsoonData: any;
    previosData: any;
    expanded = 0;
    category_color: any = ['hsl(7deg 88% 68%)','hsl(88deg 47% 64%)','hsl(42deg 76% 64%)','hsl(201deg 100% 73%)','hsl(7deg 88% 68%)','hsl(88deg 47% 64%)','hsl(42deg 76% 64%)','hsl(201deg 100% 73%)'];
    hostUrl:string = Config.Host+'backend2/';
    constructor(
        private route:Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private notifyService : NotificationService,
        private dashboardService : DashboardService,
        private btsVideosService: BtsVideosService,
        private workshopService: WorkshopService
        
    ) {
      
       // redirect to home if already logged in
        if(this.authenticationService.currentUserValue) {
            if(sessionStorage.getItem('profile_status') === 'false'){
              this.route.navigate(['/profile_first_step']);
            }          
        }else{
          this.route.navigate(['/signin']);
        }
        this.currentUser = this.authenticationService.currentUserValue;        
    }
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
    //-----slick slider------------//
  ngOnInit(): void {    
    this.loadAllUsers();
    this.castingSliderApi();
    this.newCastingCallApi();
    this.getRecomendedData();
    this.callEndingSoonAPI();
    this.btsVideosService.get_bts_videos({'limit': 10,'category_id':1}).subscribe(
      data => { 
          // console.log(data);
          this.popularBtsVideos = data.data;
      });
    this.btsVideosService.get_bts_videos({'limit': 2,'category_id':2}).subscribe(
      data => { 
          // console.log(data.data);
          this.topBtsVideos = data.data;
      }); 
    this.btsVideosService.get_categories().subscribe(
        data => { 
          this.categories = data.data;
      });   

    this.workshopService.get_upcoming_workshop_data({'limit': 2}).subscribe(
        data => { 
          this.upcomingData = data.data;
          console.log(this.upcomingData);
      });  
      
    this.workshopService.get_endingsoon_workshop_data({'limit': 2}).subscribe(
        data => { 
          this.endingsoonData = data.data;
          console.log(this.endingsoonData);
      });
    
    this.workshopService.get_previous_workshop_data({'limit': 2}).subscribe(
        data => { 
          this.previosData = data.data;
          
          console.log(this.previosData);
    }); 
  }
  castingSliderApi(){
    this.dashboardService.castingSlider()
      .subscribe(res => {
        this.loading = true;
        this.resData = res;
        if(this.resData.data.length > 0){
          this.slides = this.resData.data;          
        }else{
          this.slides = [
            {img: "../../../assets/img/slide1.jpg"},
            {img: "../../../assets/img/slide2.jpg"},
            {img: "../../../assets/img/slide2.jpg"}
          ];
        }        
      });
  }
  newCastingCallApi(){
    this.dashboardService.castingCall({limit:5})
      .subscribe(res => {
        this.loadingnc = true;
        this.resData = res;        
        this.newCasting = this.resData.data; 
        if(this.newCasting == 'No Record Found'){
          this.nonewcall = true;
        }       
      });
  }
  callEndingSoonAPI(){
    this.dashboardService.callEndingSoon({limit:5})
      .subscribe(res => {
        this.loadingnce = true;
        this.resData = res;        
        this.callEnding = this.resData.data; 
        if(this.callEnding == 'No Record Found'){
          this.nocallend = true;
        }       
      });
  }
  getRecomendedData(){
    this.dashboardService.recomendedCasting({limit:5})
      .subscribe(res => {
        this.loadingnr = true;
        this.resData = res;        
        this.recomended = this.resData.data; 
        if(this.recomended == 'No Record Found'){
          this.norecomended = true;
        }        
      });
  }
  castingInner(id:any){
    this.route.navigate(['casting-inner',id]);
  }
  clickEvent(id:any){
    if(this.status){
      this.status = false;
      this.cardnum = id;
    }else{
      this.status = true;
      this.cardnum = id;
    }
  }
  bookmarkCasting(id:any){
    this.dashboardService.bookmarkCasting({casting_card_id:id})
      .subscribe(res => {
        this.resData = res;        
        this.callEnding = this.resData.data; 
        this.showToasterSuccess();      
      });
  }
  deleteUser(id: number) {
    this.userService.delete(id)
        .subscribe(() => this.loadAllUsers());
  }
private loadAllUsers() {
  this.userService.getAll()
      .subscribe(res => {
        this.user = res;
        this.userName = this.user.data.name;
        // console.log("Users ",this.user);
      });
}
  
  showToasterSuccess(){
    this.notifyService.showSuccess("Data saved successfully !!", "Mccc")
}
 
showToasterError(){
    this.notifyService.showError("Something is wrong", "tutsmake.com")
}
 
showToasterInfo(){
    this.notifyService.showInfo("This is info", "tutsmake.com")
}
 
showToasterWarning(){
    this.notifyService.showWarning("This is warning", "tutsmake.com")
}

}
