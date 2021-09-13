import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { Config } from '../_config/config';

@Injectable({ providedIn: 'root' })
export class UserService {
    headers:any;
    localstorageData : any;
    currentUser : any;
    token : any;
    public options: any;
    constructor(private http: HttpClient) {
     }
     
    getAll() {
        return this.http.get<User[]>(`${Config.BasePath}/dashboard`);
    }

    register(user: User) {
        return this.http.post(`${Config.BasePath}/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${Config.BasePath}/users/${id}`);
    }
    upload_image(data :any){
        return this.http.post(`${Config.BasePath}/profile_first_step`, data);
    }
    upload_video(data :any){
        return this.http.post(`${Config.BasePath}/profile_second_step`, data);
    }
    // upload_image(data :any){
    //     return this.http.post(`${Config.Host}/upload.php`,data);
    // }
    // upload_video(data :any){
    //     return this.http.post(`${Config.Host}/upload_video.php`, data);
    // }
    profile_final_stap(data : any){
        return this.http.post(`${Config.BasePath}/profile_final_step`, data);
    }
    social_login(data :any){
        return this.http.post(`${Config.BasePath}/social_login`, data);
    }
    forgot_password(data :any){
        return this.http.post(`${Config.BasePath}/forgot_password`, data);
    }
    reset_password(data :any,token:any){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
        return this.http.post(`${Config.BasePath}/reset_password`, data,httpOptions);
    }
}