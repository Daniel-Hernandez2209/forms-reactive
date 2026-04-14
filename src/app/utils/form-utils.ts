import { FormGroup } from '@angular/forms';

export class formUtils {
  static isValitedField(form: FormGroup, field: string): boolean | null {
    return !!form.controls[field].errors && form.controls[field].touched;
  }
}
