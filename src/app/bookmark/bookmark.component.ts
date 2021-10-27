import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DashboardService } from 'src/app/_service/dashboard.service';
@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  loading: boolean = false;
  bookmarkData: any;
  eventBookmarkData :any;
  workshopBookmarkData :any;
  catId:any;
  pageName = 'bookmark';
  bookmarkNoData : boolean = true;
  eventbookmarkNoData :boolean = true;
  workshopbookmarkNoData :boolean = true;
  constructor(private dashboardService:DashboardService,
    private route : Router,) { }

  ngOnInit(): void {
    this.catId = 1;
    this.dashboardService.getUserBookmark('')
        .subscribe(res => {
          this.loading = true;
              this.bookmarkData = res.data;
              if(this.bookmarkData.length > 0){
                this.bookmarkNoData = false;
              }
              // console.log(this.bookmarkData);
        });
        this.dashboardService.getUserBookmarkEvent('')
        .subscribe(res => {
          this.loading = true;
              this.eventBookmarkData = res.data;
              if(this.eventBookmarkData.length > 0){
                this.eventbookmarkNoData = false;
              }
              // console.log(this.eventBookmarkData);
        });
        this.dashboardService.getUserBookmarkWorkshop('')
        .subscribe(res => {
          this.loading = true;
              this.workshopBookmarkData = res.data;
              if(this.workshopBookmarkData.length > 0){
                this.workshopbookmarkNoData = false;
              }
              console.log(this.workshopBookmarkData);
        });
  }
  castingInner(id:any){
    this.route.navigate(['casting-inner',id]);
  }
  eventInner(id:any){
    this.route.navigate(['event-inner',id]);
  }
  tab(data:any){
    this.catId = data;
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
