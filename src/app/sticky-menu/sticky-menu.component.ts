import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-sticky-menu',
  templateUrl: './sticky-menu.component.html',
  styleUrls: ['./sticky-menu.component.css']
})
export class StickyMenuComponent implements OnInit {
  @Input() stickymenu: any;
  constructor() { }

  ngOnInit(): void {
  }

}
