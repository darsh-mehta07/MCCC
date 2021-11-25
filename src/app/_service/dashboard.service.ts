import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Config } from '../_config/config';
import{MyApplication} from'../_models/my-application';
import { shareReplay, map } from 'rxjs/operators';
import { Observable,BehaviorSubject, Subject  } from 'rxjs';
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
    bookmarkWorkshopEvents(data:any){
      return this.http.post(`${Config.BasePath}/bookmark_workshop_events`,data);
    }
    userDetails(data:any){
      return this.http.post(`${Config.BasePath}/user_details`,data);
    }
    userDetailsForPeofile(){
      return this.http.post(`${Config.BasePath}/user_profile`,null);
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
    // myApplication(data:any){
    //   return this.http.post(`${Config.BasePath}/get_user_applied_casting`,data);
    // }
    myApplication(data:any):Observable<MyApplication[]>{
      return this.http.post<MyApplication[]>(`${Config.BasePath}/get_user_applied_casting`,data);
    }

    private _listners = new Subject<any>();
    listen():Observable<any>{
      return this._listners.asObservable();
    }
    filter(filterBy:string){
      // console.log('filterBy :',filterBy);
      this._listners.next(this.filter)
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
    getUserNotification(data:any){
      return this.http.post<any>(`${Config.BasePath}/get_user_notification`,data);
    }
    UserNotificationMarkRead(data:any){
      return this.http.post<any>(`${Config.BasePath}/user_notification_mark_read`,data);
    }
    getUserNotificationCounter(data:any){
      return this.http.post<any>(`${Config.BasePath}/get_user_notification_counter`,data);
    }

    getUserBookmark(data:any){
      return this.http.post<any>(`${Config.BasePath}/get_user_bookmark`,data);
    }
    getUserBookmarkEvent(data:any){
      return this.http.post<any>(`${Config.BasePath}/get_user_bookmark_event`,data);
    }
    getUserBookmarkWorkshop(data:any){
      return this.http.post<any>(`${Config.BasePath}/get_user_bookmark_workshop`,data);
    }
}
