import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service'; 

import { Location } from '@angular/common';

import { ActivatedRoute, ParamMap,Router } from '@angular/router';
@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.css']
})
export class NoInternetComponent implements OnInit {
  isConnected = true;  
  noInternetConnection!: boolean; 
  constructor(private connectionService: ConnectionService,
    private route:Router,
    private location: Location,) {}

  ngOnInit(): void {
  }
  checkInternet(){ 
    console.log('click');
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
