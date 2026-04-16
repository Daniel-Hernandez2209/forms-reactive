import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
})
export class DynamicPage {
  fb = inject(FormBuilder);

  myform: FormGroup = this.fb.group({
    name: ['', Validators.required, Validators.minLength(3)],
    favoriteGame: this.fb.array(
      [
        ['Valorant', Validators.required],
        ['League of Legends', Validators.required],
        ['Minecraft', Validators.required],
      ],
      [Validators.required, Validators.minLength(3)],
    ),
  });

  get favoriteGame() {
    return this.myform.get('favoriteGame');
  }
}
