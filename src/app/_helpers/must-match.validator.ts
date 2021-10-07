import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = controlName;
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        console.log("mc : " ,matchingControl.value);
        console.log("c : " ,control);
        // set error on matchingControl if validation fails
        if (matchingControl.value == 1111) {
            matchingControl.setErrors(null);
        }else if( control !== matchingControl.value){
            matchingControl.setErrors({ mustMatch: true });
        }else {
            matchingControl.setErrors(null);
        }
    }
}
export function MustMatchfield(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatchfield) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatchfield: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}