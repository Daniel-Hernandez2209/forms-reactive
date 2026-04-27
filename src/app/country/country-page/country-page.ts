import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../service/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
})
export class CountryPage {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);
  countryByRegion = signal<Country[]>([]);
  Border = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  formChanges = effect((OnCleanup) => {
    const regionSubscribe = this.changeRegion();
    const borderSubscribe = this.changeBorder();

    OnCleanup(() => {
      regionSubscribe.unsubscribe();
      borderSubscribe.unsubscribe();
    });
  });

  changeRegion() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => {
          this.myForm.get('country')!.setValue('');
          this.myForm.get('border')!.setValue('');
          this.countryByRegion.set([]);
          this.Border.set([]);
        }),
        switchMap((region) => this.countryService.getCountriesByRegion(region ?? '')),
      )
      .subscribe((countries) => {
        console.log(countries);
        this.countryByRegion.set(countries);
      });
  }

  changeBorder() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((code) => this.countryService.getCountryByAlphaCode(code ?? '')),
        switchMap((country) => this.countryService.getCountryBorderByCode(country.borders)),
      )
      .subscribe((borders) => {
        console.log(borders);
        this.Border.set(borders);
      });
  }
}
