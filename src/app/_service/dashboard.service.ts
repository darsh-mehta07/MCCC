import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Config } from '../_config/config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    headers:any;
    localstorageData : any;
    currentUser : any;
    token : any;
    public options: any;
    constructor(private http: HttpClient) {
    }    
    castingSlider() {     
      return this.http.post(`${Config.BasePath}/casting_banner_image`,null);
    }
    castingCall(data:any){
      return this.http.post(`${Config.BasePath}/new_casting_calls`,data);
    }
    callEndingSoon(data:any){
      return this.http.post(`${Config.BasePath}/call_ending_soon`,data);
    }
    recomendedCasting(data:any){
      return this.http.post(`${Config.BasePath}/show_recommendations`,data);
    }
    bookmarkCasting(data:any){
      return this.http.post(`${Config.BasePath}/bookmark`,data);
    }
    userDetails(){
      return this.http.post(`${Config.BasePath}/user_details`,null);
    }
    editUserDetail(data:any){
      return this.http.post(`${Config.BasePath}/user_edit`,data);
    }
    applyForCasting(data:any){
      return this.http.post(`${Config.BasePath}/user_applied_castings`,data);
    }
    myApplication(data:any){
      return this.http.post(`${Config.BasePath}/get_user_applied_casting`,data);
    }
}
