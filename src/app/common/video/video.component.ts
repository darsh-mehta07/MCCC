import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertService } from 'src/app/_service/alert.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { CommonService } from 'src/app/_service/common.service';
import { Location } from '@angular/common';
import { Config } from 'src/app/_config/config';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/_service/notification.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  currentPlayingVideo: HTMLVideoElement | any;
  waitText :boolean = false;
  progress: number = 0;
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE' | any;
  closeResult:any;
  videoArray:any;
  videos : string[] = [];
  videosaved : string[] = [];
  oldvideo:any;
  secvidbox :boolean = true;
  thrvidbox :boolean = true;
  format : any;
    url : any;
    onevideoerror:boolean = false;
    videoerror:any;
    newVideoAdded:boolean = false;


  pageName="images";
  currentUser: User;
  loading:boolean = true;
  videoloading : boolean = true;
  datas : any;
  resData:any;
  form: FormGroup | any;
  submitted = false;
  uploading:boolean=false;
  active:any=0;
  fileSizeaInKB : boolean = false;
  fileselected : boolean = false;
  baseUrl :string = Config.Host+'backend2/';
  videoPath = this.baseUrl+'public/uploads/UserVideos/';
  fileTypes = ['mp4'];  //acceptable file types
  constructor(  private modalService: NgbModal,private notification : NotificationService,private formBuilder: FormBuilder,private location:Location,private route:Router,
    private authenticationService: AuthenticationService,private commonService:CommonService) {
      this.currentUser = this.authenticationService.currentUserValue;
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
        oldvideofileSource:[''],
        newvideofileSource:[''],
      });
      this.loading = false;
      this.commonService.myVideo().subscribe(res => {
        this.loading = true;
        this.resData = res;   
        this.datas = this.resData.data;
        this.videoArray = this.datas;
      },error=>{
        this.loading = false;
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
      //video update section
      if(this.newVideoAdded){
        console.log('newVideoAdded');
           this.videoArray = null;
           this.patchOldVideoValues();
      }
      //video update section
      this.videoloading = false;
      if(this.videoArray!= null){
        this.oldvideo = 1;
      }else{
        this.oldvideo = 0;
      }
      let totalvideo = this.videos.length + this.oldvideo;

      if(totalvideo > 0){
        console.log('if');
        this.patchOldVideoValues();
        this.commonService.updateVideo(this.form.value)
        .subscribe(
          (event: HttpEvent<any>) => {
          if (event.type == HttpEventType.UploadProgress) {
            let total:any = event.total;
            this.progress = Math.round((100 / total) * event.loaded);
            this.waitText = true;
            this.videoloading = false;
          } else if (event.type == HttpEventType.Response) {
            this.videoloading = true;
            this.progress = 0;
            this.waitText = false;
            this.notification.showSuccess('Video saved Successfully.','');
            this.resData = event;
          }
        });
      }else{    
        console.log('else');
        this.videoloading = true;
        this.loading = true;    
         if(totalvideo > 4){
          this.videoerror = 'Please Select Only One Video';
        this.onevideoerror = true;
        }
      }
    }
    }
    back(): void {
      this.closevideomodel('close click');
      this.location.back();
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

    removePrimaryVideo() {
      console.log('removeprimaryvideo');
      this.videoArray = '';
      this.patchOldVideoValues();
    }
    savevideomodel(content:any) {
      this.modalService.dismissAll(content);
      this.videos = this.videosaved;
      this.newVideoAdded = true;      
      this.videosaved = [];
    }

    closevideomodel(content:any) {
      this.fileselected = false;
      this.fileSizeaInKB = false;
      this.videosaved = [];
      // this.videos = [];
      this.modalService.dismissAll(content);
    }
    removeSelectedVideo(url:any){
      this.videos = this.videos.filter(img => (img != url));
    }
    patchOldVideoValues(){
      this.form.patchValue({
        oldvideofileSource: this.videoArray,
      });
    }
    onVideoFileChange(event: any){
      this.fileSizeaInKB = false;
      let newVideo :string [] = [];
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files && event.target.files[0];
        var extension = event.target.files[0].name.split('.').pop().toLowerCase();
        
        var isSuccess = this.fileTypes.indexOf(extension) > -1;
        if (isSuccess && file.type.indexOf('video') > -1) { 
          this.fileselected = true;   
        const fileSizeInKB = Math.round(file.size / 1024);
        if(fileSizeInKB > 102400){
          this.fileSizeaInKB = true;             
          this.notification.showInfo('Please Select file less then 100 MB.','');
        }else{
          var filesAmount = event.target.files.length;
          this.format = 'video';
          for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();         
            reader.onload = (event: any) => {
              this.url = (<FileReader>event.target).result;
              newVideo.push(event.target.result);
              this.form.patchValue({
                newvideofileSource: newVideo
              });  
              this.videosaved = newVideo;         
              this.newVideoAdded = false;           
            }
            reader.readAsDataURL(event.target.files[i]);
          }
        }
      }else{
        this.notification.showInfo('please select mp4 video.','');
      }
      }
    }

}
