import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../_models/register.model';
import { Config } from '../_config/config';
import { Observable, of} from 'rxjs';
import { delay } from 'rxjs/operators';

const EMAILS = ['test@test.com', 'user@test.com']

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Register[]>(`${Config.BasePath}/users`);
  }
  register(register:Register){
    return this.http.post(`${Config.BasePath}/register`,register);
  }
  state(){
    return this.http.get(`${Config.BasePath}/states`);
  }
  cities(id:any){
    return this.http.post(`${Config.BasePath}/cities`,id);
  }
  delete(id: number) {
    return this.http.delete(`${Config.BasePath}/users/${id}`);
  }
  terms(){
    return this.http.get(`${Config.BasePath}/terms`);
  }
  languages(){
    return this.http.get(`${Config.BasePath}/languages`);
  }
  isEmailcheck(date:any){
    return this.http.post(`${Config.BasePath}/check_email`,date);    
  }
  isPhonecheck(date:any){
    return this.http.post(`${Config.BasePath}/phone_number_check`,date);    
  }
  isEmailTaken(email: string): Observable<boolean> {
    let url = `${Config.BasePath}/check_email`;

    let content: any = {};
    content.email = email;

    let response$: Observable<boolean> = this.http.post<boolean>(url, content);
    return response$;
  }
  isPhoneTaken(phone: string): Observable<boolean> {
    let url = `${Config.BasePath}/phone_number_check`;

    let content: any = {};
    content.phone = phone;

    let response$: Observable<boolean> = this.http.post<boolean>(url, content);
    return response$;
  }
}
