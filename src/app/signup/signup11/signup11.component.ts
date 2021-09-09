import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/_service/notification.service';

@Component({
  selector: 'app-signup11',
  templateUrl: './signup11.component.html',
  styleUrls: ['./signup11.component.css']
})
export class Signup11Component implements OnInit {

  constructor(private notification:NotificationService,private route : Router,private authenticationService: AuthenticationService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
         this.route.navigate([Config.AfterLogin]);
     }
 } 
  ngOnInit(): void {
  }
  completeYourProfile(){
    this.authenticationService.login(sessionStorage.getItem('email'), sessionStorage.getItem('password'))
            .pipe(first())
            .subscribe(
                data => {
                  sessionStorage.clear();
                  sessionStorage.setItem('profile_status',data.profileStatus);
                  if(data.profileStatus === 'false'){
                    this.route.navigate(['/profile_first_step']);
                  }else{
                    this.route.navigate(['/home']);
                  }
                },
                error => {
                  this.notification.showError(error,'Mccc');
                });
  }

}
