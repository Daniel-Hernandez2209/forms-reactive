import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class getFieldError {
  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      console.log(errors);
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
        case 'pattern':
          return 'El correo NO es valido,verifica!!';
        case 'field1equalsfield2':
          return 'Las contraseñas deben ser iguales';
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

  static getErrorGeneral(form: FormArray) {
    if (form.controls.length == 0) return null;
    const errors = form.errors || {};

    return getFieldError.getTextError(errors);
  }
  static getErrorEmail(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;
    const errors = form.controls[field].errors || {};
    return getFieldError.getTextError(errors);
  }
  static isValidateFieldOneEqualsFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;
      return fieldValue1 == fieldValue2
        ? null
        : getFieldError.getTextError({ field1equalsfield2: true });
    };
  }
}
