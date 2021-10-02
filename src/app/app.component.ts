import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';
import { ConnectionService } from 'ng-connection-service'; 

import { Location } from '@angular/common';

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
  
  constructor(private connectionService: ConnectionService,
    private route:Router,
    private location: Location,) { 
      
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
