import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export class formUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValitedField(form: FormGroup, field: string): boolean | null {
    return !!form.controls[field].errors && form.controls[field].touched;
  }

  static isvalidateInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].invalid && formArray.controls[index].touched;
  }
}
