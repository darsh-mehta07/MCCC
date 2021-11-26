import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-apply',
  templateUrl: './event-apply.component.html',
  styleUrls: ['./event-apply.component.css']
})
export class EventApplyComponent implements OnInit {
  pageName = 'applyEvent' ;
  constructor(private location:Location,) { }

  ngOnInit(): void {
  }
  back(): void {
    this.location.back();
  }

}
