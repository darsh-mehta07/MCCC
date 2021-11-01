import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';
import { ConnectionService } from 'ng-connection-service'; 
import { Config } from './_config/config';
import { Location } from '@angular/common';
import { AuthenticationService } from './_service/authentication.service';

import { ActivatedRoute, ParamMap,Router, NavigationEnd  } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  spinnerStyle = Spinkit;
  title = 'web';
  isConnected = true;  
  noInternetConnection!: boolean;  
  files : any;
  fileName : string ='https://mcccapp.in/assets/img/image2.png';
  constructor(private authenticationService: AuthenticationService,private connectionService: ConnectionService,
    private route:Router,
    private location: Location,) { 
      // redirect to home if already logged in
    // if (sessionStorage.getItem('social_login') === 'true') {
    //   if (sessionStorage.getItem('profile_status') === 'true') {
    //     this.route.navigate([Config.AfterLogin]);
    //   }
    // } else {
    //   if (this.authenticationService.currentUserValue) {
    //     if (sessionStorage.getItem('profile_status') === 'true') {
    //       this.route.navigate([Config.AfterLogin]);
    //     }
    //   } else {
    //     this.route.navigate(['/signin']);
    //   }
    // }
      
    //   this.route.events.subscribe((e) => {
    //     if (e instanceof NavigationEnd) {
    //       this.connectionService.monitor().subscribe(isConnected => {  
    //         this.isConnected = isConnected;  
    //         console.log(this.isConnected + 'fffconnecterd');
    //         if (this.isConnected) {  
    //           this.noInternetConnection=false;  
    //           this.location.back();
    //         }  
    //         else {  
    //           this.route.navigate(['/no-internet']);
    //           this.noInternetConnection=true;  
    //         }  
    //       })  
    //     }
    //  });
     this.connectionService.monitor().subscribe(isConnected => {  
      this.isConnected = isConnected;  
      console.log(this.isConnected + 'fffconnecterd');
      if (this.isConnected) {  
        this.noInternetConnection=false;  
        this.location.back();
      }  
      else {         
        this.route.navigate(['/no-internet']);
        this.noInternetConnection=true;  
      }  
    })  
   
    
  } 


}
