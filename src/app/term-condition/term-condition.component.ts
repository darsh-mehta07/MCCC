import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.css']
})
export class TermConditionComponent implements OnInit {
  pageName = 'term-condition';
 
  constructor( private location: Location) { }

  ngOnInit(): void {
  }
  back(){
    this.location.back();
  }
}
