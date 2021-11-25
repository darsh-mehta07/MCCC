import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-with-logo',
  templateUrl: './header-with-logo.component.html',
  styleUrls: ['./header-with-logo.component.css']
})
export class HeaderWithLogoComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit(): void {
  }
  back(): void {
    // this.route.navigateByUrl('/casting-all/'+this.castingId);
    this.location.back();
    // window.history.back();
  }
}
