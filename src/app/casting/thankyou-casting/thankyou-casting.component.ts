import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-thankyou-casting',
  templateUrl: './thankyou-casting.component.html',
  styleUrls: ['./thankyou-casting.component.css']
})
export class ThankyouCastingComponent implements OnInit {
  applicationNo:any;
  constructor(private route:Router,private actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.applicationNo = params.get('application_no');
    });
  }

}
