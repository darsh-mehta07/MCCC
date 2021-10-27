import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Config } from '../_config/config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

    constructor(private http: HttpClient) {
    } 
    getAboutMCCC(){
      return this.http.get(`${Config.BasePath}/display_about_mccc`);
    }
    getFAQ(){
      return this.http.get(`${Config.BasePath}/display_main_faq`);
    }
    getFAQInner(data:any){
      return this.http.post(`${Config.BasePath}/display_faq`,data);
    }
    getHelp(){
      return this.http.get(`${Config.BasePath}/display_help_mccc`);
    }
    userDisplayContactDetail(){
      return this.http.get(`${Config.BasePath}/user_display_contact_detail`);
    }
    userUpdateContactDetail(data:any){
      return this.http.post(`${Config.BasePath}/user_update_contact_detail`,data);
    }
    anatomyInner(){
      return this.http.get(`${Config.BasePath}/display_anatomy`);
    }
    anatomyInnerUpdate(data:any){
      return this.http.post(`${Config.BasePath}/add_update_anatomy`,data);
    }
    personal(){
      return this.http.get(`${Config.BasePath}/display_user_personal_info`);
    }
    personalUpdate(data:any){
      return this.http.post(`${Config.BasePath}/add_update_anatomy`,data);
    }
    myImages(){
      return this.http.get(`${Config.BasePath}/display_user_image_data`);
    }
    updateImages(data:any){
      return this.http.post(`${Config.BasePath}/update_user_image_data`,data);
    }
    deleteImages(data:any){
      return this.http.post(`${Config.BasePath}/delete_user_image_data`,data);
    }
    myVideo(){
      return this.http.get(`${Config.BasePath}/display_user_video_data`);
    }
    updateVideo(data:any): Observable<any>{
      return this.http.post(`${Config.BasePath}/update_user_video_data`,data,{reportProgress: true,observe: 'events'});
    }
    
}
