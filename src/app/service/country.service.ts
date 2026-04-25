import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class countryService {
  private baseUrl = 'https://restcountries.com/v3.1';

  private httpClient = inject(HttpClient);
  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get region(): string[] {
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
}
