import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../_config/config';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  constructor(private http: HttpClient) { }
  get_response(responce:any){
    return this.http.post<any>(Config.BasePath +'/otp',responce);
  }
  get_resendotp(responce:any){
    return this.http.post<any>(Config.BasePath +'/resendOTP',responce);
  }
}