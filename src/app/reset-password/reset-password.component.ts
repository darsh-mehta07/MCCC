import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
import { Config } from '../_config/config';
import { UserService } from '../_service/user.service';
import { first } from 'rxjs/operators';
import { NotificationService } from '../_service/notification.service';
import { MustMatch,MustMatchfield } from '../_helpers/must-match.validator';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup | any;
  submitted = false;
  token:any;
  responceData:any;
  rotp : any;
  constructor(private notifyService : NotificationService,private userService:UserService,private actRoute:ActivatedRoute ,private formBuilder: FormBuilder, private route : Router,private authenticationService: AuthenticationService,) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
         this.route.navigate([Config.AfterLogin]);
     }
 } 

  ngOnInit(): void {    
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.token = params.get('token');
    });
    this.rotp = sessionStorage.getItem('rotp');
    this.form = this.formBuilder.group({
      password: ['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
      confirm_password: ['',Validators.required],
      otp : ['',[Validators.required ,Validators.max(9999),Validators.min(1000)]]
    }, {
      validator: [MustMatchfield('password','confirm_password'),MustMatch(this.rotp,'otp')]
  });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 
  submit(){
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }else{ 
      this.userService.reset_password(this.form.value,this.token).pipe(first()).subscribe(res => {
        this.responceData = res;
        if(this.responceData.status == 'true'){  
          sessionStorage.removeItem('rotp');
          this.notifyService.showSuccess("Password Reset Successfully !!", "Mccc");
          this.route.navigate(['/signin']);
        }else{
          this.notifyService.showError(this.responceData.message, "Mccc")
          console.log('Hello forgot',this.responceData);
        }          
       },error=>{
        this.notifyService.showError(error.message, "Mccc")
       });       
        
    }
  }
}
