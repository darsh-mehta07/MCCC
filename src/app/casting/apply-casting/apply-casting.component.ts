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

@Component({
  selector: 'app-apply-casting',
  templateUrl: './apply-casting.component.html',
  styleUrls: ['./apply-casting.component.css']
})
export class ApplyCastingComponent implements OnInit {
  loading = false;
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
    
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private authenticationService: AuthenticationService,
    private dashboardService:DashboardService,
    private location:Location,
    private formBuilder:FormBuilder,
    private alertService: AlertService,
    private modalService: NgbModal
    ) {
    } 
  ngOnInit(): void {    
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.castingId = params.get('id');
    });
    this.casting_title = sessionStorage.getItem('casting_title');
    this.casting_date = sessionStorage.getItem('casting_date');
    this.form = this.formBuilder.group({
      fileSource : [''],
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
    this.videoArray = JSON.parse(video); 
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 
  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }else{
      let totalimg = this.imgArray.length+this.cropimages.length;
      if(totalimg == 3){
        this.loading = true;
        this.route.navigate(['/casting-confirm/'+this.castingId]);
      }else{
        this.threeimgerror = true;
      }
    }
  }  
  back(): void {
    this.location.back()
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
patchValues(){
  this.form.patchValue({
     fileSource: this.cropimages,
  });
  console.log("cropimages Length :" + this.cropimages.length);
  // this.imgArray.push(this.cropimages);
}
// Remove Image
  removePrimaryImage(element: number) {
    this.imgArray.forEach((value:any,index:any)=>{
        if(index==element) this.imgArray.splice(index,1);
        sessionStorage.setItem('images',JSON.stringify(this.imgArray));
    });
  }
  removeSelectedImage(url:any){    
    this.cropimages = this.cropimages.filter(img => (img != url));
    // this.patchValues();
  }
}
