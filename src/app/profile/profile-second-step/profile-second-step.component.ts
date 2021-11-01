import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/_service/user.service';
import { AlertService } from 'src/app/_service/alert.service';
import { NotificationService } from 'src/app/_service/notification.service';


@Component({
  selector: 'app-profile-second-step',
  templateUrl: './profile-second-step.component.html',
  styleUrls: ['./profile-second-step.component.css']
})
export class ProfileSecondStepComponent implements OnInit {
  currentPlayingVideo: HTMLVideoElement | any;
  form: FormGroup | any;
  submitted = false;
  images: string[] = [];
  format: any;
  url: any;
  responseData: any;
  uploading:boolean=false;
  videoloading :boolean = false;
  fileSizeaInKB : boolean = false;
  fileSelected : boolean = false;
  fileTypes = ['mp4'];  //acceptable file types
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private notification:NotificationService,
  ) {
    // redirect to home if already logged in
    // redirect to home if already logged in
    if (sessionStorage.getItem('social_login') === 'true') {
      if (sessionStorage.getItem('profile_status') === 'true') {
        this.route.navigate([Config.AfterLogin]);
      }
    } else {
      if (this.authenticationService.currentUserValue) {
        if (sessionStorage.getItem('profile_status') === 'true') {
          this.route.navigate([Config.AfterLogin]);
        }
      } else {
        this.route.navigate(['/signin']);
      }
    }
  }
  onPlayingVideo(event:any) {
    event.preventDefault();
    // play the first video that is chosen by the user
    if (this.currentPlayingVideo === undefined) {
      console.log('video playing');
        this.currentPlayingVideo = event.target;
        this.currentPlayingVideo.play();
    } else {
    // if the user plays a new video, pause the last one and play the new one
        if (event.target !== this.currentPlayingVideo) {         
            this.currentPlayingVideo.pause();
            // this.currentPlayingVideo = event.target;
            // this.currentPlayingVideo.play();
        }
    }
}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      files: ['', Validators.required],
      fileSource: ['', Validators.required]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onFileChange(event: any) {
    this.fileSizeaInKB = false;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files && event.target.files[0];
      var extension = event.target.files[0].name.split('.').pop().toLowerCase();
      
      var isSuccess = this.fileTypes.indexOf(extension) > -1;
      if (isSuccess && file.type.indexOf('video') > -1) { 
        this.fileSelected = true;     
        const fileSizeInKB = Math.round(file.size / 1024);
        if(fileSizeInKB > 102400){
          this.fileSizeaInKB = true;             
          this.notification.showInfo('Please Select file less then 100 MB.','');
        }else{
          this.format = 'video';        
              var filesAmount = event.target.files.length;            
              for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();        
                reader.onload = (event: any) => {
                  this.url = (<FileReader>event.target).result;
                  this.images.push(event.target.result);
                  this.form.patchValue({
                    fileSource: this.images
                  });
                }
                reader.readAsDataURL(event.target.files[i]);
              }
            }
      }else{
        this.notification.showInfo('please select mp4 video.','');
      }
    }
  }
  submit() {
    this.videoloading = true;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.userService.upload_video(this.form.value).pipe(first()).subscribe(res => {
        this.videoloading = false;  
        this.responseData = res;
        if (this.responseData.status == 'true') {
          // console.log('video else');
          //   this.currentPlayingVideo.pause();
          this.route.navigate(['/profile_final_step']);
        } else {
          this.notification.showInfo(this.responseData.status,'');
          this.notification.showInfo(this.responseData,'');
        }
      },error=>{
        this.notification.showInfo(error,'');
        this.videoloading = false;
      });
    }
  }

}
