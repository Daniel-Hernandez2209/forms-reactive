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

  myFavorite = new FormControl('', [Validators.required, Validators.minLength(3)]);

  get favoriteGames() {
    return this.myform.get('favoriteGame') as FormArray;
  }

  onAddToFavorite() {
    if (this.myFavorite.invalid) return;
    const newGame = this.myFavorite.value;
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
  }
  ondeleteGame(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    console.log(this.myform.value);
    this.myform.markAllAsTouched();
  }
}
