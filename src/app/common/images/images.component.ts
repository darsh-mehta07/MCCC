import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertService } from 'src/app/_service/alert.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { CommonService } from 'src/app/_service/common.service';
import { Location } from '@angular/common';
import { Config } from 'src/app/_config/config';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/_service/notification.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
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
    closeResult:any;
    saveCropImage : boolean = false;
  constructor(  private notification : NotificationService,private modalService: NgbModal,private alertService:AlertService,private formBuilder: FormBuilder,private location:Location,private route:Router,
    private authenticationService: AuthenticationService,private commonService:CommonService) {
      this.currentUser = this.authenticationService.currentUserValue;
     }

     ngOnInit(): void {
      this.form = this.formBuilder.group({
        oldfileSource : [''],
        newfileSource : [''], 
      });
      this.loading = false;
      this.commonService.myImages().subscribe(res => {
        this.loading = true;
        this.resData = res;   
        this.datas = this.resData.data;
        this.imgArray =  this.datas;
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
          this.patchOldImageValues();
      });
    }
    submit(){
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }else{
        this.loading = false;
        let totalimg = this.imgArray.length+this.cropimages.length;
         
        if(totalimg > 0 ){         
          this.patchOldImageValues();
          this.uploading = true;
          this.active=1;
          this.commonService.updateImages(this.form.value).subscribe(
          data => {  
            this.loading = true;
            this.uploading = false;     
            this.active=0;   
            this.notification.showSuccess('Video save Successfully.','');
          },
          error => {
            this.loading = false;
            this.alertService.error(error.error.message,true);
              this.uploading = false;
              this.active=0;
          });
          
        }else{
          this.loading = false;
          console.log("image count :" + totalimg);
          
          if(totalimg > 3){
            this.imageerror = 'Please Select Only Three Photos';
          this.threeimgerror = true;
          }          
        }
      }
    } 

    back(): void {
      this.location.back();
    }
    patchValues(){
      this.form.patchValue({
         newfileSource: this.cropimages,
      });
    }
    saveimgmodel(content:any) {
      this.modalService.dismissAll(content);
    }
    removeSelectedImage(url:any){    
      this.cropimages = this.cropimages.filter(img => (img != url));
      this.patchValues();
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
 //--------image crop--------------//
 fileChangeEvent(event: any): void {
  this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;    
  this.cropedfile = base64ToFile(this.croppedImage);   
  
}
patchOldImageValues(){
  this.form.patchValue({
    oldfileSource: this.imgArray,
  });
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
