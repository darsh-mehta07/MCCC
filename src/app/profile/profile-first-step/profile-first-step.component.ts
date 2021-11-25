import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/_service/user.service';
import { AlertService } from 'src/app/_service/alert.service';
import { Dimensions,ImageCroppedEvent, ImageTransform,base64ToFile} from 'ngx-image-cropper';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/_service/notification.service';


@Component({
  selector: 'app-profile-first-step',
  templateUrl: './profile-first-step.component.html',
  styleUrls: ['./profile-first-step.component.css']
})
export class ProfileFirstStepComponent implements OnInit {

  form: FormGroup | any;
  submitted = false;
  images : string[] = [];
  format : any;
  url : any;
  imgChangeEvt: any = '';
  cropImgPreview: any = '';  
  responseData :any;
  imagenotload : boolean = false;
  imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};
    cropedfile  :any;
    uploading:boolean = false;
    cropperbutton:boolean = false;
    cropperarea : boolean = true;
    fileTypes = ['png','jpg','jpeg'];  //acceptable file types
  constructor(
    private formBuilder: FormBuilder,
    private route : Router,
    private authenticationService: AuthenticationService,
    private userService : UserService,
    private alertService : AlertService,
    private location:Location,
    private notification:NotificationService,
    ) {
     // redirect to home if already logged in
     if(sessionStorage.getItem('social_login') === 'true'){
        if(sessionStorage.getItem('profile_status') === 'true'){
          this.route.navigate([Config.AfterLogin]);
        }
     }else{
      if (this.authenticationService.currentUserValue) {
        if(sessionStorage.getItem('profile_status') === 'true'){
          this.route.navigate([Config.AfterLogin]);
        } 
      }else{
        this.route.navigate(['/signin']);
      }
    }
  } 

  fileChangeEvent(event: any): void {
    var extension = event.target.files[0].name.split('.').pop().toLowerCase();
    var isSuccess = this.fileTypes.indexOf(extension) > -1;
    if (isSuccess) { 
    this.imagenotload = false;
    this.imageChangedEvent = event;
    }else{
      this.notification.showInfo('  Select image (jpg,jpeg,png) only.','');
    }
}

imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;    
    this.cropedfile = base64ToFile(this.croppedImage);   
}

imageLoaded() {
  this.imagenotload = false;
    this.showCropper = true;
    console.log('Image loaded');    
}

cropperReady(sourceImageDimensions: Dimensions) {  
    this.cropperbutton = true;
    console.log('Cropper ready : ', sourceImageDimensions);
}

loadImageFailed() {
  this.imagenotload = true;
  this.notification.showInfo('Load failed.','');
    console.log('Load failed');
}

rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
}

rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
}

private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
        ...this.transform,
        flipH: flippedV,
        flipV: flippedH
    };
}


flipHorizontal() {
    this.transform = {
        ...this.transform,
        flipH: !this.transform.flipH
    };
}

flipVertical() {
    this.transform = {
        ...this.transform,
        flipV: !this.transform.flipV
    };
}

resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
}

zoomOut() {
    this.scale -= .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
}

zoomIn() {
    this.scale += .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
}

toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
}

updateRotation() {
    this.transform = {
        ...this.transform,
        rotate: this.rotation
    };
}
saveImage(){
  const file = this.cropedfile;
    var filesAmount = 1;
          for (let i = 0; i < filesAmount; i++) {
                  var reader = new FileReader();  
                  if(file.type.indexOf('image')> -1){
                    this.format = 'image';
                  } else if(file.type.indexOf('video')> -1){
                    this.notification.showSuccess(' please select image.','');
                    this.format = 'video';
                  } 
                  reader.onload = (event:any) => {
                    this.url = (<FileReader>event.target).result;
                    if(this.images.length < 3){
                     this.images.push(event.target.result);    
                     this.patchValues(); 
                     if(this.images.length == 3){
                     this.cropperbutton = false;  
                     this.cropperarea = false; 
                     this.imageChangedEvent = '';
                     }                 
                    }
                  }  
                  reader.readAsDataURL(this.cropedfile);
          }
          this.imageChangedEvent = null;
        this.cropedfile = null;
}
  ngOnInit(): void {    
    this.form = this.formBuilder.group({
      files : ['',Validators.required],
      fileSource : ['',Validators.required]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  // onFileChange(event:any): void {
  //   this.imgChangeEvt = event;
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files && event.target.files[0];
  //       var filesAmount = event.target.files.length;
  //       for (let i = 0; i < filesAmount; i++) {
  //               var reader = new FileReader();  
  //               if(file.type.indexOf('image')> -1){
  //                 this.format = 'image';
  //               } else if(file.type.indexOf('video')> -1){
  //                   this.alertService.error('please select image',true);
  //                 this.format = 'video';
  //               } 
  //               reader.onload = (event:any) => {
  //                 this.url = (<FileReader>event.target).result;
  //                  this.images.push(event.target.result);    
  //                  this.patchValues();
  //               }  
  //               reader.readAsDataURL(event.target.files[i]);
  //       }
  //   }
  // }
  // Patch form Values
  patchValues(){
    this.form.patchValue({
       fileSource: this.images
    });
  }
  // Remove Image
  removeImage(url:any){
    // console.log(this.images,url);    
    this.images = this.images.filter(img => (img != url));
    if(this.images.length < 3){
      this.cropperbutton = true;  
      this.cropperarea = true; 
      } 
    // this.patchValues();
  }

  submit(){
    this.uploading = true;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }else{      
      this.userService.upload_image(this.form.value).pipe(first()).subscribe(res => { 
        this.uploading = false;       
        this.responseData = res;
        if(this.responseData.status == 'true'){
            this.route.navigate(['/profile_second_step']);
        }else{
          this.notification.showSuccess(' Somthing Wrong.','');
        }
        
      },error=>{
        this.uploading = false;
      });
    }
  }
  back(): void {
    this.authenticationService.logout();
    this.route.navigate(['/signin']);
  }
}
