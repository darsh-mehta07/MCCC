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
import { ConnectionService } from 'ng-connection-service'; 
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
    slideData:boolean = false;
    loadingnc:boolean = false;
    loadingnr:boolean = false;
    loadingnce:boolean = false;
    
    loadingevent :boolean = false;
    loadingbts:boolean = false;
    loadingtraining:boolean = false;
    loadingwork:boolean = false;
    loadingtrner:boolean = false;
    loadingtopbts : boolean = false;

    popularBtsVideos : any;
    topBtsVideos: any;
    categories: any;
    upcomingData: any;
    endingsoonData: any;
    previosData: any;
    expanded = 0;
    category_color: any = ['hsl(7deg 88% 68%)','hsl(88deg 47% 64%)','hsl(42deg 76% 64%)','hsl(201deg 100% 73%)','hsl(7deg 88% 68%)','hsl(88deg 47% 64%)','hsl(42deg 76% 64%)','hsl(201deg 100% 73%)'];
    hostUrl:string = Config.Host+'backend2/';
    isConnected = true;  
    noInternetConnection!: boolean;  
  on_going_loding: boolean = false;
  upcomings_loding: boolean = false;
  forU_loding: boolean = false;
  appEvents: any;
  on_going: any;
  event_for_u: any;
  upcomingsEvents: any;
    constructor(
        private route:Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private notifyService : NotificationService,
        private dashboardService : DashboardService,
        private btsVideosService: BtsVideosService,
        private workshopService: WorkshopService,
        private connectionService: ConnectionService
        
    ) {
      console.log('const');
       // redirect to home if already logged in
        if(this.authenticationService.currentUserValue) {
            let Auth =  JSON.stringify(this.authenticationService.currentUserValue.status);
            console.log("Auth : " , Auth);
            if(Auth){
              if(sessionStorage.getItem('profile_status') === 'false'){
                this.route.navigate(['/profile_first_step']);
              }
            }else{
              this.route.navigate(['/signin']);
            }                      
        }else{
          this.route.navigate(['/signin']);
        }
        this.currentUser = this.authenticationService.currentUserValue;     
        
        this.connectionService.monitor().subscribe(isConnected => {  
          this.isConnected = isConnected;  
          console.log(this.isConnected + 'fffconnecterd');
          if (this.isConnected) {  
            this.noInternetConnection=false;  
          }  
          else {  
            this.noInternetConnection=true;  
          }  
        })  
    }
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
    //-----slick slider------------//
  ngOnInit(): void {    
    
    this.loadAllUsers();
    this.castingSliderApi();
    this.newCastingCallApi();
    this.getRecomendedData();
    this.callEndingSoonAPI();
    this.getEventsData();
    this.btsVideosService.get_bts_videos({'limit': 10,'category_id':1}).subscribe(
      data => { 
        this.loadingbts = true;
          // console.log(data);
          this.popularBtsVideos = data.data;
      });
    this.btsVideosService.get_bts_videos({'limit': 2,'category_id':2}).subscribe(
      data => { 
        this.loadingbts = true;
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
          this.loadingbts = true;
          this.categories = data.data;
      });   
      this.loadingtraining = true;
    this.workshopService.get_upcoming_workshop_data({'limit': 2}).subscribe(
        data => { 
          this.loadingwork = true;
          this.upcomingData = data.data;
          console.log(this.upcomingData);
      });  
      
    this.workshopService.get_endingsoon_workshop_data({'limit': 2}).subscribe(
        data => { 
          this.loadingwork = true;
          var dataV = data.data;
          if(dataV == 'No Data'){
            this.endingsoonData = [];  
          }else{
            this.endingsoonData = data.data;
          }
          
          console.log(this.endingsoonData);
      });
    
    this.workshopService.get_previous_workshop_data({'limit': 2}).subscribe(
        data => { 
          this.loadingwork = true;
          var dataV = data.data;
          if(dataV == 'No Data'){
            this.previosData = [];  
          }else{
            this.previosData = data.data;
          }
         
          
          console.log(this.previosData);
    }); 
    this.loadingtrner = true;    
  }
  getEventsData(){
    this.dashboardService.getEvents()
      .subscribe(res => {
        this.loadingevent = true;
        this.on_going_loding = true;
        this.upcomings_loding = true;
        this.forU_loding = true;
        this.loading = true;
        this.resData = res;        
        this.appEvents = this.resData.data;   
        this.on_going = this.resData.data.on_going;
        this.upcomingsEvents = this.resData.data.upcoming;
        console.log(this.upcomingsEvents);
        this.event_for_u = this.resData.data.event_for_u;
        // console.log(this.event_for_u);
      });
  }
  castingSliderApi(){
    this.dashboardService.castingSlider()
      .subscribe(res => {
        this.loading = true;
        this.resData = res;
        if(this.resData.data.length > 0){
          this.slides = this.resData.data;      
          this.slideData = true;    
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
        
        this.resData = res;        
        this.newCasting = this.resData.data;
        if(this.newCasting.length  == 0){
          this.loadingnc = false;
          this.nonewcall = true;
        }else if(this.newCasting == 'No Record Found'){
          this.nonewcall = true;
        }else{
          this.loadingnc = true;
        }        
      });
  }
  callEndingSoonAPI(){
    this.dashboardService.callEndingSoon({limit:5})
      .subscribe(res => {       
        this.resData = res;        
        this.callEnding = this.resData.data; 
        if(this.callEnding == 'No data found'){
          this.nocallend = true;
        }else if(this.callEnding.length == 0){
          this.nocallend = true;
          this.loadingnce = false;
        }else{
          this.loadingnce = true;
        }      
      });
  }
  getRecomendedData(){
    this.dashboardService.recomendedCasting({limit:5})
      .subscribe(res => {
        
        this.resData = res;        
        this.recomended = this.resData.data; 
        if(this.recomended == 'No Record Found'){
          this.norecomended = true;
        }else if(this.recomended.length == 0){
          this.norecomended = true;
          this.loadingnr = false;
        }else{
          this.loadingnr = true;
        }  
        // console.log(this.recomended);      
      });
  }
  castingInner(id:any){
    this.route.navigate(['casting-inner',id]);
  }
  workshopInner(id:any){
    this.route.navigate(['workshop-registration',id]);
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
        // this.resData = res;        
        // this.callEnding = this.resData.data; 
        // this.showToasterSuccess(); 
        this.notifyService.showSuccess("Casting Call saved successfully !!", "")     
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
    this.notifyService.showSuccess("Data saved successfully !!", "")
}
 
showToasterError(){
    this.notifyService.showError("Something is wrong", "")
}
 
showToasterInfo(){
    this.notifyService.showInfo("This is info", "")
}
 
showToasterWarning(){
    this.notifyService.showWarning("This is warning", "")
}
eventInner(id:any){
  this.route.navigate(['event-inner',id]);
}
bookmarkEvent(id:any){
  this.dashboardService.bookmarkWorkshopEvents({event_id:id,type:'event'})
    .subscribe(res => {
      this.notifyService.showSuccess("Event saved successfully !!", "")    
    });
}
bookmarkWorkshop(id:any){
  this.dashboardService.bookmarkWorkshopEvents({event_id:id,type:'workshop'})
    .subscribe(res => {
      this.notifyService.showSuccess("Workshop saved successfully !!", "")    
    });
}

doHtmlDisplay(text:any, limit = 50) {
  if (text.length > limit) {
   text = text.substring(0, limit) + '...';
  } else {
   text;
  }
  return text;
 }

}
