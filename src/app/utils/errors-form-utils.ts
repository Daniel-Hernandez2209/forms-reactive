import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class getFieldError {
  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
      }
    }
    return null;
  }

  static getErrorMessage(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;
    const errors = form.controls[field].errors || {};
    return getFieldError.getTextError(errors);
  }

  static getErrorMessageInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length == 0) return null;
    const errors = formArray.controls[index].errors || {};

    return getFieldError.getTextError(errors);
  }
}
