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
  catId:any;
  pageName = 'bookmark';
  bookmarkNoData : boolean = true;
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
              console.log(this.bookmarkData);
        });
  }
  castingInner(id:any){
    this.route.navigate(['casting-inner',id]);
  }
  tab(data:any){
    this.catId = data;
  }

}
