import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RegisterService } from '../_service/register.service';

@Injectable({ providedIn: 'root' })
export class EmailExistsValidator implements AsyncValidator{
  constructor(private emailService: RegisterService) {}
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.emailService.isEmailTaken(control.value).pipe(
      map(isEmailTaken => (isEmailTaken ? {emailTaken: true} : null)),
      catchError(()=> of(null))
    );
  }

  
}

// @Injectable({ providedIn: "root" })
// export class EmailExistsValidator implements AsyncValidator {
//   private apiKey?: string; // put your api key here
//   constructor(private emailService: RegisterService) {}

//   validate(ctrl: AbstractControl): Promise<ValidationErrors | null> {
//     if (ctrl.value) {
//       return this.emailService.isEmailTaken(ctrl.value);
//     } else {
//       return Promise.resolve({ invalid: true });
//     }
//   }
// }