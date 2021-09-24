import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  openMenu:boolean = false;
  currentUser: User;
  constructor( private route:Router,
    private authenticationService: AuthenticationService,) {
      this.currentUser = this.authenticationService.currentUserValue;
     }

  ngOnInit(): void {
    this.openMenu = false;
  }
  openNav(){
    this.openMenu = true;
  }
  closeNav(){
    this.openMenu = false;
  }
  logout(){
    this.authenticationService.logout();
    this.route.navigate(['/signin']);
  }

}
