import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../_config/config';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  constructor(private http: HttpClient) { }
  get_response(responce:any){
    return this.http.get<any>(Config.BasePath +'/otp',responce);
  }
}