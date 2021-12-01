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
  fileTypes = ['png','jpg','jpeg'];  //acceptable file types
  imagenotload : boolean = false;
  pageName="images";
  finalImageList: any = [];
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
  cropimages : any[] = [];
  savedimages : any[] = [];
  imageChangedEvent: any = '';
  imgId = 0;
  currentProcessingImg: any = 0;
    croppedImage: any = '';
    canvasRotation = 0;
    display = 'none';
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
        console.log(this.imgArray);
      },error=>{
        this.loading = false;
      });      
    }
    get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
    } 
    removePrimaryImage(element: number) {
      this.imgArray.forEach((value:any,index:any)=>{
          if(index==element) {
            this.imgArray.splice(index,1);
            this.commonService.deleteImages({image_id : value.id}).subscribe(
              data => {                   
                this.notification.showSuccess('Image removed Successfully.','');
              },
              error => {              
                this.notification.showError(error.error.message,true);
                });
          }
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
          this.cropimages.forEach((imgObject: { imgBase64: any; }) => {
            console.log(imgObject);
            this.finalImageList.push(imgObject.imgBase64);
            this.patchValues();
            
          })     
          this.patchOldImageValues();
          this.uploading = true;
          this.active=1;
          this.commonService.updateImages(this.form.value).subscribe(
          data => {  
            this.loading = true;
            this.uploading = false;     
            this.active=0;   
            this.notification.showSuccess('Image saved Successfully.','');
          },
          error => {
            this.loading = true;
            this.notification.showError(error.error.message,true);
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
      this.closemodel();
      this.location.back();
    }
    patchValues(){
      this.form.patchValue({
         newfileSource: this.finalImageList,
      });
    }
    saveimgmodel(content:any) {
      this.modalService.dismissAll(content);
    }
    closemodel(){
      this.modalService.dismissAll(); //close model
      this.savedimages = []; // reset the variable
      this.saveCropImage = false; // save button disabled     
      this.imageChangedEvent = null; //reset the image changes event
      this.cropedfile = null; // reset the croped file
    }
    removeSelectedImages(url:any){    
      this.cropimages = this.cropimages.filter(img => (img != url));
      this.patchValues();
    }
    removeSelectedImage(url:any){    
      this.savedimages = this.savedimages.filter(img => (img != url));
      this.cropimages = this.savedimages;
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
  this.modalService.dismissAll('save');
  var extension = event.target.files[0].name.split('.').pop().toLowerCase();
    var isSuccess = this.fileTypes.indexOf(extension) > -1;
    if (isSuccess) { 
    this.imagenotload = false;
    // this.imageChangedEvent = event;
    }else{
      this.notification.showInfo('Select image (jpg,jpeg,png) only.','');
    }
    var cnt = 3 - this.imgArray.length;
    console.log(cnt);
    for (var i = 0; i < event.target.files.length; i++) {
      if(i < cnt){
      this.imageProcess(event, event.target.files[i]);
    }
  }
}

imageProcess(event: any, file: any) {
    //Setting images in our required format
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.imgId = this.imgId + 1;
      // if(this.ulpoadedFiles.length < 3){
        this.cropimages.push({ imgId: this.imgId, imgBase64: reader.result, imgFile: file });
      // }
    };
    console.log(this.cropimages);
  }
  cropImage(imgId: any) {
    console.log('dd');
    this.currentProcessingImg = imgId;
    console.log(imgId);
    console.log(this.cropimages);
    var imgObj = this.cropimages.find((x: { imgId: any; }) => x.imgId === imgId);
    //created dummy event Object and set as imageChangedEvent so it will set cropper on this image 
    var event = {
      target: {
        files: [imgObj.imgFile]
      }
    };
    this.imageChangedEvent = event;
    this.openModal();
  }
  SaveCropedImage() {
    var imgObj = this.cropimages.find((x: { imgId: any; }) => x.imgId === this.currentProcessingImg);
    imgObj.imgBase64 = this.croppedImage;
    // this.finalImageList.push(imgObj.imgBase64);
    // this.patchValues();
    this.onCloseHandled();
  }
  openModal() {
    this.display = 'block';
  }

  onCloseHandled() {
    this.imageChangedEvent = null;
    this.display = 'none';
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
  this.cropimages = this.savedimages;
  this.patchValues();                     
  this.saveimgmodel('save');   
  this.savedimages = [];// reset the variable
  this.saveCropImage = false; // save button disabled     
  // this.imageChangedEvent = null; //reset the image changes event
  // this.cropedfile = null; // reset the croped file               
}
// cropImage(){
// const file = this.cropedfile;
//   var filesAmount = 1;
//         for (let i = 0; i < filesAmount; i++) {
//                 var reader = new FileReader();  
//                 // if(file.type.indexOf('image')> -1){
//                 //   this.format = 'image';
//                 // } else if(file.type.indexOf('video')> -1){
//                 //     this.alertService.error('please select image',true);
//                 //   this.format = 'video';
//                 // } 
//                 reader.onload = (event:any) => {
//                   this.url = (<FileReader>event.target).result;
//                   if(this.savedimages.length < 3){
//                   //  this.cropimages.push(event.target.result); 
//                    this.savedimages.push(event.target.result);   
//                    console.log("savedimages : ",this.savedimages);
//                    this.patchValues();
//                    this.saveCropImage = true;
//                    if(this.savedimages.length == 3){
//                     // this.saveimgmodel('save');
//                     this.imageChangedEvent ='';                     
//                    }
//                   }
//                 }  
//                 reader.readAsDataURL(this.cropedfile);
//         }
//         this.imageChangedEvent = null;
//         this.cropedfile = null;
// }
imageLoaded() {
  this.imagenotload = false;
    this.showCropper = true;
    console.log('Image loaded');    
}
// cropperReady(sourceImageDimensions: Dimensions) {  
//   console.log('Cropper ready', sourceImageDimensions);
// }
cropperReady() {
  // cropper ready
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

}
