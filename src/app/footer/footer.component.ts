import { Component, OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthenticationService } from '../_service/authentication.service';
import { DashboardService } from '../_service/dashboard.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() pageName: any;
  pagename :any;
  openprofilenav:boolean = false;
  currentUser: User;
  constructor( private route:Router,private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,) {
      this.currentUser = this.authenticationService.currentUserValue;
      this.dashboardService.listen().subscribe((e:any)=>{
        this.closeprofile();
      });
     }
  ngOnInit(): void {
  }
  openprofile(){
    this.pageName = 'profile';
    this.openprofilenav = true;
    // this.dashboardService.filter('footer');
  }
  home(){
    this.pageName = 'home';
    this.route.navigate(['/home']);
  }
  games(){
    this.pageName = 'games';
    this.route.navigate(['/games']);
  }
  myApplication(){
    this.pageName = 'my-application';
    this.route.navigate(['/my-aaplication']);
  }
  closeprofile(){
    this.openprofilenav = false;
  }
  logout(){
    this.authenticationService.logout();
    this.openprofilenav = false;
    this.pageName = undefined;
    this.route.navigate(['/signin']);
  }
}
