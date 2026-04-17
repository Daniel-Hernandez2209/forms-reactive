import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches.page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches.page.html',
})
export class SwitchesPage {
  fb = inject(FormBuilder);
  formUtils = formUtils;
  myform: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    notification: [true],
    termAndCondicion: [false, Validators.requiredTrue],
  });

  onsubmit() {
    this.myform.markAllAsTouched();
  }
}
