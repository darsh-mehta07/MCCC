import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_service/alert.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { NotificationService } from 'src/app/_service/notification.service';
@Component({
  selector: 'app-apply-casting',
  templateUrl: './apply-casting.component.html',
  styleUrls: ['./apply-casting.component.css']
})
export class ApplyCastingComponent implements OnInit {
  pageName = 'applycasting';
  loading :boolean = false;
  castingId:any;
  resData:any;
  baseUrl :string = Config.Host+'backend2/';
  imagePath = this.baseUrl+'public/uploads/UserImages/';
  videoPath = this.baseUrl+'public/uploads/UserVideos/';
  userdetail:any;
  form: FormGroup | any;
  submitted = false;
  age:any;
  images:any;
  videos : string[] = [];
  imgArray:any;
  videoArray:any;
  casting_title:any;
  casting_date:any;
  closeResult:any;
  

  cropimages : string[] = [];
  imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};
    cropedfile  :any;
    format : any;
    url : any;
    threeimgerror:boolean = false;
    imageerror:any;
    onevideoerror:boolean = false;
    videoerror:any;
    oldvideo:any;
    secvidbox :boolean = true;
    thrvidbox :boolean = true;
    saveCropImage : boolean = false;
    newVideoAdded:boolean = false;
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private authenticationService: AuthenticationService,
    private dashboardService:DashboardService,
    private location:Location,
    private formBuilder:FormBuilder,
    private alertService: AlertService,
    private modalService: NgbModal,
    private notification : NotificationService,
    ) {
      this.dashboardService.listen().subscribe((e:any)=>{
        this.ngOnInit();
      });
    } 
  ngOnInit(): void {    
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.castingId = params.get('id');
    });
    this.casting_title = sessionStorage.getItem('casting_title');
    this.casting_date = sessionStorage.getItem('casting_date');
    this.form = this.formBuilder.group({
      oldfileSource : [''],
      newfileSource : [''],  
      oldvideofileSource : [''],  
      newvideofileSource : [''], 
      saveAsDraft : [0], 
      casting_id:[this.castingId],
      name : [sessionStorage.getItem('name'),Validators.required],
      age : [sessionStorage.getItem('age'),Validators.required],
      height : [sessionStorage.getItem('height'),Validators.required],
      phone : [sessionStorage.getItem('phone'),Validators.required],
      language : [sessionStorage.getItem('language'),Validators.required],
      city : [sessionStorage.getItem('city'),Validators.required],
      home_town : [sessionStorage.getItem('home_town'),Validators.required],
      hobbies : [sessionStorage.getItem('hobbies'),Validators.required],
    });   
    let image:any = sessionStorage.getItem('images');
    this.imgArray =  JSON.parse(image); 
    let video:any = sessionStorage.getItem('videos'); 
    // console.log(JSON.parse(video));   
    this.videoArray = JSON.parse(video); 
    this.loading = true;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 
  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }else{
      //video update section
      if(this.newVideoAdded){
        console.log('newVideoAdded');
           this.videoArray = null;
           this.patchOldVideoValues();
      }
      //video update section
      this.loading = false;
      let totalimg = this.imgArray.length+this.cropimages.length;
      console.log("videoArray : " , this.videoArray);
      if(this.videoArray!= null){
        this.oldvideo = 1;
      }else{
        this.oldvideo = 0;
      }
      console.log("old Video : " + this.oldvideo);
      console.log("old Video Length : " + this.videos.length);

      let totalvideo = this.videos.length + this.oldvideo;   
      if(totalimg == 3 && totalvideo == 1 ){
        this.threeimgerror = false;
        this.patchOldImageValues();
        this.patchOldVideoValues(); 
        this.dashboardService.applyForCasting(this.form.value)     
        .subscribe(res => {
          this.loading = true;
          this.resData = res;   
          if(this.resData.data.image_1){
          sessionStorage.setItem('image_1',this.resData.data.image_1);
          }else{
              sessionStorage.removeItem('image_1');
          }
          if(this.resData.data.image_2){
          sessionStorage.setItem('image_2',this.resData.data.image_2);
          }else{
            sessionStorage.removeItem('image_2');
          }
          if(this.resData.data.image_3){
          sessionStorage.setItem('image_3',this.resData.data.image_3);
          }else{
            sessionStorage.removeItem('image_3');
          }
          if(this.resData.data.image_4){
          sessionStorage.setItem('image_4',this.resData.data.image_4);
          }else{
            sessionStorage.removeItem('image_4');
          }
          if(this.resData.data.image_5){
          sessionStorage.setItem('image_5',this.resData.data.image_5);
          }else{
            sessionStorage.removeItem('image_5');
          }
          if(this.resData.data.image_6){
          sessionStorage.setItem('image_6',this.resData.data.image_6);
          }else{
            sessionStorage.removeItem('image_6');
          }
          if(this.resData.data.video_1){
          sessionStorage.setItem('video_1',this.resData.data.video_1);
          }else{
            sessionStorage.removeItem('video_1');
          }
          if(this.resData.data.video_2){
          sessionStorage.setItem('video_2',this.resData.data.video_2);
          }else{
            sessionStorage.removeItem('video_2');
          }
          if(this.resData.data.video_3){
          sessionStorage.setItem('video_3',this.resData.data.video_3);
          }else{
            sessionStorage.removeItem('video_3');
          }
          // this.notification.showSuccess('Casting call applied Successfully.','Success!');
          this.route.navigate(['/casting-confirm/'+this.resData.data.id]);       
        });
        
      }else{
        this.loading = true;
        console.log("image count :" + totalimg);
        console.log("video count :" + totalvideo);
        if(totalimg > 3){
          this.imageerror = 'Please Select Only Three Photos';
        this.threeimgerror = true;
        }else if(totalvideo > 1){
          this.videoerror = 'Please Select Only One Video';
        this.onevideoerror = true;
        }
        
      }
    }
  }  
  save(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }else{
      
      if(this.newVideoAdded){
        console.log('newVideoAdded');
           this.videoArray = null;
           this.patchOldVideoValues();
      }
      this.loading = false;
      let totalimg = this.imgArray.length+this.cropimages.length; 
      if(this.videoArray!= null){
        this.oldvideo = 1;
      }else{
        this.oldvideo = 0;
      }
      let totalvideo = this.videos.length + this.oldvideo;
      
      if(totalimg < 7 && totalvideo == 1){
        console.log('213123');
        this.patchOldImageValues();
        this.patchOldVideoValues();
        this.patchSaveValues();
        this.dashboardService.applyForCasting(this.form.value)
        .pipe(first())
        .subscribe(res => {
          this.loading = true;
          this.notification.showSuccess('Casting call saved Successfully.','');
          this.resData = res;   
          this.route.navigate(['/home']);       
        });
      }else{
        this.loading = true;    
        if(totalimg > 7){
          this.imageerror = 'Please Select Only Three Photos';
        this.threeimgerror = true;
        }else if(totalvideo > 4){
          this.videoerror = 'Please Select Only One Video';
        this.onevideoerror = true;
        }
      }
    }
  }
  back(): void {
    // this.location.back()
    window.history.back();
  }  
  closeimgmodel(content:any) {
    this.cropimages = [];
    this.modalService.dismissAll(content);
  }
  saveimgmodel(content:any) {
    this.modalService.dismissAll(content);
  }
  closevideomodel(content:any) {
    this.newVideoAdded = false;
    this.videos = [];
    this.modalService.dismissAll(content);
  }
  savevideomodel(content:any) {
    this.newVideoAdded = true;
    this.modalService.dismissAll(content);
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  patchValues(){
    this.form.patchValue({
       newfileSource: this.cropimages,
    });
  }
  patchSaveValues(){
    this.form.patchValue({
       saveAsDraft: 1,
    });
  }
  patchOldImageValues(){
    this.form.patchValue({
      oldfileSource: this.imgArray,
    });
  }
  patchOldVideoValues(){
    this.form.patchValue({
      oldvideofileSource: this.videoArray,
    });
  }

  onVideoFileChange(event: any){
    let newVideo :string [] = [];
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files && event.target.files[0];
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          if (file.type.indexOf('image') > -1) {
            this.format = 'image';
            this.alertService.error('please select mp4 video', true);
          } else if (file.type.indexOf('video') > -1) {
            this.format = 'video';
          }
          reader.onload = (event: any) => {
            this.url = (<FileReader>event.target).result;
            newVideo.push(event.target.result);
            // if(newVideo.length == 1){
            //   this.secvidbox = false;
            // }
            // if(newVideo.length == 2){
            //   this.thrvidbox = false;
            // }
            this.form.patchValue({
              newvideofileSource: newVideo
            });  
            this.videos = newVideo;         
            this.newVideoAdded = true;
          }
          reader.readAsDataURL(event.target.files[i]);
        }
      }
    }
  // Remove Image
    removePrimaryImage(element: number) {
      this.imgArray.forEach((value:any,index:any)=>{
          if(index==element) this.imgArray.splice(index,1);
          this.patchOldImageValues();
      });
      this.threeimgerror = false;
    }
    removeSelectedImage(url:any){  
      this.threeimgerror = false;  
      this.cropimages = this.cropimages.filter(img => (img != url));
      // this.patchValues();
    }
    removePrimaryVideo() {
      console.log('removeprimaryvideo');
      this.videoArray = '';
      this.patchOldVideoValues();
    }
    removeSelectedVideo(url:any){
      this.videos = this.videos.filter(img => (img != url));
    }
  //--------image crop--------------//
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;    
    this.cropedfile = base64ToFile(this.croppedImage);   
    
}
saveImage(){     
  this.patchValues();                     
  this.saveimgmodel('save');
  this.imageChangedEvent ='';                   
}
cropImage(){
  const file = this.cropedfile;
    var filesAmount = 1;
          for (let i = 0; i < filesAmount; i++) {
                  var reader = new FileReader();  
                  if(file.type.indexOf('image')> -1){
                    this.format = 'image';
                  } else if(file.type.indexOf('video')> -1){
                      this.alertService.error('please select image',true);
                    this.format = 'video';
                  } 
                  reader.onload = (event:any) => {
                    this.url = (<FileReader>event.target).result;
                    if(this.cropimages.length < 3){
                     this.cropimages.push(event.target.result);    
                     this.patchValues();
                     this.saveCropImage = true;
                     if(this.cropimages.length == 3){
                      this.saveimgmodel('save');
                      this.imageChangedEvent ='';                     
                     }
                    }
                  }  
                  reader.readAsDataURL(this.cropedfile);
          }
          this.imageChangedEvent = null;
}
imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');    
}
cropperReady(sourceImageDimensions: Dimensions) {  
    console.log('Cropper ready', sourceImageDimensions);
}
loadImageFailed() {
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
}
