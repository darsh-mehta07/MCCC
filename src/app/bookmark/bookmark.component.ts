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
  pageName = 'bookmark';
  constructor(private dashboardService:DashboardService,
    private route : Router,) { }

  ngOnInit(): void {
    this.dashboardService.getUserBookmark('')
        .subscribe(res => {
          this.loading = true;
              this.bookmarkData = res.data;
              console.log(this.bookmarkData);
        });
  }
  castingInner(id:any){
    this.route.navigate(['casting-inner',id]);
  }

}
