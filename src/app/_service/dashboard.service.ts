import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Config } from '../_config/config';
import{MyApplication} from'../_models/my-application';
import { shareReplay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public castingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
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
    userDetails(data:any){
      return this.http.post(`${Config.BasePath}/user_details`,data);
    }
    editUserDetail(data:any){
      return this.http.post(`${Config.BasePath}/user_edit`,data);
    }
    applyForCasting(data:any){
      return this.http.post(`${Config.BasePath}/user_applied_castings`,data);
    }
    confirmCasting(data:any){
      return this.http.post(`${Config.BasePath}/confirm_casting_application`,data);
    }
    getconfirmCasting(data:any){
      return this.http.post(`${Config.BasePath}/get_confirm_casting_application`,data);
    }
    myApplication(data:any){
      return this.http.post(`${Config.BasePath}/get_user_applied_casting`,data);
    }
    getEvents(){
      return this.http.get(`${Config.BasePath}/events`);
    }
    innerEvents(data:any){
      return this.http.post(`${Config.BasePath}/event_inner`,data);
    }
    user_apply_for_events(data:any){
      return this.http.post<any>(`${Config.BasePath}/user_apply_for_events`,data);
    }
    check_for_event_apply(data:any){
      return this.http.post<any>(`${Config.BasePath}/check_for_event_apply`,data);
    }
    
    // myApplication(data:any):Observable<MyApplication[]>{
    //   // return this.http.post(`${Config.BasePath}/get_user_applied_casting`,data);
    //   return this.http.post<MyApplication[]>(`${Config.BasePath}/get_user_applied_casting`,data);
    // }
}
