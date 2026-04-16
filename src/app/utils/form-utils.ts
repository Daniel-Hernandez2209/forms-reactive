import { FormArray, FormGroup } from '@angular/forms';

export class formUtils {
  static isValitedField(form: FormGroup, field: string): boolean | null {
    return !!form.controls[field].errors && form.controls[field].touched;
  }

  static isvalidateInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].invalid && formArray.controls[index].touched;
  }
}
