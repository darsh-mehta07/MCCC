import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.css']
})
export class TermConditionComponent implements OnInit {
  pageName = 'term-condition';
  status = [false];
  constructor( private location: Location) { }

  ngOnInit(): void {
  }
  back(){
    this.location.back();
  }
  

  addRotate(index: number){
    console.log(index );
    this.status[index] = !this.status[index];
    console.log(this.status);
  }  

}
