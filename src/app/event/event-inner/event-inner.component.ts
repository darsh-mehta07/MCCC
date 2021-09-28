import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { Config } from 'src/app/_config/config';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-event-inner',
  templateUrl: './event-inner.component.html',
  styleUrls: ['./event-inner.component.css']
})
export class EventInnerComponent implements OnInit {
  pageName = 'eventInner';
  loading:boolean = false;
  resData :any;
  appEvents:any;
  eventId:any;
  image:any;
  baseUrl :string = Config.Host+'backend2/';
  Apiloading : boolean = false;
  eventDate :any;
  bookmarks:any;
  bmkStatus:any;
  constructor(public datepipe: DatePipe,private actRoute:ActivatedRoute,
    private route : Router,private location:Location,private dashboardService : DashboardService) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.eventId = params.get('id');
    });
    this.getEventsData();
  }
  back(): void {
    this.location.back();
  }
  getEventsData(){
    this.Apiloading = true;
    this.loading = false;
    this.dashboardService.innerEvents({id:this.eventId})
      .subscribe(res => {
        this.loading = true;
        this.resData = res;     
        this.Apiloading = false;   
        this.appEvents = this.resData.data;   
        let date1 = new Date(this.appEvents.start_date); 
        let date2 = new Date(this.appEvents.end_date);
       if(this.isDatesEqual(date1,date2)){        
          this.eventDate = this.datepipe.transform(this.appEvents.start_date, 'MMM,d,y');
       }else{
        this.eventDate = this.datepipe.transform(this.appEvents.start_date, 'MMM,d,y') +' - '+this.datepipe.transform(this.appEvents.end_date, 'MMM,d,y');
       }
        this.image = this.baseUrl+this.appEvents.image_path+'/'+this.appEvents.image;    
      },error=>{
        this.Apiloading = false;
        this.loading = false;
      });
  }
  bookmark(id:any){
    this.dashboardService.bookmarkCasting({casting_card_id:id})
      .subscribe(res => {
        this.resData = res; 
        this.bmkStatus = this.resData.data[0];
        if(this.bmkStatus === 'Bookmark removed'){
          this.bookmarks = 0;

        }else if(this.bmkStatus === 'Bookmark Added'){
          this.bookmarks = 1;
        }
        // this.showToasterSuccess();      
      });
  }
  
isDatesEqual(date1:any, date2:any) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

}
