import { Component, OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthenticationService } from '../_service/authentication.service';

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
  constructor( private route:Router,
    private authenticationService: AuthenticationService,) {
      this.currentUser = this.authenticationService.currentUserValue;
     }
  ngOnInit(): void {
  }
  openprofile(){
    this.pageName = 'profile';
    this.openprofilenav = true;
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
