import { resolveForwardRef } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

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
        case 'pattern':
          return 'El correo NO es valido,verifica!!';
        case 'emailTaken':
          return 'El correo ya esta siendo usado por otro usuario';
        case 'noStrider':
          return 'El nombre de usuario no puede ser strider';
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
    console.log(form.errors);
    if (form.controls.length == 0) return null;
    const errors = form.errors || {};

    return getFieldError.getTextError(errors);
  }
  static getErrorEmail(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;
    const errors = form.controls[field].errors || {};
    return getFieldError.getTextError(errors);
  }
  static isValidateFieldOneEqualsFieldTwo(field1: string, field2: string): Object {
    return (formGroup: AbstractControl) => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;
      return fieldValue1 == fieldValue2 ? null : { field1equalsfield2: true };
    };
  }

  static async chekingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();
    const formValue = control.value;
    if (formValue == 'daniel@gmail.com') {
      return {
        emailTaken: true,
      };
    }

    return null;
  }

  static noStrider(control: AbstractControl): ValidationErrors | null | string {
    const value = control.value;
    console.log(value);
    if (value == 'strider') {
      return {
        noStrider: true,
      };
    }
    return null;
  }
}
