import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-anatomy',
  templateUrl: './anatomy.component.html',
  styleUrls: ['./anatomy.component.css']
})
export class AnatomyComponent implements OnInit {
  pageName  = 'anatomy';
  constructor(private location:Location,) { }

  ngOnInit(): void {
  }
  back(): void {
    this.location.back();
  }

}
