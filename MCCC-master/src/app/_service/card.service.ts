import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BOARD_HEIGHT, BOARD_WIDTH } from '../game-card-setting';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private readonly http: HttpClient) {}

  /*
  * Get a list of images from picsum based on the board settings
  */
  getImageList() : Observable<any> {
    const NUMBER_OF_IMAGES = Math.round(BOARD_WIDTH * BOARD_HEIGHT / 2);
    return this.http.get('https://picsum.photos/v2/list?limit=' + NUMBER_OF_IMAGES);
  }
}
