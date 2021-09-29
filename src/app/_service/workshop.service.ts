import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../_config/config';
@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }
  get_upcoming_workshop_data(data:any){
    return this.http.post<any>(Config.BasePath +'/get_upcoming_workshop_data',data);
  }

  get_endingsoon_workshop_data(data:any){
    return this.http.post<any>(Config.BasePath +'/get_endingsoon_workshop_data',data);
  }

  get_previous_workshop_data(data:any){
    return this.http.post<any>(Config.BasePath +'/get_previous_workshop_data',data);
  }

  get_each_workshop_data(data:any){
    return this.http.post<any>(Config.BasePath +'/get_each_workshop_data',data);
  }

  user_apply_for_workshop(data:any){
    return this.http.post<any>(`${Config.BasePath}/user_apply_for_workshop`,data);
  }
  
  check_for_apply(data:any){
    return this.http.post<any>(`${Config.BasePath}/check_for_apply`,data);
  }
}
