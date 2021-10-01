import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  pageName='personal';
  constructor(private location:Location,) { }

  ngOnInit(): void {
  }
  back(): void {
    this.location.back();
  }

}
