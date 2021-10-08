import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
import { DashboardService } from '../_service/dashboard.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  castingData: any;
  openMenu:boolean = false;
  currentUser: User;
  loadingnc:boolean = false;
  sidebarloading:boolean = false;
  resData: any;
  newCastinghh: any;
  nonewcall: boolean = false;
  getCount: any;
  constructor( private route:Router,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService) {
      this.currentUser = this.authenticationService.currentUserValue;
     }

  ngOnInit(): void {
    setInterval(() => { 
     this.getUserNotificationCounter();
    }, 1000 * 10)
    // setTimeout(() => { 
    //   this.sidebarloading = true;
    //  }, 2000);
    this.openMenu = false;
    // this.getUserNotificationCounter();
  }
  newCastingCallApi(){
    
    this.dashboardService.castingCall({limit:5})
      .subscribe(res => {
        
        this.loadingnc = true;
        this.resData = res;   
        // console.log(this.resData.data);     
        this.newCastinghh = this.resData.data; 
        if(this.newCastinghh == 'No Record Found'){
          this.nonewcall = true;
        }       
      });
   
  }
  openNav(){
    this.openMenu = true;
  }
  closeNav(){
    this.openMenu = false;
  }
  logout(){
    this.authenticationService.logout();
    this.openMenu = false;
    this.route.navigate(['/signin']);
  }
  getUserNotificationCounter(){
    this.dashboardService.getUserNotificationCounter(null)
    .subscribe(res => {
      this.getCount = res.data; 
      // console.log(this.getCount + 'count');
    });
  }

}
