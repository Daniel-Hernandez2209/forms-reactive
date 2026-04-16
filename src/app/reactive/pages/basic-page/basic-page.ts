import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formUtils } from '../../../utils/form-utils';
import { getFieldError } from '../../../utils/errors-form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
})
export class BasicPage {
  private fb = inject(FormBuilder);
  errorForm = getFieldError;
  formUtil = formUtils;
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(10)]],
  });
}
//myForm = new FormGroup({
//name: new FormControl(''),
//price: new FormControl(0),
//inStorage: new FormControl(0),
//});
