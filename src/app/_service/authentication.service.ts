import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../_config/config';
import { Register } from '../_models/register.model';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    localData : any;
    emptyData = null;
    constructor(private http: HttpClient) {
        this.localData = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.localData));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email_or_mobile: any, password: any) {
        return this.http.post<any>(`${Config.BasePath}/login`, { email_or_mobile, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
    social_login(data :any){
        return this.http.post<any>(`${Config.BasePath}/social_login`, data).pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
    }
    logout() {
        // remove user from local storage and set current user to null        
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('profile_status');
        this.currentUserSubject.next(null as any);
        return this.http.post(`${Config.BasePath}/logout`,null);
    }  
}