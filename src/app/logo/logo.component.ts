import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../_service/dashboard.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  constructor(private route : Router,private dashboardService : DashboardService) { }

  ngOnInit(): void {
    //redirect to navigate page after 3 milisecond
    setTimeout(()=>{                           
          this.dashboardService.filter('applyed');
          this.route.navigate(['/welcome']);
    }, 3000);
  }
}
