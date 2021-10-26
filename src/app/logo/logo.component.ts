import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  constructor(private route : Router) { }

  ngOnInit(): void {
    //redirect to navigate page after 3 milisecond
    setTimeout(()=>{                           
          this.route.navigate(['/splash1']);
    }, 3000);
  }
}
