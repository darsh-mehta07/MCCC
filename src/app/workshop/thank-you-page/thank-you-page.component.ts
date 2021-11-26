import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap,Router } from '@angular/router';
@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.css']
})
export class ThankYouPageComponent implements OnInit {
  name: any;
  constructor(private actRoute:ActivatedRoute,) { 
    
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {     
      this.name = params.get('name');
    });
  }

}
