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
  files : any;
  fileName : string ='https://mcccapp.in/assets/img/image2.png';
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
      this.renderPNG(this.fileName);
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
    renderPNG(fileName: string) {
      console.log("render function");
      let reader = new FileReader();
      reader.addEventListener("load", () => {
          this.files = reader.result;
          localStorage.setItem('noInternetImgData', JSON.stringify(this.files));
      }, false);

      let img:any = localStorage.getItem('noInternetImgData');
      this.files = JSON.parse(img);     
  }

}
