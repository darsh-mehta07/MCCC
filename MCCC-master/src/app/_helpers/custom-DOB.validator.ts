import { FormGroup } from '@angular/forms';

export function AgeBetween13To54(InputFieldName: string) {
    return (formGroup: FormGroup) => {
        const today = new Date();
        const InputField = formGroup.controls[InputFieldName];
        const birthDate = new Date(InputField.value);

        if (InputField.errors && !InputField.errors.lessthen13 && !InputField.errors.above100) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        var da = today.getDate() - birthDate.getDate();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if(m<0){
            m +=12;
        }
        if(da<0){
            da +=30;
        }
        // set error on matchingControl if validation fails
        if (age < 13) {
            InputField.setErrors({ lessthen13: true });
        } else if(age > 54){
            InputField.setErrors({ above54: true });
        }else{
            InputField.setErrors(null);
        }
    }
}