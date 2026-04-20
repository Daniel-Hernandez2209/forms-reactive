import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formUtils } from '../../../utils/form-utils';
import { getFieldError } from '../../../utils/errors-form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  fb = inject(FormBuilder);
  formUtils = formUtils;
  getErrorField = getFieldError;

  myForm: FormGroup = this.fb.group(
    {
      nameAndLastName: ['daniel', [Validators.required, Validators.pattern(formUtils.namePattern)]],
      email: [
        'dna@gmail.com',
        [Validators.required, Validators.pattern(formUtils.emailPattern)],
        [this.getErrorField.chekingServerResponse],
      ],
      username: [
        'danielhernandez',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(formUtils.notOnlySpacesPattern),
        ],
      ],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['123456', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        this.getErrorField.isValidateFieldOneEqualsFieldTwo('password', 'confirmPassword'),
      ],
    },
  );

  onsubmit() {
    this.myForm.markAllAsTouched();
  }
}
