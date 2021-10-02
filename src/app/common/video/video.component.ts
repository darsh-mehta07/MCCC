import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertService } from 'src/app/_service/alert.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { CommonService } from 'src/app/_service/common.service';
import { Location } from '@angular/common';
import { Config } from 'src/app/_config/config';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  pageName="images";
  currentUser: User;
  loading:boolean = true;
  datas : any;
  resData:any;
  form: FormGroup | any;
  submitted = false;
  uploading:boolean=false;
  active:any=0;
  baseUrl :string = Config.Host+'backend2/';
  imagePath = this.baseUrl+'public/uploads/UserImages/';
  imgArray:any;
  cropimages : string[] = [];
  constructor(  private alertService:AlertService,private formBuilder: FormBuilder,private location:Location,private route:Router,
    private authenticationService: AuthenticationService,private commonService:CommonService) {
      this.currentUser = this.authenticationService.currentUserValue;
     }

     ngOnInit(): void {
      // this.form = this.formBuilder.group({
        
      // });
      this.loading = false;
      this.commonService.myImages().subscribe(res => {
        this.loading = true;
        this.resData = res;   
        this.datas = this.resData.data;
        
        console.log(this.datas);
      },error=>{
        this.loading = false;
      });
      
    }
    get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
    } 
    removePrimaryImage(element: number) {
      this.imgArray.forEach((value:any,index:any)=>{
          if(index==element) this.imgArray.splice(index,1);
          // this.patchOldImageValues();
      });
    }
    submit(){
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }else{
        this.uploading = true;
        this.active=1;
        this.commonService.anatomyInnerUpdate(this.form.value).subscribe(
          data => {  
            this.uploading = false;     
            this.active=0;   
            this.alertService.success('Update Successfully',false);
          },
          error => {
            this.alertService.error(error.error.message,true);
              this.uploading = false;
              this.active=0;
          }); 
      }
    }
    back(): void {
      this.location.back();
    }

}
