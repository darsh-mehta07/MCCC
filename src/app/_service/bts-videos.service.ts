import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../_config/config';

@Injectable({
  providedIn: 'root'
})
export class BtsVideosService {
  constructor(private http: HttpClient) { }
  get_bts_videos(data:any){
    return this.http.post<any>(Config.BasePath +'/get_bts_videos',data);
  }

  bts_videos_by_id(data:any){
    return this.http.post<any>(Config.BasePath +'/bts_videos_by_id',data);
  }
}
