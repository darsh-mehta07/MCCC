import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})

export class SafePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }
    transform(url: any) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    // transform(val : number) : number {  
    //     return Math.sqrt(val);  
    //   }
  
  }