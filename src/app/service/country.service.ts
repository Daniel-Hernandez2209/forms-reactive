import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';

  private httpClient = inject(HttpClient);
  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=name,cca3,borders`;
    return this.httpClient.get<Country[]>(url);
  }

  getCountryByAlphaCode(code: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${code}?fields=name,cca3,borders`;
    return this.httpClient.get<Country>(url);
  }
  getCountryBorderByCode(code: string[]): Observable<Country[]> {
    if (!code || code.length == 0) return of([]);
    const countryRequest: Observable<Country>[] = [];

    code.forEach((border) => {
      const request = this.getCountryByAlphaCode(border);
      countryRequest.push(request);
    });

    return combineLatest(countryRequest);
  }
}
