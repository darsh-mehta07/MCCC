import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private route: Router) {

    // redirect to home if already logged in
    if (sessionStorage.getItem('social_login') === 'true') {
      console.log('social login');
      if (sessionStorage.getItem('profile_status') === 'true') {
        this.route.navigate([Config.AfterLogin]);
      }
    } else {
      console.log('normal login');
      if (this.authenticationService.currentUserValue) {
        if (sessionStorage.getItem('profile_status') === 'true') {
          this.route.navigate([Config.AfterLogin]);
        }
      } else {
        this.route.navigate(['/signin']);
      }
    }
  }

  ngOnInit(): void {
    sessionStorage.setItem('profile_status', 'true')
  }

}
