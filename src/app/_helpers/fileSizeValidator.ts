import { AbstractControl, FormControl } from "@angular/forms";
    export function fileSizeValidator(files: FileList | any) {
      return function(control: FormControl) {
        // return (control: AbstractControl): { [key: string]: any } | null => {
        const file = control.value;
        if (file) {
          var path = file.replace(/^.*[\\\/]/, "");
          const fileSize = files.item(0).size;
          const fileSizeInKB = Math.round(fileSize / 1024);
          if (fileSizeInKB >= 19) {
            return {
              fileSizeValidator: true
            };
          } else {
            return null;
          }
        }
        return null;
      };
    }