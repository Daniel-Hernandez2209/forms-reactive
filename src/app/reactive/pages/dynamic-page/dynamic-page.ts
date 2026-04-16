import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { form } from '@angular/forms/signals';
import { formUtils } from '../../../utils/form-utils';
import { getFieldError } from '../../../utils/errors-form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
})
export class DynamicPage {
  fb = inject(FormBuilder);
  formUtil = formUtils;
  getErrorMessage = getFieldError;

  myform: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGame: this.fb.array(
      [
        ['Valorant', [Validators.required, Validators.minLength(3)]],
        ['League of Legends', [Validators.required, Validators.minLength(3)]],
        ['Minecraft', [Validators.required, Validators.minLength(3)]],
      ],
      Validators.minLength(3),
    ),
  });

  get favoriteGames() {
    return this.myform.get('favoriteGame') as FormArray;
  }
}
